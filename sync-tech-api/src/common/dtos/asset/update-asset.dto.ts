import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
