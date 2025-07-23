# Comentários sobre o Projeto e Observações

## Decisão da Arquitetura Utilizada
O projeto adota uma arquitetura full stack desacoplada, com uma clara separação entre o front-end (Vue.js + Vuetify) e o back-end (Node.js). O foco está na escalabilidade, clareza de responsabilidades e facilidade de manutenção.

## Back-end
O back-end foi desenvolvido com Node.js, utilizando o framework Express para construção da API RESTful. A comunicação com o banco de dados é realizada através do ORM Prisma, garantindo uma interação segura e performática com o banco de dados PostgreSQL ou MySQL, conforme especificado.

## Front-end
A interface foi construída com Vue.js, utilizando principalmente o Vuetify para facilitar o desenvolvimento e seguir os requisitos. O Vue Router foi utilizado para a navegação entre páginas, enquanto o Vuex gerencia o estado da aplicação, proporcionando uma estrutura escalável. O Axios facilita as requisições HTTP assíncronas ao back-end.

## Banco de Dados
O banco de dados foi configurado para utilizar PostgreSQL, conforme especificado. O uso do Prisma ORM facilita a integração com o banco de dados e a realização de migrações de forma controlada.

## Autenticação e Segurança
A autenticação foi feita utilizando tokens JWT (JSON Web Tokens), garantindo segurança nas requisições e evitando a necessidade de manter sessões no servidor.

## Lista de Bibliotecas de Terceiros Utilizadas

### Back-end:
- **Express**: Framework para construção da API RESTful.
- **Prisma**: ORM para acesso ao banco de dados.
- **jsonwebtoken**: Para criação e validação de tokens JWT.
- **cors**: Para permitir comunicação entre front-end e back-end em domínios diferentes.

### Front-end:
- **Vue.js**: Framework para construção da interface do usuário.
- **Vue Router**: Gerenciamento de rotas da aplicação.
- **Vuex**: Gerenciamento de estado da aplicação.
- **Axios**: Para requisições HTTP ao back-end.
- **Vuetify**: Framework de componentes baseados em Material Design para uma interface de usuário moderna e funcional.

---

# Como Rodar o Projeto challenge-full-stack-web Localmente

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)  
- [Git](https://git-scm.com/)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional, para banco via container)  
- Um editor de código (ex: VSCode)  

---

## Passo 1: Clonar o Repositório

Abra o terminal e execute:

```bash
git clone https://github.com/matheusoda/challenge-full-stack-web.git
cd challenge-full-stack-web
```

## Passo 2: Configurar o Banco de Dados

Usando Docker (Recomendado)
Execute o banco de dados via Docker:

```bash
docker-compose up -d
```

Isso vai iniciar o banco (PostgreSQL ou MySQL, conforme docker-compose.yml do projeto).


## Passo 3: Configurar Variáveis de Ambiente
Na raiz do projeto, crie um arquivo .env com as variáveis necessárias (veja o .env.example no projeto):

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
JWT_SECRET="seuSegredoSuperSecreto"
PORT=4000
```

## Passo 4: Instalar Dependências

No Backend:
```bash
cd backend
npm install
```

No Frontend:
```bash
cd ../frontend
npm install
```

## Passo 5: Executar Migrações do Banco 
```bash
cd backend
npx prisma migrate dev
```

## Passo 6: Rodar o Backend
Ainda na pasta backend:

```bash
npm run dev
```

## Passo 7: Rodar o Frontend
Na pasta frontend:

```bash
npm run dev
```

## Passo 8: Testar a Aplicação
Acessar:
http://localhost:5173


## Documentação
Com a aplicação backEnd rodando acessar:

http://localhost:3000/api-docs

---

## O que Você Melhoraria se Tivesse Mais Tempo?

### Testes Automatizados
Implementaria testes unitários e de integração para o front-end e back-end, garantindo maior confiabilidade nas funcionalidades e prevenindo regressões.

### Documentação Detalhada
Criaria uma documentação mais completa para contribuições e boas práticas para novos desenvolvedores, facilitando a colaboração no projeto.

### Escalabilidade e Performance
Aplicaria otimizações no back-end para suportar cargas maiores, como cache e uso de clusters..

### UI/UX
Aprimoraria a interface para tornar a experiência do usuário mais intuitiva, responsiva e acessível, incluindo melhorias no design visual e usabilidade.

### Segurança
Implementaria controle de permissões (níveis de acesso), além de reforçar as políticas de segurança, como rate limiting e proteção contra ataques comuns.
