const { Router } = require("express");
const newsController = require("../controllers/news.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const newsRouter = Router();

newsRouter.get("/", newsController.getAllNews);
newsRouter.get("/:id", newsController.getNewsById);

newsRouter.post("/", authenticate, requireRole(["admin"]), newsController.createNews);
newsRouter.put("/:id", authenticate, requireRole(["admin"]), newsController.updateNews);
newsRouter.delete("/:id", authenticate, requireRole(["admin"]), newsController.deleteNews);

module.exports = newsRouter;
