import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ example: 'Blueprint #1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/file.pdf' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  typeId: number;
}
