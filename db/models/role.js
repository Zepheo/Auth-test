const { model, Schema } = require('mongoose');

const Role = model(
  'Role',
  new Schema({
    name: { type: String, required: true, unique: true },
  }),
);

module.exports = Role;
