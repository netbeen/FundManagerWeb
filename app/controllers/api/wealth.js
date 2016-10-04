'use strict';
const wealthDistributionModel = require('../../models/wealthDistribution');


let getWealthDistribution = async (ctx, next) => {
  ctx.body = wealthDistributionModel.getDistribution();
};

module.exports = {
  getWealthDistribution:getWealthDistribution,
};