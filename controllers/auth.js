const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user: User, role: Role } = require('../db');
const { JWT_SECRET: secret } = require('../db/config');

async function signUp(ctx) {
  const { request: { body } } = ctx;

  const role = body.roles
    ? await Role.find({ name: { $in: body.roles } }, '_id', (err) => {
      if (err) {
        ctx.body = { message: 'Role finding error', error: err };
      }
    })
    : await Role.findOne({ name: 'user' }, '_id', (err) => {
      if (err) {
        ctx.body = { message: 'Role finding error', error: err };
      }
    });

  try {
    await new User({
      username: body.username,
      password: bcrypt.hashSync(body.password, 12),
      roles: Array.isArray(role) ? [...role] : [role],
    }).save();
    ctx.body = { message: 'User created' };
  } catch (err) {
    const errors = err.errors
      ? Object.keys(err.errors)
        .map((e) => ({
          field: err.errors[e].path,
          type: err.errors[e].kind,
          message: err.errors[e].message,
        }))
      : [{
        field: Object.keys(err.keyPattern)[0],
        type: 'duplicate key',
        mesage: `Path '${Object.keys(err.keyPattern)[0]}' ('${body.username}') is already in use.`,
      }];

    ctx.body = errors;
  }
}

async function signIn(ctx) {
  const { request: { body } } = ctx;
  try {
    const user = await User.findOne({ username: body.username });
    if (!user) {
      ctx.body = { message: 'User not found.' };
      return;
    }
    if (!bcrypt.compareSync(body.password, user.password)) {
      ctx.body = { message: 'Invalid password.' };
      return;
    }

    const token = jwt.sign({
      id: user._id,
    }, secret, { expiresIn: '30m' });

    ctx.body = {
      id: user._id,
      token,
      message: 'signed in successfully',
    };
  } catch (err) {
    ctx.body = err;
  }
}

module.exports = { signUp, signIn };
