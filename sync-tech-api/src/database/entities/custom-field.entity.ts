import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Project } from './project.entity';

@Entity()
export class CustomField {
  @PrimaryKey()
  id!: number;

  @Property()
  key!: string;

  @Property()
  value!: string;

  @ManyToOne(() => Project)
  project!: Project;
}
