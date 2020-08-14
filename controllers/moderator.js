async function moderator(ctx, next) {
  ctx.body = { message: 'Welcome MODERATOR!' };
  next();
}

module.exports = moderator;
