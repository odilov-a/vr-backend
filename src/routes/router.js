const { Router } = require("express");
const userRoutes = require("./user.routes.js");
const bookRoutes = require("./book.routes.js");
const organRoutes = require("./organ.routes.js");
const adminRoutes = require("./admin.routes.js");
const orderRoutes = require("./order.routes.js");
const router = Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/organs", organRoutes);
router.use("/admins", adminRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
