import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";

import { z } from "zod";
import { ApiError, ConflictError } from "../errors/apiError";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserService.getAllUser();
        res.json(users);
    } catch (error) {
        next(new ApiError("Erro ao buscar usuários", 500));
    }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, phone, password } = req.body;

    try {
        const validation = userSchema.safeParse(req.body);
        if (!validation.success) {
            const errors = validation.error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message
            }))
            throw new ApiError("Erro de validação", 400, errors);
        }

        const users = await UserService.getAllUser();
        const emailAlreadyRegister = users.filter(
            (user) => user.email === email
        );

        if (emailAlreadyRegister.length) {
            throw new ConflictError("E-mail já está em uso");
        }

        const newUser = await UserService.createUser(
            name,
            email,
            phone,
            password
        );
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const validation = userUpdateSchema.safeParse(req.body);

        if (!validation.success) {
            const errors = validation.error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message
            }))
            throw new ApiError("Erro de validação", 400, errors);
        }

        const newUser = await UserService.updateUser(id, {
            name,
            email
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log("ERROR: ", error);
        next(error);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        await UserService.deleteUser(id);

        res.status(200).json("Success delete user");
    } catch (error) {
        console.log("ERROR: ", error);
        next(new ApiError("Erro ao deletar usuário", 500));
    }
}

const userSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
    phone: z.string().optional()
});

const userUpdateSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    phone: z.string().optional()
});
