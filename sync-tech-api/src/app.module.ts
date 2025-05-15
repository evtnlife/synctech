import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './database/mikro-orm.config';
import { ProjectModule } from './modules/projects/project.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), ProjectModule],
})
export class AppModule {}
