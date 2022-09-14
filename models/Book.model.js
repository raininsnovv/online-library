const mongoose = require("mongoose");
const { SchemaTypes } = require("mongoose");
const bookSchema = mongoose.Schema({
  name: { type: String, default: "Which book? Who is the author?" },
  _genreId: {
    type: SchemaTypes.ObjectId,
    default: null,
    ref: "Genre",
  },
  _userId: {
    type: SchemaTypes.ObjectId,
    default: null,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
