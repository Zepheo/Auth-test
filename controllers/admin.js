async function admin(ctx, next) {
  ctx.body = { message: 'Welcome ADMINISTRATOR!' };
  next();
}

module.exports = admin;
