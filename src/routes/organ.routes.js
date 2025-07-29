const { Router } = require("express");
const organController = require("../controllers/organ.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const organRouter = Router();

organRouter.get("/", authenticate, requireRole(["admin", "user"]), organController.getAllOrgans);
organRouter.get("/:id", authenticate, requireRole(["admin", "user"]), organController.getOrganById);

organRouter.post("/", authenticate, requireRole(["admin"]), organController.createOrgan);
organRouter.put("/:id", authenticate, requireRole(["admin"]), organController.updateOrgan);
organRouter.delete("/:id", authenticate, requireRole(["admin"]), organController.deleteOrgan);

module.exports = organRouter;
