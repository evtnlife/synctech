import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CustomFieldDto } from '../custom-field.dto';
import { CreateAssetDto } from '../asset/create-asset.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets?: CreateAssetDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: CustomFieldDto[];
}
