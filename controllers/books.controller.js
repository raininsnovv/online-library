const Book = require("../models/Book.model");
const User = require("../models/User.model");
module.exports.booksController = {
  addBook: async (req, res) => {
    try {
      const { name, _genreId, _userId } = req.body;
      const data = await Book.create({
        name,
        _genreId,
        _userId,
      });
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndRemove(req.params.id);
      res.json("Book deleted");
    } catch (e) {
      res.json(e.message);
    }
  },
  updateBook: async (req, res) => {
    try {
      const { name, _genreId, _userId } = req.body;
      const data = await Book.findByIdAndUpdate(req.params.id, {
        name,
        _genreId,
        _userId,
      });
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const data = await Book.find({}).populate("_genreId _userId", "name");
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  getBookById: async (req, res) => {
    try {
      const data = await Book.findById(req.params.id).populate(
        "_genreId _userId",
        "name"
      );
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },

  getBookByGenre: async (req, res) => {
    try {
      const data = await Book.find({ _genreId: req.params.id }).populate(
        "_genreId _userId",
        "name"
      );
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },

  rentBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const book = await Book.findById(req.params.bookId);
      if (user.books.includes(req.params.bookId)) {
        return res.json("This book rented");
      } else if (user.isBlocked === true) {
        return res.json("User banned");
      } else if (book._userId !== null) {
        return res.json("Book rented by somebody");
      } else if (user.books.length >= 3) {
        return res.json("OVER LIMIT");
      } else {
        await book.updateOne({ _userId: req.params.userId });
        await user.updateOne({ $push: { books: req.params.bookId } });
        return res.json("You are rented this book");
      }
    } catch (e) {
      return res.json(e.message);
    }
  },
  returnBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const book = await Book.findById(req.params.bookId);
      if (user.books.includes(req.params.bookId)) {
        await book.updateOne({ _userId: null });
        await user.updateOne({ $pull: { books: req.params.bookId } });
        return res.json("Book was returned");
      } else {
        return res.json("Book doesnt rented");
      }
    } catch (e) {
      return res.json(e.message);
    }
  },
};
