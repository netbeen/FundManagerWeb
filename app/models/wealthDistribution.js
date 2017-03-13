'use strict';
const sqlite = require('sqlite-sync');

sqlite.connect('./data/database.db');

let getDistribution = () => {
  return sqlite.run('select * from distribution');
};

let getTypes = () => {
  return sqlite.run('select * from distribution_type');
};

module.exports = {
  getDistribution: getDistribution,
  getTypes: getTypes,
};