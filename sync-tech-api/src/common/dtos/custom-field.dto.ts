import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CustomFieldDto {
  @ApiProperty({ description: 'Custom field key' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Custom field value' })
  @IsString()
  @IsNotEmpty()
  value: string;
}
