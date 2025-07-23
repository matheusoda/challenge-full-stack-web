// prisma/seed.js
import { PrismaClient } from "../generated/prisma";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
    {
        name: "admin",
        email: "admin@mail.com",
        password: "admin"
    },
    {
        name: "Usuario1",
        email: "usuario1@mail.com",
        password: "12345678"
    },
    {
        name: "Usuario2",
        email: "usuario2@mail.com",
        password: "12345678"
    }
];

const students = [
    {
        name: "Paula Souza",
        email: "paula@mail.com",
        ra: "101253",
        cpf: "12199999999"
    },
    {
        name: "João Souza",
        email: "paula@mail.com",
        ra: "111687",
        cpf: "12299999999"
    },
    {
        name: "Marina Miranda",
        email: "paula@mail.com",
        ra: "111365",
        cpf: "12399999999"
    },
    {
        name: "Mauricio Souza",
        email: "paula@mail.com",
        ra: "101299",
        cpf: "12499999999"
    }
];

async function main() {
    for (const user of users) {
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!existingUser) {
            await prisma.user.create({
                data: {
                    id: randomUUID(),
                    name: user.name,
                    email: user.email,
                    password: hashedPassword
                }
            });
            console.log(`Usuário '${user.name}' criado com sucesso.`);
        } else {
            console.log(`Usuário '${user.name}' já existe.`);
        }
    }

    for (const student of students) {
        const existingUser = await prisma.student.findUnique({
            where: { cpf: student.cpf }
        });

        if (!existingUser) {
            await prisma.student.create({
                data: {
                    id: randomUUID(),
                    name: student.name,
                    email: student.email,
                    ra: student.ra,
                    cpf: student.cpf,
                }
            });
            console.log(`Estudante '${student.name}' criado com sucesso.`);
        } else {
            console.log(`Estudante '${student.name}' já existe.`);
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
