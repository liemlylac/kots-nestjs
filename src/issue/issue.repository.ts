import { Repository } from 'typeorm';
import { Issue } from './issue.entity';

export class IssueRepository extends Repository<Issue> {
  constructor() {
    super();
  }

  async findByProject(projectId: number): Promise<Issue[]> {
    return await this.find({
      where: {
        projectId,
      },
    });
  }

  async findByCreator(userId: number): Promise<Issue[]> {
    return await this.find({
      where: {
        userId,
      },
    });
  }
}
