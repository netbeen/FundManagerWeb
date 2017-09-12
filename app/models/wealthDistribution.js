'use strict';
const _ = require('underscore');
const config = require('../../config');

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
  debt: Sequelize.DECIMAL(10, 2),
});

const WealthDistributionType = sequelize.define('wealthDistributionType', {
  target: Sequelize.STRING,
  type: Sequelize.STRING,
});

async function getTypes(){
  var wealthDistributionTypes = await WealthDistributionType.findAll();
  return _.map(wealthDistributionTypes, (item) => {
    return {
      'target': item.dataValues.target,
      'type': item.dataValues.type,
    }
  })
}

async function getDistribution(){
  var wealthDistributions = await WealthDistribution.findAll();
  return _.map(wealthDistributions, (item) => {
    return {
      '日期': item.dataValues.recordDate,
      '现金': parseFloat(item.dataValues.cash),
      '存款': parseFloat(item.dataValues.deposit),
      '货币基金': parseFloat(item.dataValues.moneyFund),
      '蚂蚁定期': parseFloat(item.dataValues.antFinance),
      '陆金所': parseFloat(item.dataValues.luFax),
      '人人贷': parseFloat(item.dataValues.renRenDai),
      '债券基金': parseFloat(item.dataValues.bondFund),
      '指数基金': parseFloat(item.dataValues.indexFund),
      '商品基金': parseFloat(item.dataValues.commodityFund),
      debt: parseFloat(item.dataValues.debt)
    }
  })
}

module.exports = {
  getDistribution: getDistribution,
  getTypes: getTypes,
};