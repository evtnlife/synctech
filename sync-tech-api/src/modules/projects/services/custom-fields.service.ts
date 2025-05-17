import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { CustomField } from 'src/database/entities/custom-field.entity';
import { Project } from 'src/database/entities/project.entity';
import { CustomFieldDto } from 'src/common/dtos/custom-field.dto';

@Injectable()
export class CustomFieldService {
  private readonly logger = new Logger(CustomFieldService.name);

  constructor(private readonly em: EntityManager) {}

  async upsertFields(
    projectId: number,
    fieldDtos: CustomFieldDto[],
    flush = false,
    em: EntityManager = this.em,
  ): Promise<void> {
    try {
      const project = await em.findOne(
        Project,
        { id: projectId },
        { populate: ['assets'] },
      );

      if (!project) throw new NotFoundException('Project not found');

      const existingFields = project.customFields;
      const updatedFields: CustomField[] = [];

      for (const dto of fieldDtos) {
        const existing = existingFields.find((f) => f.key === dto.key);

        if (existing) {
          existing.value = dto.value;
          existing.key = dto.key;
          updatedFields.push(existing);
        } else {
          const newField = em.create(CustomField, {
            key: dto.key,
            value: dto.value,
            project,
          });
          em.persist(newField);
          updatedFields.push(newField);
        }
      }

      project.customFields.set(updatedFields);

      if (flush) {
        await em.flush();
      }
    } catch (error) {
      this.logger.error(
        `Failed to upsert custom fields: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Unexpected error', {
        cause: error,
      });
    }
  }
}
