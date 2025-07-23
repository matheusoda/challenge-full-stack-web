import request from 'supertest'
import { app } from '../server'
import { PrismaClient } from '../../generated/prisma'

describe('Testes de rotas públicas', () => {
  it('deve realizar login com sucesso', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'admin@mail.com', password: 'admin' })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('token')
  })

  it('deve falhar com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'admin@mail.com', password: 'senhaerrada' })

    expect(response.status).toBe(401)
  })
})


let token: string
let createdStudentId: string;

const prisma = new PrismaClient();

beforeAll(async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ email: 'admin@mail.com', password: 'admin' })

  token = res.body.data.token
})


afterAll(async () => {
  if (createdStudentId) {
    await prisma.student.delete({
      where: { cpf: '234.567.890-00' }
    });
  }

  await prisma.$disconnect();
});

describe('Rotas protegidas', () => {
  it('deve retornar todos os estudantes', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('deve criar novo estudante', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
        email: 'teste2@email.com',
        ra: 'RA234567',
        cpf: '234.567.890-00',
      });

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    createdStudentId = res.body.id;
  })
})

