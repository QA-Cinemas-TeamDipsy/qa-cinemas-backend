const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.users = require('./User.model')(mongoose);
// db.bookings = require('./Bookings.model')(mongoose);
db.cinemas=require('./CinemaModel')(mongoose);

module.exports = db;