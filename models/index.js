const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.bookings = require('./Booking.model')(mongoose);
// db.cinemas = require("./Cinema.model")(mongoose);
db.movies = require("./Movie.model")(mongoose);
db.users = require("./User.model")(mongoose);
// db.viewingtimes = require("./ViewingTimes.model")(mongoose);

module.exports = db;
