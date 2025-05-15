import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldDto } from '../custom-field.dto';
import { Project } from 'src/database/entities/project.entity';
import { ResponseAssetDto } from '../asset/response-asset.dto';

export class ResponseProjectDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'My Project' })
  name: string;

  @ApiProperty({ example: 'Project description' })
  description: string;

  @ApiProperty({ example: '2025-05-15T12:34:56Z' })
  createdAt: Date;

  @ApiProperty({ type: [ResponseAssetDto] })
  assets: ResponseAssetDto[];

  @ApiProperty({ type: [CustomFieldDto] })
  customFields: CustomFieldDto[];

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.createdAt = project.createdAt;
    this.assets = project?.assets
      .getItems()
      ?.map((a) => ({ id: a.id, name: a.name, url: a.url, type: a.type }));
    this.customFields = project?.customFields
      .getItems()
      ?.map((f) => ({ key: f.key, value: f.value }));
  }
}
