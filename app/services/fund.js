'use strict';
const _ = require('underscore');
const purchaseInfo = require('../models/purchaseInfo');
const scrap = require('../models/scrap');
const redeemFeeRate = 0.5 / 100;

let getPurchaseInfo = () => {
  let fundIds = purchaseInfo.getFundIds();
  let purchaseInfoJson = {};
  _.each(fundIds, (fundId) => {
    purchaseInfoJson[fundId] = purchaseInfo.getFundPurchaseInfoById(fundId);
  });
  return purchaseInfoJson;
};

let filterUselessData = (webPurchaseData, userPurchaseInfo) => {
  let firstDay = Object.keys(userPurchaseInfo)[0];
  let firstDate = new Date(firstDay);
  _.each(Object.keys(webPurchaseData), (webDate)=> {
    if (firstDate > new Date(webDate)) {
      delete webPurchaseData[webDate];
    }
  });
  return webPurchaseData;
};

let getPurchaseInfoById = (fundId) => {
  return purchaseInfo.getFundPurchaseInfoById(fundId);
};

let getValueById = (fundId) => {
  let webPurchaseData = scrap.getFundValueById(fundId);
  let userPurchaseInfo = getPurchaseInfoById(fundId);
  let filteredPurchaseData = filterUselessData(webPurchaseData, userPurchaseInfo);
  return filteredPurchaseData;
};

let calcUserPircesById = (fundId, chartData) => {
  let totalCost = 0;
  let totalShare = 0;
  let userPurchaseInfo = getPurchaseInfoById(fundId);
  let userPirces = [];
  for (let i = 0; i < chartData.unitPrices.length; i++) {
    if (userPurchaseInfo.hasOwnProperty(chartData.dates[i])) {
      totalCost += parseFloat(userPurchaseInfo[chartData.dates[i]]);
      totalShare += (parseFloat(userPurchaseInfo[chartData.dates[i]]) / chartData.unitPrices[i]);
    }
    userPirces.push((totalCost / totalShare).toFixed(4));
  }
  return userPirces;
};

let calcTotalCoseById = (fundId) => {
  let totalCost = 0;
  let userPurchaseInfo = getPurchaseInfoById(fundId);
  for (let date in userPurchaseInfo) {
    totalCost += parseFloat(userPurchaseInfo[date]);
  }
  return totalCost;
};

let calcProfitRates = (unitPrices, userPrices) => {
  let profitRates = [];
  for (let i = 0; i < unitPrices.length; i++) {
    profitRates.push(((unitPrices[i] - userPrices[i]) / userPrices[i] * 100).toFixed(2));
  }
  return profitRates
};

let calcProfitsRatePerYear = (dates, profitRates) => {
  let profitsRatesPerYear = [];
  profitsRatesPerYear.push(0);
  for (let i = 1; i < profitRates.length; i++) {
    let redeemProfitRate = profitRates[i] / 100 - redeemFeeRate;
    let duration = (new Date(dates[i]) - new Date(dates[0])) / 24 / 3600 / 1000;
    profitsRatesPerYear.push((redeemProfitRate / duration * 365 * 100).toFixed(2));
  }
  return profitsRatesPerYear;
};

let calcRtProfitRatePerYear = (startDate, endDate, profitRate) => {
  let duration = (new Date(endDate) - new Date(startDate)) / 24 / 3600 / 1000;
  let redeemProfitRate = profitRate / 100 - redeemFeeRate;
  return (redeemProfitRate / duration * 365 * 100).toFixed(2);
};

let getChartDataById = (fundId) => {
  let values = getValueById(fundId);
  let chartData = {};
  chartData.overview = {};
  chartData.fundId = fundId;
  chartData.dates = Object.keys(values).reverse();
  chartData.unitPrices = _.map(Object.keys(values), function (date) {
    return parseFloat(values[date]);
  }).reverse();
  chartData.userPrices = calcUserPircesById(fundId, chartData);
  chartData.profitRates = calcProfitRates(chartData.unitPrices, chartData.userPrices);
  chartData.profitsRatesPerYear = calcProfitsRatePerYear(chartData.dates, chartData.profitRates);
  chartData.overview.totalCost = calcTotalCoseById(fundId).toFixed(2);
  chartData.overview.currentPrice= (chartData.overview.totalCost * (1+chartData.profitRates[chartData.profitRates.length-1]/100)).toFixed(2);

  let realTimeData = scrap.getRealTimeInfoById(fundId);
  chartData.fundName = realTimeData.name;
  chartData.lastQuotedDate = realTimeData.jzrq;
  chartData.trading = !(realTimeData.gztime.slice(0,10) === chartData.lastQuotedDate);
  chartData.rtUnitPrice = parseFloat(realTimeData.gsz).toFixed(4);
  chartData.rtProfitRate = ((chartData.rtUnitPrice-chartData.unitPrices[chartData.unitPrices.length-1])/chartData.unitPrices[chartData.unitPrices.length-1]*100).toFixed(2);
  chartData.rtTimeStamp = realTimeData.gztime;
  chartData.rtProfitRatePerYear = calcRtProfitRatePerYear(chartData.dates[0],chartData.dates[chartData.dates.length-1],parseFloat(chartData.profitRates[chartData.profitRates.length-1])+parseFloat(chartData.rtProfitRate));

  return chartData;
};

module.exports = {
  getChartDataById: getChartDataById,
  getFundPurchaseInfo: getPurchaseInfo,
  getValueById: getValueById
};