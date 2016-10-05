'use strict';
const wealthDistributionModel = require('../../models/wealthDistribution');


let getWealthDistribution = async (ctx, next) => {
  ctx.body = wealthDistributionModel.getDistribution();
};

let getTypes = async (ctx, next) => {
  ctx.body = wealthDistributionModel.getTypes();
};

module.exports = {
  getWealthDistribution:getWealthDistribution,
  getTypes:getTypes,
};