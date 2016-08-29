const fundService = require('../services/fund');

let render = async (ctx, next) => {
  let fundPurchaseInfo = fundService.getFundPurchaseInfo();
  ctx.render('fund',{
    'pageName':'fund',
    'fundIds':Object.keys(fundPurchaseInfo)
  });
};

module.exports = {
  render: render
};