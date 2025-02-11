import { PrismaClient } from "@prisma/client";

import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserService {
    // Servico que cria um novo usuario
    static async createUser(name, email, phone, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                id: randomUUID(),
                name,
                email,
                phone,
                password: hashedPassword
            }
        });

        return user;
    }

    // Servico que busca todos usuarios
    static async getAllUser() {
        return prisma.user.findMany();
    }

    // Servico que busca usuario por ID
    static async getUserById(id) {
        return prisma.user.findUnique({ where: { id } });
    }

    //  Servico que atualiza dados de um usuario
    static async updateUser(id, data) {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    // Servico que exclui um usuario
    static async deleteUser(id) {
        return prisma.user.delete({ where: { id } });
    }
}
