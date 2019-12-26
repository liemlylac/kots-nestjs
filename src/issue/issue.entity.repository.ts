import { Repository } from 'typeorm';
import { IssueEntity } from './issue.entity';

export class IssueEntityRepository extends Repository<IssueEntity> {
  constructor() {
    super();
  }
}
