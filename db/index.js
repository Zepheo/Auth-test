const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require('./models/user');
db.role = require('./models/role');

db.ROLES = ['user', 'moderator', 'admin'];

module.exports = db;
