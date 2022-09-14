const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");

const router = Router();

router.post("/admin/genres", genresController.getGenres);
router.delete("/admin/genres/:id", genresController.deleteGenre);
router.patch("/admin/genres/:id", genresController.updateGenre);
router.get("/admin/genres", genresController.getGenres);

module.exports = router;
