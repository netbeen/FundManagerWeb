'use strict';
const purchaseInfoModel = require('../models/purchaseInfo');

let render = async (ctx, next) => {
  let fundIds = purchaseInfoModel.getFundIds();
  ctx.render('fund',{
    'pageName':'wealth',
    'fundIds':fundIds
  });
};

module.exports = {
  render: render
};