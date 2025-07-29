const { Router } = require("express");
const userController = require("../controllers/user.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const userRouter = Router();

userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.registerUser);

userRouter.get("/", authenticate, requireRole(["admin"]), userController.getAllUsers);
userRouter.get("/me", authenticate, requireRole(["user"]), userController.getMeUser);

userRouter.put("/update/me", authenticate, requireRole(["user"]), userController.meUpdateUser);

userRouter.get("/:id", authenticate, requireRole(["admin"]), userController.getUserById);
userRouter.put("/:id", authenticate, requireRole(["admin"]), userController.updateUser);
userRouter.delete("/:id", authenticate, requireRole(["admin"]), userController.deleteUser);

module.exports = userRouter;
