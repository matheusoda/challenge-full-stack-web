// src/__tests__/students.spec.ts
import request from 'supertest';
import { app } from '../server';
import { PrismaClient } from '../../generated/prisma';

let token: string;
let createdStudentId: string;
const prisma = new PrismaClient();

beforeAll(async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ email: 'admin@mail.com', password: 'admin' });

  token = res.body.data.token;
});

afterAll(async () => {
  if (createdStudentId) {
    await prisma.student.delete({
      where: { id: createdStudentId }
    });
  }

  await prisma.$disconnect();
});

describe('Rotas de estudantes', () => {
  it('Deve retornar 401 ao acessar rota protegida sem token', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(401);
  });

  it('Deve retornar todos os estudantes', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve criar um novo estudante', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste Jest',
        email: 'testejest@email.com',
        ra: 'RA123456',
        cpf: '123.456.789-00',
      });

    expect(res.statusCode).toBe(201);

    expect(res.body).toHaveProperty('id');

    createdStudentId = res.body.id; // salvar para testes seguintes
  });

  it('Deve retornar o estudante criado pelo ID', async () => {
    const res = await request(app)
      .get(`/api/students/${createdStudentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdStudentId);
  });

  it('Deve atualizar o estudante pelo ID', async () => {
    const res = await request(app)
      .put(`/api/students/${createdStudentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste Jest Atualizado',
        email: 'testejestatualizado@email.com',
        ra: 'RA654321',
        cpf: '987.654.321-00',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Teste Jest Atualizado');
  });

  it('Deve deletar o estudante pelo ID', async () => {
    const res = await request(app)
      .delete(`/api/students/${createdStudentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it('Deve retornar 404 ao buscar estudante deletado', async () => {
    const res = await request(app)
      .get(`/api/students/${createdStudentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});
