const fundService = require('../services/fund');

let render = async (ctx, next) => {
  let fundIds = fundService.getFundIds();
  let fundPurchaseInfo = fundService.getFundPurchaseInfo(fundIds[0]);
  ctx.render('fund',{
    'pageName':'fund',
    'fundIds':fundIds
  });
}

module.exports = {
  render: render
};