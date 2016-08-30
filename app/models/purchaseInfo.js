'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const fundPurchaseInfoDir = 'data/fund_purchase_info/';

let getFundIds = ()=> {
  return fs.readdirSync(fundPurchaseInfoDir);
};

let getFundPurchaseInfoById = (fundId) => {
  let lineStrings = fs.readFileSync(path.join(fundPurchaseInfoDir, fundId), "utf8").split('\n');
  let purchaseInfoJson = {};
  _.each(_.filter(lineStrings, (lineString)=> {
    return lineString !== '';
  }), (lineString) => {
    let splitData = lineString.split('\t');
    purchaseInfoJson[splitData[0]] = splitData[1];
  });
  return purchaseInfoJson;
};

module.exports = {
  getFundIds: getFundIds,
  getFundPurchaseInfoById: getFundPurchaseInfoById
};