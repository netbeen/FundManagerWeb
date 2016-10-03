'use strict';
const purchaseInfoModel = require('../models/purchaseInfo');

let render = async (ctx, next) => {
  ctx.render('wealth',{
    'pageName':'wealth'
  });
};

module.exports = {
  render: render
};