const router = require('koa-router')();

router.get('/fund', async (ctx, next) => {
  ctx.render('fund');
});

module.exports = router;