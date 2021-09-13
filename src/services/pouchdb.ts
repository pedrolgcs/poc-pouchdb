import PouchDB from 'pouchdb';
import idbAdapter from 'pouchdb-adapter-idb';
import pouchdbFind from 'pouchdb-find';

// types
import { UserSchema } from '../interfaces/user';

// plugins
PouchDB.plugin(idbAdapter);
PouchDB.plugin(pouchdbFind);

var pouchDB = new PouchDB<UserSchema>('durga', {
  adapter: 'idb',
});

export { pouchDB };
