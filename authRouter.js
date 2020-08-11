const Router = require('koa-router');

const auth = new Router({
  prefix: '/users',
});

auth.get('/create', (ctx, next) => {
  ctx.body = 'Create';
  next();
});

auth.get('/signin', (ctx, next) => {
  ctx.body = 'Signin';
  next();
});

module.exports = auth;
