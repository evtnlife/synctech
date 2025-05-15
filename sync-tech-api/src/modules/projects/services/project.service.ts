import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateProjectDto } from 'src/common/dtos/project/create-project.dto';
import { UpdateProjectDto } from 'src/common/dtos/project/update-project.dto';
import { CustomField } from 'src/database/entities/custom-field.entity';
import { Project } from 'src/database/entities/project.entity';
import { ResponseProjectDto } from 'src/common/dtos/project/response-project.dto';
import { AssetType } from 'src/database/entities/asset-type.entity';
import { Asset } from 'src/database/entities/asset.entity';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateProjectDto): Promise<ResponseProjectDto> {
    return await this.em.transactional(async (em) => {
      this.logger.log(`Creating new project`);

      const project = new Project();
      project.name = dto.name;
      project.description = dto.description;

      em.persist(project);

      if (dto.assets) {
        for (const assetDto of dto.assets) {
          const asset = new Asset();
          asset.name = assetDto.name;
          asset.url = assetDto.url;
          asset.type = await em.getReference(AssetType, assetDto.typeId);
          asset.project = project;

          em.persist(asset);
          project.assets.add(asset);
        }
      }

      if (dto.customFields) {
        for (const fieldDto of dto.customFields) {
          const customField = new CustomField();
          customField.key = fieldDto.key;
          customField.value = fieldDto.value;
          customField.project = project;

          em.persist(customField);
          project.customFields.add(customField);
        }
      }

      await em.flush();
      this.logger.log(`Project created with id=${project.id}`);
      return new ResponseProjectDto(project);
    });
  }

  async update(id: number, dto: UpdateProjectDto): Promise<ResponseProjectDto> {
    return await this.em.transactional(async (em) => {
      this.logger.log(`Updating project id=${id}`);

      const project = await em.findOne(
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

      if (dto.assets) {
        const updatedAssets: Asset[] = [];

        for (const assetDto of dto.assets) {
          let asset: Asset | undefined;

          if (assetDto.id) {
            asset = project.assets.getItems().find((a) => a.id === assetDto.id);
            if (asset) {
              asset.name = assetDto.name;
              asset.url = assetDto.url;
              asset.type = await em.getReference(AssetType, assetDto.typeId);
            } else {
              asset = new Asset();
              asset.name = assetDto.name;
              asset.url = assetDto.url;
              asset.type = await em.getReference(AssetType, assetDto.typeId);
              asset.project = project;
              em.persist(asset);
            }
            updatedAssets.push(asset);
          }
        }

        project.assets.set(updatedAssets);
      }

      if (dto.customFields) {
        const updatedFields: CustomField[] = [];

        for (const fieldDto of dto.customFields) {
          const existing = project.customFields
            .getItems()
            .find((f) => f.key === fieldDto.key);

          if (existing) {
            existing.value = fieldDto.value;
            updatedFields.push(existing);
          } else {
            const newField = new CustomField();
            newField.key = fieldDto.key;
            newField.value = fieldDto.value;
            newField.project = project;
            em.persist(newField);
            updatedFields.push(newField);
          }
        }

        project.customFields.set(updatedFields);
      }

      await em.flush();
      this.logger.log(`Project id=${id} updated`);
      return new ResponseProjectDto(project);
    });
  }

  async remove(id: number): Promise<void> {
    return await this.em.transactional(async (em) => {
      this.logger.log(`Deleting project id=${id}`);
      const project = await em.findOne(Project, { id });
      if (!project) {
        this.logger.warn(`Project id=${id} not found`);
        throw new NotFoundException(`Project #${id} not found`);
      }
      await em.removeAndFlush(project);
      this.logger.log(`Project id=${id} deleted`);
    });
  }

  async findAll(): Promise<ResponseProjectDto[]> {
    this.logger.log('Retrieving all projects');
    const projects = await this.em.find(
      Project,
      {},
      { populate: ['assets', 'assets.type', 'customFields'] },
    );
    return projects.map((p) => new ResponseProjectDto(p));
  }

  async findById(id: number): Promise<ResponseProjectDto> {
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
  }
}
