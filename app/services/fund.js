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

module.exports = {
  getFundPurchaseInfo: getPurchaseInfo,
  getValueById:getValueById
};