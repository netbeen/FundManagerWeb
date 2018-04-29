'use strict';
const purchaseInfoModel = require('../models/purchaseInfo');

let render = async (ctx) => {
  // if(typeof ctx.cookies.get('uuid') === 'undefined'){
  //   ctx.redirect('/login');
  // }
  let fundIds = purchaseInfoModel.getFundIds();
  ctx.render('fund',{
    'pageName':'fund',
    'fundIds':fundIds
  });
};

let renderIrr = async (ctx) => {
  ctx.render('irr',{
    'pageName':'irr',
  });
};

let fundHistory = async (ctx) => {
  ctx.render('fundHistory',{
    'pageName':'fundHistory',
  });
};

module.exports = {
  render: render,
  irr: renderIrr,
  fundHistory: fundHistory
};
