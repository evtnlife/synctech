import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Asset } from './asset.entity';

@Entity({ tableName: 'asset_types' })
export class AssetType {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @OneToMany(() => Asset, (asset) => asset.type)
  assets = new Collection<Asset>(this);
}
