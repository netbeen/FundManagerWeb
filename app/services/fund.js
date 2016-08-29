const fs = require("fs");
const path = require("path");
const _ = require('underscore');
const fundPurchaseInfoDir = 'data/fund_purchase_info/';

let getFundIds = ()=> {
  return fs.readdirSync(fundPurchaseInfoDir);
};

let getFundPurchaseInfo = (filename) => {
  let lineStrings = fs.readFileSync(path.join(fundPurchaseInfoDir, filename), "utf8").split('\n');
  return _.map(_.filter(lineStrings, (lineString)=> {
    return lineString !== '';
  }), (lineString) => {
    let splitData = lineString.split('\t');
    return {
      'date': splitData[0],
      'value': splitData[1]
    };
  });
};

module.exports = {
  getFundIds: getFundIds,
  getFundPurchaseInfo: getFundPurchaseInfo
};