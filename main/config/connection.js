const mongoose = require("mongoose");

//Local connection to MongoDb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/frank_db");

module.exports = mongoose.connection;
