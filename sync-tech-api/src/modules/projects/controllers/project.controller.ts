import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProjectDto } from 'src/common/dtos/project/create-project.dto';
import { UpdateProjectDto } from 'src/common/dtos/project/update-project.dto';
import { Project } from 'src/database/entities/project.entity';
import { ProjectService } from '../services/project.service';
import { ResponseProjectDto } from 'src/common/dtos/project/response-project.dto';

@ApiTags('projects')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('projects')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created.', type: Project })
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    this.logger.log('POST /projects');
    return this.projectService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  @ApiResponse({
    status: 200,
    description: 'Array of projects.',
    type: ResponseProjectDto,
    isArray: true,
  })
  async findAll(): Promise<ResponseProjectDto[]> {
    this.logger.log('GET /projects');
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Project details.',
    type: ResponseProjectDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseProjectDto> {
    this.logger.log(`GET /projects/${id}`);
    return this.projectService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project by ID' })
  @ApiResponse({
    status: 200,
    description: 'Project updated.',
    type: ResponseProjectDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<ResponseProjectDto> {
    this.logger.log(`PUT /projects/${id}`);
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiResponse({ status: 204, description: 'Project deleted.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.log(`DELETE /projects/${id}`);
    return this.projectService.remove(id);
  }
}
