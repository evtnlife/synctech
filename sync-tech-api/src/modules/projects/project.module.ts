import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { Project } from '../../database/entities/project.entity';
import { CustomField } from '../../database/entities/custom-field.entity';
import { Asset } from '../../database/entities/asset.entity';
import { AssetModule } from '../assets/asset.module';
import { CustomFieldService } from './services/custom-fields.service';
import { CustomFieldController } from './controllers/custom-fields.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([Project, CustomField, Asset]),
    AssetModule,
  ],
  controllers: [ProjectController, CustomFieldController],
  providers: [ProjectService, CustomFieldService],
  exports: [ProjectService, CustomFieldService],
})
export class ProjectModule {}
