'use strict';
const purchaseInfoModel = require('../models/purchaseInfo');

let render = async (ctx) => {
  if(typeof ctx.cookies.get('uuid') === 'undefined'){
    ctx.redirect('/login');
  }
  let fundIds = purchaseInfoModel.getFundIds();
  ctx.render('fund',{
    'pageName':'fund',
    'fundIds':fundIds
  });
};

module.exports = {
  render: render
};