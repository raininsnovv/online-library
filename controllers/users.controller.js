const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.usersController = {
  addUser: async (req, res) => {
    try {
      const { name, isBlocked, rentedBooks } = req.body;
      const data = await User.create({
        name,
        isBlocked,
        rentedBooks,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      return res.json("Deleted");
    } catch (e) {
      return res.json(e.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, rentedBooks, isBlocked } = req.body;
      const data = await User.findByIdAndUpdate(req.params.id, {
        name,
        rentedBooks,
        isBlocked,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getUsers: async (req, res) => {
    try {
      const data = await User.find({}).populate("rentedBooks", "name");
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  banUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        isBlocked: true,
        rentedBooks: [],
      });
      await Book.find({ _userId: req.params.userId }).updateMany({
        _userId: null,
      });
      return res.json("пользователь заблокирован. Книги возвращены");
    } catch (error) {
      return res.json(error.message);
    }
  },
};
