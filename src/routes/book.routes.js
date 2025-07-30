const { Router } = require("express");
const bookController = require("../controllers/book.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const bookRouter = Router();

bookRouter.get("/", authenticate, requireRole(["admin", "student"]), bookController.getAllBooks);
bookRouter.get("/:id", authenticate, requireRole(["admin", "student"]), bookController.getBookById);

bookRouter.post("/", authenticate, requireRole(["admin"]), bookController.createBook);
bookRouter.put("/:id", authenticate, requireRole(["admin"]), bookController.updateBook);
bookRouter.delete("/:id", authenticate, requireRole(["admin"]), bookController.deleteBook);

module.exports = bookRouter;
