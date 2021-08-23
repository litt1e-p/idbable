import { openDb, deleteDb } from './idb.polyfill.js'

if (!('indexedDB' in window)) {
  throw new Error('Fatal error: the browser does not support indexedDb');
}

class dbs {
  constructor (tableName, dbName) {
      var _db;
      this.dbName = dbName
      this.tableName = tableName
      Object.defineProperty(this, 'db', {
          async get () {
            if (_db !== undefined) {
              return _db
            }
            _db = await openDb(this.dbName, 1, db => {
              db.createObjectStore(this.tableName)
            })
            return _db
          },
          set () { 
            throw new ReferenceError('Fatal error: db is not settable')
          }
      });
  }

  async setItem (key, value) {
    const db = await this.db;
    const tx = db.transaction(this.tableName, 'readwrite');
    tx.objectStore(this.tableName).put(value, key);
    return tx.complete;
  }

  async getItem (key) {
    const db = await this.db;
    return db.transaction(this.tableName).objectStore(this.tableName).get(key);
  }

  async delItem (key) {
    const db = await this.db;
    const tx = db.transaction(this.tableName, 'readwrite');
    tx.objectStore(this.tableName).delete(key);
    return tx.complete;
  }

  async lear () {
    const db = await this.db;
    const tx = db.transaction(this.tableName, 'readwrite');
    tx.objectStore(this.tableName).clear();
    return tx.complete;
  }

  async keys () {
    const db = await this.db;
    return db.transaction(this.tableName).objectStore(this.tableName).getAllKeys();
  }

  async values () {
    const db = await this.db;
    return db.transaction(this.tableName).objectStore(this.tableName).getAll();
  }

  async dropDb () {
    await deleteDb(this.dbName)
  }
}

export default dbs
