let render = async (ctx, next) => {
  ctx.render('fund',{
    'pageName':'fund'
  });
}

module.exports = {
  render: render
};