const { Router } = require("express");
const bookRoutes = require("./book.routes.js");
const newsRoutes = require("./news.routes.js");
const organRoutes = require("./organ.routes.js");
const adminRoutes = require("./admin.routes.js");
const orderRoutes = require("./order.routes.js");
const studentRoutes = require("./student.routes.js");
const router = Router();

router.use("/books", bookRoutes);
router.use("/news", newsRoutes);
router.use("/organs", organRoutes);
router.use("/admins", adminRoutes);
router.use("/orders", orderRoutes);
router.use("/students", studentRoutes);

module.exports = router;
