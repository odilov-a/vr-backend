const { Router } = require("express");
const studentController = require("../controllers/student.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const studentRouter = Router();

studentRouter.post("/login", studentController.loginStudent);
studentRouter.post("/register", studentController.registerStudent);

studentRouter.get("/", authenticate, requireRole(["admin"]), studentController.getAllStudents);
studentRouter.get("/me", authenticate, requireRole(["student"]), studentController.getMeStudent);

studentRouter.put("/update/me", authenticate, requireRole(["student"]), studentController.meUpdateStudent);

studentRouter.get("/:id", authenticate, requireRole(["admin"]), studentController.getStudentById);
studentRouter.put("/:id", authenticate, requireRole(["admin"]), studentController.updateStudent);
studentRouter.delete("/:id", authenticate, requireRole(["admin"]), studentController.deleteStudent);

module.exports = studentRouter;
