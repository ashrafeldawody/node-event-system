const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true, //make this also true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      throw new Error("database connection failed.")
    });
};