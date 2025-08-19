# Backend - Web Login/Register

Este é o backend de uma aplicação de autenticação e gerenciamento de usuários, utilizando Node.js, Express e MySQL.

## Pré-requisitos
- Node.js >= 14
- npm >= 6
- MySQL

## Instalação
```bash
npm install
```

## Configuração
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DB_HOST=localhost         # Host do banco de dados MySQL
DB_USER=seu_usuario       # Usuário do banco de dados
DB_PASSWORD=sua_senha     # Senha do banco de dados
DB_NAME=nome_do_banco     # Nome do banco de dados
JWT_SECRET=SECRET         # Segredo para geração dos tokens JWT
SERVER_PORT=3001          # Porta em que o servidor irá rodar
```

## Scripts
- `npm start` — Inicia o servidor em modo produção
- `npm run dev` — Inicia o servidor com nodemon (desenvolvimento)

## Rodando o projeto
```bash
npm run dev
```
O backend estará disponível em `http://localhost:3001` (ou porta definida no .env).

## Estrutura de pastas
```
Backend/
  src/
    controllers/
    middlewares/
    models/
    routes/
    db.js
    server.js
  package.json
  .env
  README.md
```

## Tecnologias
- Node.js
- Express
- MySQL
- Nodemon (dev)
- CORS

## Observações
- Certifique-se de que o banco de dados MySQL está rodando e configurado corretamente.
- Não esqueça de adicionar o arquivo `.env` (não versionado).

---

> Para dúvidas ou sugestões, abra uma issue ou entre em contato com o mantenedor. 

