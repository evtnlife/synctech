import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Asset } from './asset.entity';
import { CustomField } from './custom-field.entity';

@Entity()
export class Project {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @OneToMany(() => Asset, (a) => a.project)
  assets = new Collection<Asset>(this);

  @OneToMany(() => CustomField, (f) => f.project)
  customFields = new Collection<CustomField>(this);
}
