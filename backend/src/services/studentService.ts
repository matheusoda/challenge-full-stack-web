import { PrismaClient, Prisma } from "../../generated/prisma";

import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export class StudentService {
    // Servico que cria um novo estudante
    static async createStudent(name: string, email: string, ra: string, cpf: string) {
        const student = await prisma.student.create({
            data: {
                id: randomUUID(),
                name,
                email,
                ra,
                cpf
            }
        });

        return student;
    }

    // Servico que busca todos os estudantes
    static async getAllStudent() {
        return prisma.student.findMany();
    }

    // Servico que busca estudante por ID
    static async getStudentById(id: string) {
        return prisma.student.findUnique({ where: { id } });
    }

    // Servico que atualiza dados de um estudante
    static async updateStudent(id: string, data: Prisma.StudentUpdateInput) {
        const studentExists = await prisma.student.findUnique({
            where: { id }
        });
        if (!studentExists) {
            throw new Error("Student not found");
        }

        return prisma.student.update({
            where: { id },
            data
        });
    }

    // Servico que exclui um estudante
    static async deleteStudent(id: string) {
        const studentExists = await prisma.student.findUnique({
            where: { id }
        });
        if (!studentExists) {
            throw new Error("Student not found");
        }
        return prisma.student.delete({ where: { id } });
    }
}
