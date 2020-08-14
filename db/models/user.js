const { model, Schema } = require('mongoose');

const User = model(
  'User',
  Schema({
    username: {
      type: String, required: true, unique: true, trim: true, minlength: 3,
    },
    password: { type: String, required: true, minlength: 8 },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  }),
);

module.exports = User;
