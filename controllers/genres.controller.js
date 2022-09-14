const Genre = require("../models/Genre.model");

module.exports.genresController = {
  addGenre: async (req, res) => {
    try {
      const { name, description } = req.body;
      const data = await Genre.create({
        name,
        description,
      });
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  deleteGenre: async (req, res) => {
    try {
      await Genre.findByIdAndDelete(req.params.id);
      res.json("Deleted");
    } catch (e) {
      res.json(e.message);
    }
  },
  updateGenre: async (req, res) => {
    try {
      const { name, description } = req.body;
      const data = await Genre.findByIdAndUpdate(req.params.id, {
        name,
        description,
      });
      res.json(data);
    } catch (e) {
      res.json(e.message);
    }
  },
  getGenres: async (req, res) => {
    try {
      const data = await Genre.find();
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
