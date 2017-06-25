'use strict';

let render = async (ctx) => {
  ctx.render('wealth',{
    'pageName':'wealth'
  });
};

let login = async (ctx) => {
  ctx.render('login',{
    'pageName':'login'
  });
};

module.exports = {
  render: render,
  login: login,
};