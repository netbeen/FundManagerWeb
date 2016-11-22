'use strict';
const fundService = require('../../services/fund');
const purchaseInfoModel = require('../../models/purchaseInfo');

let getGraphInfo = async (ctx) => {
  let chartData = fundService.getChartDataById(ctx.params.id);
  ctx.body = chartData;
};

let getFundIds = async (ctx) => {
  ctx.body = purchaseInfoModel.getFundIds();
};

module.exports = {
  getGraphInfo: getGraphInfo,
  getFundIds:getFundIds
};