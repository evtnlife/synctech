import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { Project } from '../../database/entities/project.entity';
import { CustomField } from '../../database/entities/custom-field.entity';
import { Asset } from '../../database/entities/asset.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Project, CustomField, Asset])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
