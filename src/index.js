import dbs from './core/dbs'

var idbable = (function(){
  var shared;
  return function (tableName, dbName) {
      if(!shared) {
          shared = new dbs(tableName, dbName);
      }
      return shared;
  }
})();

export default idbable
export { idbable }
