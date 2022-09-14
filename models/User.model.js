const mongoose = require("mongoose");
const { SchemaTypes } = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  rentedBooks: [{ type: SchemaTypes.ObjectId, ref: "Book" }],
  isBlocked: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
