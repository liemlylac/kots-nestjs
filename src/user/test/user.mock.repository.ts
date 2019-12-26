export  class UserMockRepository {
  private mockData = [];
  constructor() {
    for (let i = 1; i < 10; i++) {
      this.mockData.push({
        id: i,
        displayName: `User ${i}`,
        username: `username${i}`,
      });
    }
  }

  find() {
    return this.mockData;
  }

  findOne(id) {
    return this.mockData.find(userEntity => userEntity.id === id);
  }
}
