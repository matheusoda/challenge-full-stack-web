# Comentários sobre o Projeto e observações


## Decisão da Arquitetura Utilizada
A arquitetura adotada para este projeto segue uma abordagem de separação de responsabilidades, dividindo claramente as camadas de Front-end e Back-end, e mantendo o foco em escalabilidade e facilidade de manutenção.

## Back-end: 
O back-end foi desenvolvido com Node.js e o ORM Prisma, garantindo uma comunicação eficiente com o banco de dados PostgreSQL. A estrutura adotada para a API segue uma arquitetura RESTful, com o uso de rotas e controladores para definir claramente os endpoints e os serviços correspondentes. Utilizamos o padrão de middleware para validar dados de entrada, como a utilização do Zod para validação de schemas de dados.

## Front-end: 
A interface foi construída com Vue 3, utilizando principalmente o Vuetify para facilitar o desenvolvimento e seguir os requisitos. O Vue Router foi utilizado para a navegação entre páginas, enquanto o Vuex gerencia o estado da aplicação, proporcionando uma estrutura escalável. O Axios facilita as requisições HTTP assíncronas ao back-end, completando as ferramentas e linguagens utilizadas no front-end com foco em agilidade, escalabilidade.

## Banco de Dados: 
No banco de dados foi utilizado o PostgreSQL como banco de dados relacional, sendo acessado através do Prisma ORM. Essa escolha garante uma alta performance e uma modelagem de dados flexível e escalável. O uso do Prisma facilita a integração com o banco de dados e a realização de migrações de forma controlada.

## Autenticação e Segurança: 
A autenticação foi feita utilizando tokens JWT (JSON Web Tokens), garantindo segurança nas requisições e evitando a necessidade de manter sessões no servidor.

## Lista de Bibliotecas de Terceiros Utilizadas
### Back-end:

- Prisma: ORM para manipulação do banco de dados.
- Zod: Biblioteca para validação de dados de entrada.
- jsonwebtoken: Para geração e verificação de tokens JWT, garantindo a segurança nas requisições.
- express: Framework para facilitar a criação de rotas e middlewares no back-end.

### Front-end:

- Vue 3: Framework para a construção da interface.
- vue-router: Gerenciamento de navegação entre as páginas da aplicação.
- vuex: Gerenciamento de estado centralizado para a aplicação Vue.
- axios: Para realizar requisições HTTP ao back-end.
- Vuetify: Framework de componentes baseados em Material Design para uma interface de usuário moderna e funcional.


## O que Você Melhoraria se Tivesse Mais Tempo?
### Melhoria na Escalabilidade: 
Implementaria uma solução para escalar o back-end, utilizando containers Docker e Kubernetes, além de considerar uma arquitetura de microserviços para separar responsabilidades de forma mais granular.

### Documentação: 
Embora a documentação básica esteja presente, um guia mais detalhado de como contribuir para o projeto, além de exemplos de como configurar e executar a aplicação, poderia ser útil.

### Gestão de Erros: 
Melhoraria o tratamento de erros no back-end, implementando uma solução mais robusta para o gerenciamento de exceções e erros, e exibindo mensagens mais claras para os desenvolvedores e usuários finais.

### Testes Automatizados:
Os testes automatizados ainda não foram implementados. Com mais tempo, adicionaria testes unitários e de integração utilizando Vue Test Utils e Jest para validar a funcionalidade dos componentes e a interação com o back-end, garantindo maior confiabilidade e manutenção do sistema.

### Front-end Responsivo: 
Por mais que a aplicação esteja funcional, ainda seria necessário melhorar a responsividade e o design para se adaptar a nos diferentes tamanhos de tela e de dispositivos.


## Quais Requisitos Obrigatórios que Não Foram Entregues:

### Autenticação e Autorização Completa: 
Mesmo a aplicação utilizando JWT para autenticação, seria possivel implementar um nível de controle e gerenciamento mais detalhado, como o controle de permissões de usuário (admin, usuário comum), que não foi implementado.

### Validação de Dados Avançada: 
A validação de dados no front-end pode ser melhorada para garantir que os dados enviados para a API estejam em conformidade com o esperado antes de serem enviados.

### Design e UI Finalizada: 
A interface do usuário poderia ser mais detalhada e melhor acabada em termos de design, usabilidade, e confiabilidade com o mockup passado.

