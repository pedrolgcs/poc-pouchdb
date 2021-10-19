// services
import { pouchDB } from '../../services/pouchdb';

// types
import { Gender, User, UserSchema } from '../../interfaces/user';

const LIMIT = 20;

class UsersRepository {
  public static async create(data: User) {
    const body = {
      user: data,
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

  public static async listByGender(gender: Gender): Promise<UserSchema[]> {
    // ---------------------------
    const teste = await pouchDB
      .createIndex({
        index: {
          fields: ['user.gender'],
          name: 'myindex',
          ddoc: 'mydesigndoc',
          type: 'json',
        },
      })
      .then(function ({ name }: any) {
        return pouchDB.find({
          selector: {
            name: { $eq: 'male' },
          },
        });
      });

    console.log(teste, 'teste');

    const { docs } = await pouchDB.find({
      selector: { myindex: 'male' },
      limit: LIMIT,
    });

    return docs;
  }
}

export { UsersRepository };
