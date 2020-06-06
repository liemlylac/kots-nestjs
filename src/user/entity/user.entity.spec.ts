import { User } from './user.entity';

describe('class User', () => {
  let user: User;

  beforeAll(async () => {
    user = new User();
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
  });

});
