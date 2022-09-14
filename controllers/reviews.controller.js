const Review = require("../models/Review.model");

module.exports.reviewsController = {
  addReview: async (req, res) => {
    try {
      const { text } = req.body;
      const data = await Review.create({
        _bookId: req.params.bookId,
        _userId: req.params.userId,
        text,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  deleteReview: async (req, res) => {
    try {
      await Review.findByIdAndRemove(req.params.id);
      return res.json("deleted");
    } catch (e) {
      return res.json(e.message);
    }
  },
  updateReview: async (req, res) => {
    try {
      const { text } = req.body;
      const data = await Review.findByIdAndUpdate(req.params.id, {
        text,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getReviews: async (req, res) => {
    try {
      const data = await Review.find({}).populate("_userId _bookId", "name");
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
