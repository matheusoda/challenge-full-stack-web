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

    static async getPaginatedStudents(page: number, limit: number, search: string) {
        const skip = (page - 1) * limit;

        const where: Prisma.StudentWhereInput = search
            ? {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                    {
                        ra: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }
            : {}

        const [students, total] = await Promise.all([
            prisma.student.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }, // opcional
            }),
            prisma.student.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: students,
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        };
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
