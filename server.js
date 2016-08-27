const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(require('./app/router').routes());

app.listen(3000);
console.log('app started at port 3000...');