'use strict';
const _ = require('underscore');
const purchaseInfoModel = require('../models/purchaseInfo');
const fundHistoryModel = require('../models/fundHistory');
const scrapModel = require('../models/scrap');
const co = require('co');
const subscriptionFeeRates = {
  '000071': 0.12,
  '000930': 0,
  '002656': 0,
  '003318': 0.15,
  '070023': 0.12,
  '160119': 0,
  '202015': 0,
  '202108': 0,
  '290002': 1.5,
  '501050': 0.12,
  '501302': 0,
  '530015': 0.15,
};
const redeemFeeRates = {
  '000071': 0.5,
  '000930': 0,
  '002656': 0.5,
  '003318': 1.5,
  '070023': 0.5,
  '160119': 0.5,
  '202015': 0.5,
  '202108': 0.1,
  '290002': 0,
  '501050': 0.5,
  '501302': 0.5,
  '530015': 0.5,
};
const base = {
  '000071': 1000,
  '000930': 1000,
  '002656': 1000,
  '003318': 1000,
  '070023': 1000,
  '160119': 1000,
  '202015': 1000,
  '202108': 1000,
  '290002': 0,
  '501050': 1000,
  '501302': 1000,
  '530015': 1000,
};

/**
 * 将早于用户购买时期的基金净值信息删除
 * @param webValueData 完整基金历史净值
 * @param userPurchaseInfo 用户购买信息
 * @returns { '2016-09-09': 1.0171,
  '2016-09-08': 1.0245,
  '2016-09-07': 1.0212, ... }
 */
let filterUselessData = (webValueData, userPurchaseInfo) => {
  let firstDate = new Date(Object.keys(userPurchaseInfo)[0]);
  _.each(Object.keys(webValueData), (webDate)=> {
    if (firstDate > new Date(webDate)) {
      delete webValueData[webDate];
    }
  });
  return webValueData;
};

/**
 * 根据基金ID获取有效的基金净值（已排除非有效时段）
 * @param fundId 基金ID
 * @param userPurchaseInfo 用户购买信息
 * @returns { '2016-09-09': 1.0171,
  '2016-09-08': 1.0245,
  '2016-09-07': 1.0212, ... }
 */
let getValueById = (fundId, userPurchaseInfo) => {
  return co(function*(){
    let webValueData = yield scrapModel.getFundValueById(fundId);
    return filterUselessData(webValueData, userPurchaseInfo);
  });
};

let calcUserPirces = (dates, unitPrices, userPurchaseInfo, subscriptionFeeRate) => {
  let totalCost = 0, totalShare = 0;
  let userPirces = [];
  for (let i = 0; i < unitPrices.length; i++) {
    if (userPurchaseInfo.hasOwnProperty(dates[i])) {
      totalCost += userPurchaseInfo[dates[i]];
      totalShare += (userPurchaseInfo[dates[i]] * (1 - subscriptionFeeRate / 100) / unitPrices[i]);
    }
    userPirces.push(totalCost / totalShare);
  }
  return userPirces;
};

let calcTotalCost = (userPurchaseInfo) => {
  let totalCost = 0;
  for (let date in userPurchaseInfo) {
    totalCost += parseFloat(userPurchaseInfo[date]);
  }
  return totalCost;
};

let calcProfitRates = (unitPrices, userPrices) => {
  let profitRates = [];
  for (let i = 0; i < unitPrices.length; i++) {
    profitRates.push((unitPrices[i] - userPrices[i]) / userPrices[i] * 100);
  }
  return profitRates;
};

let calcProfitsRatePerYear = (dates, profitRates, redeemFeeRate) => {
  let profitsRatesPerYear = [];
  let firstDate = new Date(dates[0]);
  for (let i = 0; i < profitRates.length; i++) {
    let redeemProfitRate = profitRates[i] - redeemFeeRate;
    let duration = (new Date(dates[i]) - firstDate) / 24 / 3600 / 1000;
    duration = duration === 0 ? 1 : duration;
    profitsRatesPerYear.push(redeemProfitRate / duration * 365);
  }
  return profitsRatesPerYear;
};

let calcRtProfitRatePerYear = (startDate, endDate, profitRate, redeemFeeRate) => {
  let duration = (new Date(endDate) - new Date(startDate)) / 24 / 3600 / 1000 + 1;
  if (duration === 0) {
    duration = 0.001
  }
  let redeemProfitRate = profitRate - redeemFeeRate;
  return redeemProfitRate / duration * 365;
};

let getChartDataById = (fundId) => {
  return co(function*(){
    let userPurchaseInfo = purchaseInfoModel.getFundPurchaseInfoById(fundId);
    let values = yield getValueById(fundId, userPurchaseInfo);
    let chartData = {};
    chartData.overview = {};
    chartData.fundId = fundId;
    chartData.dates = Object.keys(values).reverse();
    chartData.unitPrices = _.map(Object.keys(values), (date) => {
      return values[date];
    }).reverse();
    chartData.userPrices = calcUserPirces(chartData.dates, chartData.unitPrices, userPurchaseInfo, subscriptionFeeRates[fundId]);
    chartData.profitRates = calcProfitRates(chartData.unitPrices, chartData.userPrices);
    chartData.profitsRatesPerYear = calcProfitsRatePerYear(chartData.dates, chartData.profitRates, redeemFeeRates[fundId]);
    chartData.overview.totalCost = calcTotalCost(userPurchaseInfo);
    chartData.overview.currentPrice = chartData.overview.totalCost * (1 + _.last(chartData.profitRates) / 100);
    chartData.overview.base = base[fundId];

    let realTimeData = yield scrapModel.getRealTimeInfoById(fundId);
    if (realTimeData.valid === false) {
      chartData.overview.fundName = yield scrapModel.fetchFundNameById(fundId);
      chartData.overview.rtInfoValid = false;
      return chartData;
    }
    chartData.overview.rtInfoValid = true;
    chartData.overview.fundName = realTimeData.fundName;
    let lastQuotedDate = _.last(chartData.dates);
    chartData.overview.trading = !(realTimeData.estimatedTime.slice(0, 10) === lastQuotedDate);
    chartData.overview.rtUnitPrice = realTimeData.estimatedValue;
    chartData.overview.rtProfitRate = (chartData.overview.rtUnitPrice - _.last(chartData.unitPrices)) / _.last(chartData.unitPrices) * 100;
    chartData.overview.rtTimeStamp = realTimeData.estimatedTime;
    chartData.overview.rtProfitRatePerYear = calcRtProfitRatePerYear(chartData.dates[0], _.last(chartData.dates), _.last(chartData.profitRates) + chartData.overview.rtProfitRate, redeemFeeRates[fundId]);
    return chartData;
  });
};

let getHistory = () => {
  return co(function*() {
    let result = yield fundHistoryModel.getHistory();
    return result;
  });
}

module.exports = {
  getChartDataById: getChartDataById,
  getHistory: getHistory
};
