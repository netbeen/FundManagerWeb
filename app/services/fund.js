const _ = require('underscore');
const purchaseInfo = require('../models/purchaseInfo');
const scrap = require('../models/scrap');

let getFundPurchaseInfo = () => {
  let fundIds = purchaseInfo.getFundIds();
  let purchaseInfoJson = {};
  _.each(fundIds, (fundId) => {
    purchaseInfoJson[fundId] = purchaseInfo.getFundPurchaseInfoById(fundId);
  });
  return purchaseInfoJson;
};

let getFundValueById = (fundId) => {
  return scrap.getFundValueById(fundId);
};

module.exports = {
  getFundPurchaseInfo: getFundPurchaseInfo
};