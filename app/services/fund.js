const _ = require('underscore');
const purchaseInfo = require('../models/purchaseInfo');

let getFundPurchaseInfo = () => {
  let fundIds = purchaseInfo.getFundIds();
  let purchaseInfoJson = {};
  _.each(fundIds, (fundId) => {
    purchaseInfoJson[fundId] = purchaseInfo.getFundPurchaseInfoById(fundId);
  });
  return purchaseInfoJson;
};

module.exports = {
  getFundPurchaseInfo: getFundPurchaseInfo
};