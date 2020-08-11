const Router = require('koa-router');

const resources = new Router({
  prefix: '/resources',
});

resources.get('/public', (ctx, next) => {
  ctx.body = 'Public';
  next();
});

resources.get('/private', (ctx, next) => {
  ctx.body = 'Private';
  next();
});

module.exports = resources;
