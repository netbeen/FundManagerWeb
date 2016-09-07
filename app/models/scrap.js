'use strict';
const _ = require('underscore');
const syncRequest = require('sync-request');

let getFundValueById = (fundId) => {
  let valueJson = {};
  let rawResponse = syncRequest('GET','http://fund.eastmoney.com/f10/F10DataApi.aspx?type=lsjz&code='+fundId+'&page=1&per=20000').body.toString('utf-8');
  _.each(rawResponse.split('<tr><td>').slice(1,-1),(elem)=>{
    let sliceArray = elem.split('</td><td class=\'tor bold\'>').slice(0,2);
    valueJson[sliceArray[0]] = sliceArray[1];
  });
  return valueJson;
};

let getRealTimeInfoById = (fundId) => {
  const realTimeInfoURL = `http://fundgz.1234567.com.cn/js/${fundId}.js`;
  let rawResponse = syncRequest('GET',realTimeInfoURL).body.toString('utf-8');
  let jsonResult = JSON.parse(rawResponse.slice(8,-2));
  return jsonResult;
};

module.exports = {
  getFundValueById:getFundValueById,
  getRealTimeInfoById:getRealTimeInfoById
};