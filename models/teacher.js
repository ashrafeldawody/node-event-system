const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean,default: false },
});

module.exports = mongoose.model("Teacher", teacherSchema);
