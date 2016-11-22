'use strict';
const wealthDistributionModel = require('../../models/wealthDistribution');


let getWealthDistribution = async (ctx) => {
  ctx.body = wealthDistributionModel.getDistribution();
};

let getTypes = async (ctx) => {
  ctx.body = wealthDistributionModel.getTypes();
};

module.exports = {
  getWealthDistribution:getWealthDistribution,
  getTypes:getTypes,
};