import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { Project } from './project.entity';
import { AssetType } from './enums/asset-type.enum';

@Entity()
export class Asset {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  url!: string;

  @Enum()
  type!: AssetType;

  @ManyToOne(() => Project)
  project!: Project;
}
