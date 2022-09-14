const mongoose = require("mongoose");
const { SchemaTypes } = require("mongoose");
const reviewSchema = mongoose.Schema({
  _bookId: {
    type: SchemaTypes.ObjectId,
    default: null,
    ref: "Book",
  },
  _userId: {
    type: SchemaTypes.ObjectId,
    default: null,
    ref: "User",
  },
  text: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
