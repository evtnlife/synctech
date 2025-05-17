import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Logger,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomFieldDto } from 'src/common/dtos/custom-field.dto';
import { CustomFieldService } from '../services/custom-fields.service';

@ApiTags('custom-fields')
@Controller('projects/:projectId/custom-fields')
export class CustomFieldController {
  private readonly logger = new Logger(CustomFieldController.name);

  constructor(private readonly customFieldService: CustomFieldService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Upsert custom fields for a project' })
  @ApiBody({ type: [CustomFieldDto] })
  @ApiResponse({
    status: 204,
    description: 'Custom fields upserted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async upsertFields(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() fieldDtos: CustomFieldDto[],
  ): Promise<void> {
    this.logger.log(`Upserting custom fields for project ${projectId}`);
    await this.customFieldService.upsertFields(projectId, fieldDtos, true);
  }
}
