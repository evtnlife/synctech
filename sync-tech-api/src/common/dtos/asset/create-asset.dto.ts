import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'Blueprint #1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/file.pdf' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  typeId: number;
}
