const Koa = require('koa');
const Pug = require('koa-pug')

const app = new Koa();
const pug = new Pug({
  viewPath: './app/views/',
  debug: false,
  pretty: false,
  compileDebug: false,
  app: app
})

app.use(async(ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(require('./app/router').routes());

app.listen(3000);
console.log('app started at port 3000...');