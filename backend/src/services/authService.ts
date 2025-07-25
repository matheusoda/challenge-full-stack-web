// src/services/authServices.js

import { PrismaClient } from "../../generated/prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "seu-segredo";

const authService = {
    async login(email: string, password: string) {
        // Busca o usuário pelo nome de usuário
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Valida se usuário retornou dados
        if (!user || !user.password) {
            throw new Error("Credenciais inválidas");
        }

        // Valida senha inserida pelo usuário e senha salva no banco
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Retorna erro caso senhas sejam diferentes
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas");
        }

        // Gera o token JWT
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: "1h"
        });

        return { 
            token, 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    },

    verifyToken(token: string) {
        try {
            // Verifica o token com a chave secreta
            const decoded = jwt.verify(token, secret);
            return decoded; // Retorna os dados decodificados, como `userId`
        } catch (error) {
            // Lança erro caso o token seja inválido ou expirado
            throw new Error("Token inválido ou expirado");
        }
    }
};

export default authService; // Exporta o authService
