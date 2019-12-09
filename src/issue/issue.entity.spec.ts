import { TaskEntity } from './issue.entity';

describe('TaskEntity', () => {
  it('should be defined', () => {
    expect(new TaskEntity()).toBeDefined();
  });
});
