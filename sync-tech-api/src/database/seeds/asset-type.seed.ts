// src/database/seed-asset-type.ts
import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';
import { AssetType } from '../entities/asset-type.entity';

async function seedAssetTypes() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  const types = ['LINK', 'DOCUMENT', 'PHOTO', 'VIDEO'];

  for (const name of types) {
    const exists = await em.findOne(AssetType, { name });
    if (!exists) {
      const at = new AssetType();
      at.name = name;
      em.persist(at);
    }
  }

  await em.flush();
  console.log('AssetTypes seeded:', types);
  await orm.close(true);
}

seedAssetTypes().catch((err) => {
  console.error(err);
  process.exit(1);
});
