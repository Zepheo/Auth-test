const Router = require('koa-router');
const { signUp, signIn } = require('../controllers/auth');

const auth = new Router({
  prefix: '/auth',
});

auth.post('/create', signUp);

auth.post('/signin', signIn);

module.exports = auth;
