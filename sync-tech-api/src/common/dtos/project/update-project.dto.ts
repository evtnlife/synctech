import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsNumber } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
