const _ = require('underscore');
const purchaseInfo = require('../models/purchaseInfo');
const scrap = require('../models/scrap');

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
  _.each(Object.keys(webPurchaseData), (webDate)=>{
    if(firstDate > new Date(webDate)){
      delete webPurchaseData[webDate];
    }
  });
  return webPurchaseData;
};

let getPurchaseInfoById = (fundId) =>{
  return purchaseInfo.getFundPurchaseInfoById(fundId);
};

let getValueById = (fundId) => {
  let webPurchaseData = scrap.getFundValueById(fundId);
  let userPurchaseInfo = getPurchaseInfoById(fundId);
  let filteredPurchaseData = filterUselessData(webPurchaseData,userPurchaseInfo);
  return filteredPurchaseData;
};

let calcUserPircesById = (fundId,chartData) => {
  let totalCost = 0;
  let totalShare = 0;
  let userPurchaseInfo = getPurchaseInfoById(fundId);
  let userPirces = [];
  for (let i = 0; i < chartData.unitPrices.length; i++){
    if(userPurchaseInfo.hasOwnProperty(chartData.dates[i])){
      totalCost += parseFloat(userPurchaseInfo[chartData.dates[i]]);
      totalShare += (parseFloat(userPurchaseInfo[chartData.dates[i]]) / chartData.unitPrices[i]);
    }
    userPirces.push((totalCost/totalShare).toFixed(4));
  }
  return userPirces;
};

let calcProfitRates = (unitPrices,userPrices) => {
  let profitRates = [];
  for (let i = 0; i < unitPrices.length; i++){
    profitRates.push(((unitPrices[i]-userPrices[i])/userPrices[i]*100).toFixed(2));
  }
  return profitRates
};

let getChartDataById = (fundId) => {
  let values = getValueById(fundId);
  let chartData = {};
  chartData.fundId = fundId;
  chartData.dates = Object.keys(values).reverse();
  chartData.unitPrices = _.map(Object.keys(values),function(date){
    return parseFloat(values[date]);
  }).reverse();
  chartData.userPrices = calcUserPircesById(fundId,chartData);
  chartData.profitRates = calcProfitRates(chartData.unitPrices,chartData.userPrices);

  return chartData;
};

module.exports = {
  getChartDataById: getChartDataById,
  getFundPurchaseInfo: getPurchaseInfo,
  getValueById:getValueById
};