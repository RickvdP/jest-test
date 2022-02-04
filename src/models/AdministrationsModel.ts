interface Administration {
  readonly id: string,
}

export default class AdministrationModel {
  administrations: Array<Administration> = [
    {
      id: '123',
    },
    {
      id: '456',
    },
  ];

  // doesn't need async now, but will do once data retrieved from DB
  public async getById(id: string): Promise<Administration | undefined> {
    console.log('calling getById');
    return this.administrations.find((x) => x.id === id);
  }
}
