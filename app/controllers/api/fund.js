'use strict';
const fundService = require('../../services/fund');

let getGraphInfo = async (ctx, next) => {
  let chartData = fundService.getChartDataById(ctx.params.id);
  ctx.body = chartData;
};

module.exports = {
  getGraphInfo: getGraphInfo
};