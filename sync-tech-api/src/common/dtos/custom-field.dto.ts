import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CustomFieldDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ description: 'Custom field key' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Custom field value' })
  @IsString()
  @IsNotEmpty()
  value: string;
}
