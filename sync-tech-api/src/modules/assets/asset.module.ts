import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from '../../database/entities/project.entity';
import { CustomField } from '../../database/entities/custom-field.entity';
import { Asset } from '../../database/entities/asset.entity';
import { AssetController } from './controllers/asset.controller';
import { AssetService } from './services/asset.service';

@Module({
  imports: [MikroOrmModule.forFeature([Project, CustomField, Asset])],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
