export class InMemoryDataService {
  createDb() {

    const base = [
      { id: 1, name: 'Name 1' },
      { id: 2, name: 'Name 2' }
    ];

    return {
      base,
    };
  }
}