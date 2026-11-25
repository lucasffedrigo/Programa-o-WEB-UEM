# CineTrack

Trabalho da disciplina de Programação de Sistemas Web (UEM) — Parte 1: Frontend Interativo.

Aplicação web para gerenciar uma lista pessoal de filmes: registrar o que já viu, o que está vendo e o que quer ver.

Feito em JavaScript puro (ES6+), HTML5 e CSS3, sem frameworks. Toda a lógica roda no navegador e os dados são persistidos no `localStorage`.

## Funcionalidades

- Listagem de filmes em cards gerados dinamicamente pelo JavaScript.
- Busca por título (case-insensitive, com debounce).
- Filtro por status (Todos, Assistido, Assistindo, Quero assistir) combinado com a busca.
- Cadastro, edição e remoção de filmes, com validação em JavaScript e confirmação na remoção.
- Persistência local: a lista é mantida entre recarregamentos da página.
- Na primeira visita, 6 filmes de exemplo são pré-carregados.
- Layout responsivo com CSS Grid, tema via variáveis CSS e dark mode automático.

## Aluno(s)

- Nome: Lucas Rodrigues Fedrigo
- R.A.: 129060

## Como executar

1. Abra a pasta `parte1/`.
2. Abra o arquivo `home.html` no navegador (duplo clique ou arraste para uma aba).

Não há servidor nem banco de dados: os dados ficam salvos no próprio navegador (localStorage).

## Estrutura

```
cinetrack/
├── README.md
└── parte1/
    ├── home.html       (listagem de filmes em cards)
    ├── adicionar.html  (formulário de cadastro)
    ├── style.css
    └── app.js
```

## Parte 2 — Aplicação full stack

A Parte 2 mantém a Parte 1 em `parte1/` e acrescenta uma interface React com Vite e uma API Node.js com Express. Os filmes são salvos em `backend/data/filmes.json`.

### Pré-requisitos

- Node.js 20.19 ou mais recente.
- npm (instalado junto com o Node.js).

### Executar o backend

1. Abra um terminal na pasta `backend/` e instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` (`Copy-Item .env.example .env` no PowerShell ou `cp .env.example .env` no Bash). Os valores padrão usam a porta `3000` e o frontend em `http://localhost:5173`.
3. Para restaurar os seis filmes oficiais, execute `npm run seed`. Esse comando substitui o conteúdo atual de `data/filmes.json`; não o execute se quiser preservar alterações feitas na lista.
4. Inicie a API:

   ```bash
   npm start
   ```

A API fica disponível em `http://localhost:3000/filmes`.

### Executar o frontend

Em outro terminal, abra a pasta `frontend/`, instale as dependências e inicie o Vite:

```bash
npm install
npm run dev
```

Acesse o endereço exibido pelo Vite, normalmente `http://localhost:5173/`.

### Rotas da API

- `GET /filmes` lista os filmes; `GET /filmes?status=assistido` filtra por status.
- `GET /filmes/:id` consulta um filme.
- `POST /filmes` cadastra um filme.
- `PUT /filmes/:id` atualiza um filme.
- `DELETE /filmes/:id` remove um filme.
