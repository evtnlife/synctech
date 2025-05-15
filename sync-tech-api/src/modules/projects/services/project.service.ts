import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateProjectDto } from 'src/common/dtos/project/create-project.dto';
import { UpdateProjectDto } from 'src/common/dtos/project/update-project.dto';
import { CustomField } from 'src/database/entities/custom-field.entity';
import { Project } from 'src/database/entities/project.entity';
import { ResponseProjectDto } from 'src/common/dtos/project/response-project.dto';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    this.logger.log(`Creating project ${dto.name}`);
    const project = new Project();
    project.name = dto.name;
    project.description = dto.description;
    this.em.persist(project);

    if (dto.customFields) {
      for (const fieldDto of dto.customFields) {
        const cf = new CustomField();
        cf.key = fieldDto.key;
        cf.value = fieldDto.value;
        cf.project = project;
        this.em.persist(cf);
      }
    }

    await this.em.flush();
    this.logger.log(`Project created with id=${project.id}`);
    return project;
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

  async update(id: number, dto: UpdateProjectDto): Promise<ResponseProjectDto> {
    this.logger.log(`Updating project id=${id}`);
    const project = await this.em.findOne(Project, { id });

    if (!project) {
      this.logger.warn(`Project id=${id} not found`);
      throw new NotFoundException(`Project #${id} not found`);
    }

    project.name = dto.name ?? project.name;
    project.description = dto.description ?? project.description;
    await this.em.flush();
    this.logger.log(`Project id=${id} updated`);
    return new ResponseProjectDto(project);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting project id=${id}`);
    const project = await this.findById(id);
    await this.em.removeAndFlush(project);
    this.logger.log(`Project id=${id} deleted`);
  }
}
