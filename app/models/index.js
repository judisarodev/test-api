const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// 👉 Aquí cambia "tutorials" por "dishes"
db.dishes = require("./dish.model.js")(mongoose);

module.exports = db;
