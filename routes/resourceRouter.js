const Router = require('koa-router');
const { verifyToken, isModerator, isAdmin } = require('../middleware/authjwt');
const user = require('../controllers/user');
const moderator = require('../controllers/moderator');
const admin = require('../controllers/admin');

const resources = new Router({
  prefix: '/resources',
});

resources.use(async (ctx, next) => {
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  await next();
});

resources.get('/public', async (ctx, next) => {
  ctx.body = { message: 'Public' };
  await next();
});

resources.get('/user', verifyToken, user);

resources.get('/moderator', verifyToken, isModerator, moderator);

resources.get('/admin', verifyToken, isAdmin, admin);

module.exports = resources;
