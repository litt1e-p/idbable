/*
 * Created on 2021-08-23 14:59:05
 * Created by litt1e-p
 *
 * The MIT License (MIT)
 * Copyright (c) 2020 litt1e-p
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { openDb, deleteDb } from './idb.polyfill.js'

class dbs {
  constructor (dbName, tableName) {
    if (!('indexedDB' in window)) {
      throw new Error('Fatal error: the browser does not support indexedDb')
    }
    this.dbName = dbName
    this.tableName = tableName
    Object.defineProperty(this, 'db', {
      async get () {
        const _db = await openDb(this.dbName, 1, db => {
          db.createObjectStore(this.tableName)
        })
        return _db
      },
      set () { 
        throw new ReferenceError('Fatal error: db is not settable')
      }
    })
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

  async clear () {
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
