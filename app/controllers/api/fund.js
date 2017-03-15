'use strict';
const fundService = require('../../services/fund');
const purchaseInfoModel = require('../../models/purchaseInfo');
const co = require('co');

let getGraphInfo = async(ctx) => {
  return co(function*() {
    let chartData = yield fundService.getChartDataById(ctx.params.id);
    ctx.body = chartData;
  });
};

let getFundIds = async(ctx) => {
  ctx.body = purchaseInfoModel.getFundIds();
};

module.exports = {
  getGraphInfo: getGraphInfo,
  getFundIds: getFundIds
};