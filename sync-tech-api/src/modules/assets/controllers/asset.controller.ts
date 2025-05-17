import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from '../services/asset.service';
import { CreateAssetDto } from 'src/common/dtos/asset/create-asset.dto';

@ApiTags('assets')
@Controller('asset')
export class AssetController {
  private readonly logger = new Logger(AssetController.name);

  constructor(private readonly assetService: AssetService) {}

  @Post(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Upsert assets for a project' })
  @ApiBody({ type: [CreateAssetDto] })
  @ApiResponse({ status: 204, description: 'Assets upserted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async upsertAssets(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() assetDtos: CreateAssetDto[],
  ): Promise<void> {
    this.logger.log(`Upserting assets for project ${projectId}`);
    await this.assetService.upsertAssets(projectId, assetDtos, true);
  }
}
