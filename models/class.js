const mongoose = require("mongoose");
const {AutoIncrementID} = require("@typegoose/auto-increment")
const classSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Child' }],
});
classSchema.plugin(AutoIncrementID, [{ field: '_id' }]);

module.exports = mongoose.model("Class", classSchema);
