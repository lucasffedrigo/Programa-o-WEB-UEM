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
