const jwt = require('jsonwebtoken');
const { JWT_SECRET: secret } = require('../db/config');
const { user: User, role: Role } = require('../db');

exports.verifyToken = async (ctx, next) => {
  const token = ctx.request.header['x-access-token'];
  if (!token) {
    ctx.body = { message: 'No token provided' };
    return;
  }

  try {
    const decoded = await jwt.verify(token, secret);
    ctx.state.id = decoded.id;
    await next();
  } catch (err) {
    ctx.body = { message: 'Invalid token' };
  }
};

exports.isModerator = async (ctx, next) => {
  try {
    const user = await User.findById(ctx.state.id);

    const roles = await Role.find({ _id: { $in: user.roles } }, (roleError) => {
      if (roleError) {
        ctx.body = roleError;
      }
    });

    if (!roles.some((r) => r.name === 'moderator')) {
      ctx.body = { message: 'Requires Moderator Role!' };
      return;
    }
    await next();
  } catch (err) {
    ctx.body = err;
  }
};
