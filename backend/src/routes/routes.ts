// src/routes/routes.ts
import { Router } from "express";

const router = Router();


import { login } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/studentController";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza login do usuário
 *     description: Faz o login de um usuário e retorna o token de autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token
 *       400:
 *         description: Erro na autenticação, e-mail ou senha inválidos
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     description: Retorna todos os usuários cadastrados no sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: Não autorizado
 */
router.get("/users", authMiddleware, getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário no sistema
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltando
 */
router.post("/users", authMiddleware, createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     description: Atualiza os dados de um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou faltando
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/users/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     description: Deleta um usuário do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/users/:id", authMiddleware, deleteUser);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Retorna a lista de estudantes
 *     description: Retorna todos os estudantes cadastrados no sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   ra:
 *                     type: string
 *                   cpf:
 *                     type: string
 *       401:
 *         description: Não autorizado
 */
router.get("/students", authMiddleware, getStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Retorna um estudante pelo ID
 *     description: Retorna os dados de um estudante pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do estudante
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudante encontrado
 *       404:
 *         description: Estudante não encontrado
 */
router.get("/students/:id", authMiddleware, getStudentById);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Cria um novo estudante
 *     description: Cria um novo estudante no sistema
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               ra:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltando
 */
router.post("/students", authMiddleware, createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Atualiza um estudante existente
 *     description: Atualiza os dados de um estudante pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do estudante para ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               ra:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 *       404:
 *         description: Estudante não encontrado
 */
router.put("/students/:id", authMiddleware, updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Deleta um estudante
 *     description: Deleta um estudante do sistema pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do estudante para ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudante deletado com sucesso
 *       404:
 *         description: Estudante não encontrado
 */
router.delete("/students/:id", authMiddleware, deleteStudent);

export default router;