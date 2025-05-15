import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { AssetTypeDto } from './asset-type.dto';

export class ResponseAssetDto {
  @ApiProperty({ description: 'Unique ID of the asset', example: 1 })
  id: number;

  @ApiProperty({ description: 'Name of the asset' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'URL or path to the asset' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'Type of the asset' })
  type: AssetTypeDto;
}
