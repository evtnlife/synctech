import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './database/mikro-orm.config';
import { ProjectModule } from './modules/projects/project.module';
import { AssetModule } from './modules/assets/asset.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), ProjectModule, AssetModule],
})
export class AppModule {}
