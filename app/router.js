const router = require('koa-router')();

router.get('/login', async (ctx, next) => {
  ctx.response.body = 'login';
  ctx.render('login');
});

router.get('/logout', async (ctx, next) => {
  ctx.response.body = 'logout';
});

module.exports = router;