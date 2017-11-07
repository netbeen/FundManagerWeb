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

let getHistory = async(ctx) => {
  return co(function*() {
    let rawData = yield fundService.getHistory();

    let result = {data:[]};
    result.data = rawData.map((historyItem)=>{
      const duringTime = (new Date(historyItem.endDate) - new Date(historyItem.startDate))/24/60/60/1000;
      const profit = historyItem.totalGain - historyItem.totalCost;
      const profitRate = profit/historyItem.totalCost;
      const profitRatePerYear = profitRate/duringTime*365;
      return [
        historyItem.startDate,
        historyItem.endDate,
        historyItem.fundId,
        historyItem.strategy,
        historyItem.base,
        historyItem.totalCost,
        historyItem.totalGain,
        duringTime,
        profit.toFixed(2),
        (profitRate*100).toFixed(2)+'%',
        (profitRatePerYear*100).toFixed(2)+'%'
      ];
    })
    ctx.body = result;
  });
};

module.exports = {
  getGraphInfo: getGraphInfo,
  getFundIds: getFundIds,
  getHistory: getHistory
};