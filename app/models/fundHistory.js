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

const WealthDistribution = sequelize.define('investmentHistory', {
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  strategy: Sequelize.INTEGER,
  base: Sequelize.DECIMAL(10, 2),
  totalCost: Sequelize.DECIMAL(10, 2),
  totalGain: Sequelize.DECIMAL(10, 2),
  fundId: Sequelize.STRING,
});

async function getHistory(){
  var wealthDistributions = await WealthDistribution.findAll();
  return _.map(wealthDistributions, (item) => {
    return {
      startDate: item.dataValues.startDate,
      endDate: item.dataValues.endDate,
      strategy: item.dataValues.strategy,
      base: parseFloat(item.dataValues.base),
      totalCost: parseFloat(item.dataValues.totalCost),
      totalGain: parseFloat(item.dataValues.totalGain),
      fundId: item.dataValues.fundId,
    }
  })
}

module.exports = {
  getHistory: getHistory,
};