'use strict';
const _ = require('underscore');
const thenRequest = require('then-request');
const syncRequest = require('sync-request');
const co = require('co')

let getFundValueByIdAsync = (fundId) => {
  let valueJson = {};
  return co(function*() {
    let rawResponse = yield thenRequest('GET', 'https://hz.lianjia.com/ershoufang/rs%E5%8F%A4%E8%8D%A1%E6%96%B0%E6%9D%91/');
    rawResponse = rawResponse.body.toString('utf-8');
    _.each(rawResponse.split('<tr><td>').slice(1, -1), (elem) => {
      let sliceArray = elem.split('</td><td class=\'tor bold\'>').slice(0, 2);
      valueJson[sliceArray[0]] = parseFloat(sliceArray[1]);
    });
    return valueJson;
  });
};

module.exports = {
  getFundValueById: getFundValueByIdAsync,
};

// co(function*(){
//   // let data = yield getFundValueByIdAsync();
//
// });
var res = syncRequest('GET', 'https://hz.lianjia.com/ershoufang/rs%E5%8F%A4%E8%8D%A1%E6%96%B0%E6%9D%91/',{'headers': {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.114 Safari/537.36 Vivaldi/1.9.818.50'
}

// var res = syncRequest('GET', 'https://www.baidu.com',{'headers': {
//   'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.114 Safari/537.36 Vivaldi/1.9.818.50'
// }

});
console.log(res.getBody('utf8'));