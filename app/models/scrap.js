'use strict';
const _ = require('underscore');
const syncRequest = require('sync-request');

/**
 * 根据基金ID抓取基金所有历史净值
 * @param fundId 基金ID
 * @returns { '2016-09-09': 1.5776,
  '2016-09-08': 1.5981,
  '2016-09-07': 1.5543, ... }
 */
let getFundValueById = (fundId) => {
  let valueJson = {};
  let rawResponse = syncRequest('GET', 'http://fund.eastmoney.com/f10/F10DataApi.aspx?type=lsjz&code=' + fundId + '&page=1&per=20000').body.toString('utf-8');
  _.each(rawResponse.split('<tr><td>').slice(1, -1), (elem)=> {
    let sliceArray = elem.split('</td><td class=\'tor bold\'>').slice(0, 2);
    valueJson[sliceArray[0]] = parseFloat(sliceArray[1]);
  });
  return valueJson;
};

/**
 * 根据基金ID抓取当天实时净值估算
 * @param fundId 基金ID
 * @returns { fundName: '南方中证500ETF联接',
  estimatedValue: 1.5769,
  estimatedTime: '2016-09-09 15:00' }
 */
let getRealTimeInfoById = (fundId) => {
  const realTimeInfoURL = `http://fundgz.1234567.com.cn/js/${fundId}.js`;
  let rawResponse = syncRequest('GET', realTimeInfoURL).body.toString('utf-8').slice(8, -2);
  if (rawResponse.length === 0) return {valid: false};
  let jsonRawResult = JSON.parse(rawResponse);
  return {
    valid: true,
    fundName: jsonRawResult.name,
    estimatedValue: parseFloat(jsonRawResult.gsz),
    estimatedTime: jsonRawResult.gztime
  };
};

let fetchFundNameById = (fundId) => {
  const URL = `http://fund.eastmoney.com/${fundId}.html`;
  let content = syncRequest('GET', URL).body.toString('utf-8')
  return content.split('<span class="funCur-FundName">')[1].split('</span>')[0];
};

module.exports = {
  getFundValueById: getFundValueById,
  getRealTimeInfoById: getRealTimeInfoById,
  fetchFundNameById: fetchFundNameById
};