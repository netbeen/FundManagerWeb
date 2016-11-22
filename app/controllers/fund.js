'use strict';
const purchaseInfoModel = require('../models/purchaseInfo');

let render = async (ctx) => {
  let fundIds = purchaseInfoModel.getFundIds();
  ctx.render('fund',{
    'pageName':'fund',
    'fundIds':fundIds
  });
};

module.exports = {
  render: render
};