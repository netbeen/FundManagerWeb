'use strict';
const _ = require('underscore');
const purchaseInfoModel = require('../models/purchaseInfo');
const scrapModel = require('../models/scrap');
const redeemFeeRate = 0.5 / 100;

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

let getPurchaseInfoById = (fundId) => {
  return purchaseInfoModel.getFundPurchaseInfoById(fundId);
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
  let webValueData = scrapModel.getFundValueById(fundId);
  let filteredPurchaseData = filterUselessData(webValueData, userPurchaseInfo);
  return filteredPurchaseData;
};

let calcUserPirces = (dates, unitPrices, userPurchaseInfo) => {
  let totalCost = 0, totalShare = 0;
  let userPirces = [];
  for (let i = 0; i < unitPrices.length; i++) {
    if (userPurchaseInfo.hasOwnProperty(dates[i])) {
      totalCost += parseFloat(userPurchaseInfo[dates[i]]);
      totalShare += (parseFloat(userPurchaseInfo[dates[i]]) / unitPrices[i]);
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

let calcProfitsRatePerYear = (dates, profitRates) => {
  let profitsRatesPerYear = [];
  profitsRatesPerYear.push(0);
  let firstDate = new Date(dates[0]);
  for (let i = 1; i < profitRates.length; i++) {
    let redeemProfitRate = profitRates[i] / 100 - redeemFeeRate;
    let duration = (new Date(dates[i]) - firstDate) / 24 / 3600 / 1000;
    profitsRatesPerYear.push(redeemProfitRate / duration * 365 * 100);
  }
  return profitsRatesPerYear;
};

let calcRtProfitRatePerYear = (startDate, endDate, profitRate) => {
  let duration = (new Date(endDate) - new Date(startDate)) / 24 / 3600 / 1000;
  let redeemProfitRate = profitRate / 100 - redeemFeeRate;
  return redeemProfitRate / duration * 365 * 100;
};

let getChartDataById = (fundId) => {
  let userPurchaseInfo = purchaseInfoModel.getFundPurchaseInfoById(fundId);
  let values = getValueById(fundId, userPurchaseInfo);
  let chartData = {};
  chartData.overview = {};
  chartData.fundId = fundId;
  chartData.dates = Object.keys(values).reverse();
  chartData.unitPrices = _.map(Object.keys(values), (date) => {
    return values[date];
  }).reverse();
  chartData.userPrices = calcUserPirces(chartData.dates, chartData.unitPrices, userPurchaseInfo);
  chartData.profitRates = calcProfitRates(chartData.unitPrices, chartData.userPrices);
  chartData.profitsRatesPerYear = calcProfitsRatePerYear(chartData.dates, chartData.profitRates);
  chartData.overview.totalCost = calcTotalCost(userPurchaseInfo);
  chartData.overview.currentPrice = chartData.overview.totalCost * (1 + chartData.profitRates[chartData.profitRates.length - 1] / 100);

  let realTimeData = scrapModel.getRealTimeInfoById(fundId);
  chartData.overview.fundName = realTimeData.fundName;
  let lastQuotedDate = chartData.dates[chartData.dates.length - 1];
  chartData.overview.trading = !(realTimeData.estimatedTime.slice(0, 10) === lastQuotedDate);
  chartData.overview.rtUnitPrice = realTimeData.estimatedValue;
  chartData.overview.rtProfitRate = (chartData.overview.rtUnitPrice - chartData.unitPrices[chartData.unitPrices.length - 1]) / chartData.unitPrices[chartData.unitPrices.length - 1] * 100;
  chartData.overview.rtTimeStamp = realTimeData.estimatedTime;
  chartData.overview.rtProfitRatePerYear = calcRtProfitRatePerYear(chartData.dates[0], chartData.dates[chartData.dates.length - 1], chartData.profitRates[chartData.profitRates.length - 1] + chartData.overview.rtProfitRate);

  return chartData;
};

module.exports = {
  getChartDataById: getChartDataById
};