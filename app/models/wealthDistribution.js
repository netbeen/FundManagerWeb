'use strict';
const sqlite = require('sqlite-sync');

sqlite.connect('./data/database.db');
// console.log(sqlite.run('select * from distribute'));

let getDistribution = () => {
  return sqlite.run('select * from distribute');
};

module.exports = {
  getDistribution: getDistribution,
};