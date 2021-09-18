import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

// types
import { UserSchema } from '../interfaces/user';

// plugins
PouchDB.plugin(pouchdbFind);

var pouchDB = new PouchDB<UserSchema>('durga', {
  adapter: 'idb',
});

export { pouchDB };
