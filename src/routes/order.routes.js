const { Router } = require("express");
const orderController = require("../controllers/order.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const orderRouter = Router();

orderRouter.post("/:id/buy", authenticate, requireRole(["admin", "user"]), orderController.buyBook);

module.exports = orderRouter;
