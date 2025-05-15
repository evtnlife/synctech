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

export class CreateProjectDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets?: CreateAssetDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: CustomFieldDto[];
}
