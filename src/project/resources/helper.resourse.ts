import { FindConditions } from 'typeorm/find-options/FindConditions';
import { ProjectEntity } from '../entities';

export function prepareProjectOptions(spaceKey: string, projectIdOrKey: number | string): FindConditions<ProjectEntity> {
  const options: FindConditions<ProjectEntity> = {
    spaceKey,
  };

  if (Number.isInteger(+projectIdOrKey)) {
    options.id = +projectIdOrKey;
  } else {
    options.key = projectIdOrKey + '';
  }
  return options;
}