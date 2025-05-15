import { ApiProperty } from '@nestjs/swagger';
import { AssetDto } from '../asset/asset.dto';
import { CustomFieldDto } from '../custom-field.dto';
import { Project } from 'src/database/entities/project.entity';

export class ResponseProjectDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'My Project' })
  name: string;

  @ApiProperty({ example: 'Project description' })
  description: string;

  @ApiProperty({ example: '2025-05-15T12:34:56Z' })
  createdAt: Date;

  @ApiProperty({ type: [AssetDto] })
  assets: AssetDto[];

  @ApiProperty({ type: [CustomFieldDto] })
  customFields: CustomFieldDto[];

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.assets = project?.assets
      .getItems()
      ?.map((a) => ({ id: a.id, name: a.name, url: a.url, type: a.type }));
    this.customFields = project?.customFields
      .getItems()
      ?.map((f) => ({ key: f.key, value: f.value }));
  }
}
