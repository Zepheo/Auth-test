const jwt = require('jsonwebtoken');
const { JWT_SECRET: secret } = require('../db/config');
const { user: User, role: Role } = require('../db');

async function checkRole(id, role) {
  const user = await User.findById(id);

  const roles = await Role.find({ _id: { $in: user.roles } });

  if (!roles.some((r) => r.name === role)) {
    const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
    const authorizationError = new Error(`Requires ${capitalizedRole} role`);
    authorizationError.name = 'Authorization Error';
    throw authorizationError;
  }
}

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
    await checkRole(ctx.state.id, 'moderator');
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
  }
};

exports.isAdmin = async (ctx, next) => {
  try {
    await checkRole(ctx.state.id, 'admin');
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
  }
};
