const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");

const router = Router();

router.post("/admin/books", booksController.addBook);
router.delete("/admin/books/:id", booksController.deleteBook);
router.patch("/admin/books/:id", booksController.updateBook);

router.get("/books", booksController.getAllBooks);
router.get("/books/:id", booksController.getBookById);
router.get("books/genres:id", booksController.getBookByGenre);
router.patch("/books/:bookId/users/:userId/rent", booksController.rentBook); // - брать книгу в аренду (не более 3-х за один раз)
router.patch("/books/:bookId/users/:userId/return", booksController.returnBook);

module.exports = router;
