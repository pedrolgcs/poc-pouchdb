import faker from 'faker';

import { Gender } from '../interfaces/user';
class Fake {
  public static user() {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      gender: Math.floor(Math.random() * 2) === 0 ? 'male' : 'female' as Gender,
    };
  }
}

export { Fake };
