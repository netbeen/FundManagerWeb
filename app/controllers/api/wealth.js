'use strict';
const wealthDistributionModel = require('../../models/wealthDistribution');


let getWealthDistribution = async (ctx) => {
  ctx.body = await wealthDistributionModel.getDistribution();
};

let getTypes = async (ctx) => {
  ctx.body = await wealthDistributionModel.getTypes();
};

module.exports = {
  getWealthDistribution:getWealthDistribution,
  getTypes:getTypes,
};