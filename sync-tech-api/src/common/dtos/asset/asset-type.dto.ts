import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AssetType } from 'src/database/entities/asset-type.entity';

export class AssetTypeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'PHOTO' })
  @IsString()
  name: string;

  constructor(type: AssetType) {
    this.id = type.id;
    this.name = type.name;
  }
}
