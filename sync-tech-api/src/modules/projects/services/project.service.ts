import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager, t } from '@mikro-orm/postgresql';
import { CreateProjectDto } from 'src/common/dtos/project/create-project.dto';
import { UpdateProjectDto } from 'src/common/dtos/project/update-project.dto';
import { Project } from 'src/database/entities/project.entity';
import { ResponseProjectDto } from 'src/common/dtos/project/response-project.dto';
import { AssetService } from 'src/modules/assets/services/asset.service';
import { CustomFieldService } from './custom-fields.service';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    private readonly em: EntityManager,
    private assetService: AssetService,
    private customFieldsService: CustomFieldService,
  ) {}

  async create(dto: CreateProjectDto): Promise<ResponseProjectDto> {
    const fork = this.em.fork();
    try {
      await fork.begin();
      this.logger.log(`Creating new project`);

      if (!dto.name?.trim()) {
        throw new BadRequestException('Project name is required.');
      }

      const project = new Project();
      project.name = dto.name;
      project.description = dto.description;

      fork.persist(project);

      if (dto.assets && dto?.assets?.length > 0) {
        await this.assetService.upsertAssets(
          project.id,
          dto.assets,
          false,
          fork,
        );
      }

      if (dto.customFields && dto.customFields.length > 0) {
        await this.customFieldsService.upsertFields(
          project.id,
          dto.customFields,
          false,
          fork,
        );
      }

      await fork.flush();
      await fork.commit();
      this.logger.log(`Project created with id=${project.id}`);
      return new ResponseProjectDto(project);
    } catch (error) {
      this.logger.error(error.message);
      fork.rollback();
      throw new InternalServerErrorException('Unexpected error', {
        cause: error,
      });
    }
  }

  async update(id: number, dto: UpdateProjectDto): Promise<ResponseProjectDto> {
    const fork = this.em.fork();
    try {
      const fork = this.em.fork();
      await fork.begin();
      this.logger.log(`Updating project id=${id}`);

      if (!dto.name?.trim()) {
        throw new BadRequestException('Project name is required.');
      }

      const project = await fork.findOne(
        Project,
        { id },
        { populate: ['assets.type', 'customFields'] },
      );

      if (!project) {
        this.logger.warn(`Project id=${id} not found`);
        throw new NotFoundException(`Project #${id} not found`);
      }

      project.name = dto.name ?? project.name;
      project.description = dto.description ?? project.description;

      if (dto.assets && dto?.assets?.length > 0) {
        await this.assetService.upsertAssets(
          project.id,
          dto.assets,
          false,
          fork,
        );
      }

      if (dto.customFields && dto.customFields.length > 0) {
        await this.customFieldsService.upsertFields(
          project.id,
          dto.customFields,
          false,
          fork,
        );
      }

      await fork.flush();
      await fork.commit();
      this.logger.log(`Project id=${id} updated`);
      return new ResponseProjectDto(project);
    } catch (error) {
      this.logger.error(error.message);
      fork.rollback();
      throw new InternalServerErrorException('Unexpected error', {
        cause: error,
      });
    }
  }

  async remove(id: number): Promise<void> {
    const fork = this.em.fork();
    try {
      await fork.begin();
      this.logger.log(`Deleting project id=${id}`);
      const project = await fork.findOne(Project, { id });
      if (!project) {
        this.logger.warn(`Project id=${id} not found`);
        throw new NotFoundException(`Project #${id} not found`);
      }
      await fork.removeAndFlush(project);
      this.logger.log(`Project id=${id} deleted`);
      await fork.commit();
    } catch (error) {
      this.logger.error(error.message);
      fork.rollback();
      throw new InternalServerErrorException('Unexpected error', {
        cause: error,
      });
    }
  }

  async findAll(): Promise<ResponseProjectDto[]> {
    try {
      this.logger.log('Retrieving all projects');
      const projects = await this.em.find(
        Project,
        {},
        { populate: ['assets', 'assets.type', 'customFields'] },
      );
      return projects.map((p) => new ResponseProjectDto(p));
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Unexpected error', {
        cause: error,
      });
    }
  }

  async findById(id: number): Promise<ResponseProjectDto> {
    try {
      this.logger.log(`Retrieving project id=${id}`);
      const project = await this.em.findOne(
        Project,
        { id },
        { populate: ['assets', 'assets.type', 'customFields'] },
      );
      if (!project) {
        this.logger.warn(`Project id=${id} not found`);
        throw new NotFoundException(`Project #${id} not found`);
      }
      return new ResponseProjectDto(project);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Unexpected error', {
        cause: error,
      });
    }
  }
}
