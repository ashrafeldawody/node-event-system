const mongoose = require("mongoose");
const {AutoIncrementID} = require("@typegoose/auto-increment")


const childSchema = new mongoose.Schema({
  _id: Number,
  fullname: { type: String, required: true },
  age: { type: Number },
  level: { type: String, enum: ['PreKG', 'KG1', 'KG2'], required: true },
  address: {
    city: { type: String },
    street: { type: String },
    building: { type: Number }
  },
});
childSchema.plugin(AutoIncrementID, [{ field: '_id' }]);

module.exports = mongoose.model("Child", childSchema);
