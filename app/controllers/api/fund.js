const fundService = require('../../services/fund');

let getGraphInfo = async (ctx, next) => {
  console.log(ctx.params);
  fundService.getValueById(ctx.params.id);
  ctx.body = 'yy';
};

module.exports = {
  getGraphInfo: getGraphInfo
};