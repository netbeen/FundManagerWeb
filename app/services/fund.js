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

let getPurchaseInfoById = (fundId) =>{
  return purchaseInfo.getFundPurchaseInfoById(fundId);
}

let getValueById = (fundId) => {
  let webData = scrap.getFundValueById(fundId);
  let userPurchaseInfo = getPurchaseInfoById(fundId);
  console.log(webData);
  console.log('##########');
  console.log(userPurchaseInfo)
};

module.exports = {
  getFundPurchaseInfo: getPurchaseInfo,
  getValueById:getValueById
};