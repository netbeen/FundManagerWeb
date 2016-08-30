const fundService = require('../../services/fund');

let getGraphInfo = async (ctx, next) => {
  console.log(ctx.params);
  let values = fundService.getValueById(ctx.params.id);
  ctx.body = {
    'values': values
  };
};

module.exports = {
  getGraphInfo: getGraphInfo
};