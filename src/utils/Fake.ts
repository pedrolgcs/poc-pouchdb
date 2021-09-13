import faker from 'faker';

class Fake {
  public static user() {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    };
  }
}

export { Fake };
