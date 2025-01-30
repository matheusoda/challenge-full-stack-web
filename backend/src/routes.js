// src/routes/routes.ts
import { Router } from "express";

const router = Router();

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "./controllers/userController";

import { login } from "./controllers/authController";
import { authMiddleware } from "./middleware/authMiddleware";

// Rota de login
router.post("/login", login);

// Rotas de usuarios
router.get("/users", authMiddleware, getUsers);
router.post("/users", authMiddleware, createUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

// Rotas de estudantes
router.get("/students", authMiddleware, getStudent);
router.post("/students", authMiddleware, createStudent);
router.put("/students/:id", authMiddleware, updateStudent);
router.delete("/students/:id", authMiddleware, deleteStudent);

export default router;