import { pouchDB } from '../services/pouchdb';

// types
import { User, Situation, UserSchema } from '../interfaces/user';

const LIMIT = 2;

class PouchRepository {
  public static async create(data: User) {
    const body = {
      user: data,
      situation: 'pending',
      error: {
        message: '',
        code: 0,
      },
    } as UserSchema;
    const response = pouchDB.post(body);
    return response;
  }

  public static async update(user: UserSchema) {
    const updatedUser = await pouchDB.put({
      ...user,
      _rev: user._rev,
    });

    return updatedUser;
  }

  public static async findById(id: string): Promise<UserSchema> {
    const user = await pouchDB.get(id);
    return user;
  }

  public static async list(): Promise<UserSchema[]> {
    const { docs } = await pouchDB.find({ selector: {} });
    return docs;
  }

  public static async listBySituation(
    situation: Situation
  ): Promise<UserSchema[]> {
    const { docs } = await pouchDB.find({
      selector: { situation: situation },
      limit: LIMIT,
    });
    return docs;
  }
}

export { PouchRepository };
