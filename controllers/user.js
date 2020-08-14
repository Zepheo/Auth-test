async function user(ctx, next) {
  console.log('trying to send data');
  ctx.body = { message: 'Welcome USER!' };
  next();
}

module.exports = user;
