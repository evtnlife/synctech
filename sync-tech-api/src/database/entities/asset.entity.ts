import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { Project } from './project.entity';
import { AssetType } from './asset-type.entity';

@Entity()
export class Asset {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  url!: string;

  @ManyToOne(() => AssetType)
  type!: AssetType;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @ManyToOne(() => Project)
  project!: Project;
}
