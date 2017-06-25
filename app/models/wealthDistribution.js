'use strict';
const sqlite = require('sqlite-sync');
const _ = require('underscore');
const config = require('../../config');

sqlite.connect('./data/database.db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('wealthManager', config.dbUsername, config.dbPassword, {
    'dialect': 'mysql',
    'host': config.dbHost,
    'port': 3306,
    'define': {
      'underscored': true
    }
  }
);

const WealthDistribution = sequelize.define('wealthDistribution', {
  recordDate: Sequelize.DATE,
  cash: Sequelize.DECIMAL(10, 2),
  deposit: Sequelize.DECIMAL(10, 2),
  moneyFund: Sequelize.DECIMAL(10, 2),
  antFinance: Sequelize.DECIMAL(10, 2),
  luFax: Sequelize.DECIMAL(10, 2),
  renRenDai: Sequelize.DECIMAL(10, 2),
  bondFund: Sequelize.DECIMAL(10, 2),
  indexFund: Sequelize.DECIMAL(10, 2),
  commodityFund: Sequelize.DECIMAL(10, 2),
});

let getTypes = () => {
  return sqlite.run('select * from distribution_type');
};

async function getDistribution(){
  var wealthDistributions = await WealthDistribution.findAll();
  return _.map(wealthDistributions, (item) => {
    return {
      '日期': item.dataValues.recordDate,
      '现金': parseFloat(item.dataValues.cash),
      '活期存款': parseFloat(item.dataValues.deposit),
      '货币基金': parseFloat(item.dataValues.moneyFund),
      '蚂蚁定期': parseFloat(item.dataValues.antFinance),
      '陆金所': parseFloat(item.dataValues.luFax),
      '人人贷': parseFloat(item.dataValues.renRenDai),
      '债券基金': parseFloat(item.dataValues.bondFund),
      '指数基金': parseFloat(item.dataValues.indexFund),
      '商品基金': parseFloat(item.dataValues.commodityFund)
    }
  })
}

module.exports = {
  getDistribution: getDistribution,
  getTypes: getTypes,
};