// src/routes/routes.ts
import { Router } from "express";

const router = Router();


import { login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/studentController.js";

// Rota de login
router.post("/login", login);

// Rotas de usuarios
router.get("/users", authMiddleware, getUsers);
router.post("/users", authMiddleware, createUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

// Rotas de estudantes
router.get("/students", authMiddleware, getStudents);
router.get("/students/:id", authMiddleware, getStudentById);
router.post("/students", authMiddleware, createStudent);
router.put("/students/:id", authMiddleware, updateStudent);
router.delete("/students/:id", authMiddleware, deleteStudent);

export default router;