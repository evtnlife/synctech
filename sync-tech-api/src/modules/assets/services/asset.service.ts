import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Asset } from 'src/database/entities/asset.entity';
import { AssetType } from 'src/database/entities/asset-type.entity';
import { Project } from 'src/database/entities/project.entity';
import { UpdateAssetDto } from 'src/common/dtos/asset/update-asset.dto';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(private readonly em: EntityManager) {}

  async upsertAssets(
    projectId: number,
    assetDtos: UpdateAssetDto[],
    flush = false,
    em: EntityManager = this.em,
  ): Promise<void> {
    try {
      const project = await em.findOne(
        Project,
        { id: projectId },
        { populate: ['assets'] },
      );

      if (!project) throw new NotFoundException('Project not found');

      const existingAssets = project.assets;
      const updatedAssets: Asset[] = [];

      for (const dto of assetDtos) {
        let asset = dto.id
          ? existingAssets.find((a) => a.id === dto.id)
          : undefined;

        if (asset) {
          asset.name = dto.name!;
          asset.url = dto.url!;
          asset.type = await em.getReference(AssetType, dto.typeId!);
        } else {
          asset = em.create(Asset, {
            name: dto.name!,
            url: dto.url!,
            type: await em.getReference(AssetType, dto.typeId!),
            project,
          });
          this.em.persist(asset);
        }

        updatedAssets.push(asset);
      }

      project.assets.set(updatedAssets);

      if (flush) {
        await em.flush();
      }
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
