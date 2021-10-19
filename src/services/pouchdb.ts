import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

// types
import { UserSchema } from '../interfaces/user';

// plugins
PouchDB.plugin(pouchdbFind);

const pouchDB = new PouchDB<UserSchema>('my-database', {
  adapter: 'idb',
});

// pouchDB.getIndexes().then((result) => console.log(result));

export { pouchDB };
