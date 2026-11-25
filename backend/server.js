const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const { lerFilmes, salvarFilmes } = require('./storage');

const app = express();
const statusValidos = ['assistido', 'assistindo', 'quero'];

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

function validarFilme(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    return { erro: 'Envie os dados do filme em JSON.' };
  }

  if (typeof dados.titulo !== 'string' || !dados.titulo.trim()) {
    return { erro: 'Título é obrigatório.' };
  }
  if (!Number.isInteger(dados.ano) || dados.ano < 1888 || dados.ano > 2030) {
    return { erro: 'Ano deve ser um inteiro entre 1888 e 2030.' };
  }
  if (typeof dados.genero !== 'string' || !dados.genero.trim()) {
    return { erro: 'Gênero é obrigatório.' };
  }
  if (!Number.isInteger(dados.nota) || dados.nota < 1 || dados.nota > 5) {
    return { erro: 'Nota deve ser um inteiro de 1 a 5.' };
  }
  if (!statusValidos.includes(dados.status)) {
    return { erro: 'Status deve ser assistido, assistindo ou quero.' };
  }
  if (dados.poster !== undefined && typeof dados.poster !== 'string') {
    return { erro: 'Pôster deve ser um texto.' };
  }
  if (dados.comentario !== undefined && typeof dados.comentario !== 'string') {
    return { erro: 'Comentário deve ser um texto.' };
  }

  return {
    filme: {
      titulo: dados.titulo.trim(),
      ano: dados.ano,
      genero: dados.genero.trim(),
      poster: dados.poster || '',
      nota: dados.nota,
      status: dados.status,
      comentario: dados.comentario || ''
    }
  };
}

function buscarPorId(filmes, id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0
    ? filmes.find((filme) => filme.id === numero)
    : undefined;
}

app.get('/filmes', (req, res) => {
  const status = req.query.status;
  if (status !== undefined && !statusValidos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' });
  }

  const filmes = lerFilmes();
  res.json(status ? filmes.filter((filme) => filme.status === status) : filmes);
});

app.get('/filmes/:id', (req, res) => {
  const filme = buscarPorId(lerFilmes(), req.params.id);
  if (!filme) {
    return res.status(404).json({ erro: 'Filme não encontrado.' });
  }
  res.json(filme);
});

app.post('/filmes', (req, res) => {
  const resultado = validarFilme(req.body);
  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  const filmes = lerFilmes();
  const proximoId = filmes.reduce((maior, filme) => Math.max(maior, filme.id), 0) + 1;
  const novoFilme = { id: proximoId, ...resultado.filme };
  salvarFilmes([...filmes, novoFilme]);
  res.status(201).json(novoFilme);
});

app.put('/filmes/:id', (req, res) => {
  const filmes = lerFilmes();
  const existente = buscarPorId(filmes, req.params.id);
  if (!existente) {
    return res.status(404).json({ erro: 'Filme não encontrado.' });
  }

  const resultado = validarFilme(req.body);
  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  const atualizado = { id: existente.id, ...resultado.filme };
  salvarFilmes(filmes.map((filme) => filme.id === existente.id ? atualizado : filme));
  res.json(atualizado);
});

app.delete('/filmes/:id', (req, res) => {
  const filmes = lerFilmes();
  const existente = buscarPorId(filmes, req.params.id);
  if (!existente) {
    return res.status(404).json({ erro: 'Filme não encontrado.' });
  }

  salvarFilmes(filmes.filter((filme) => filme.id !== existente.id));
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido.' });
  }

  console.error(erro);
  res.status(500).json({ erro: 'Erro ao acessar o arquivo de filmes.' });
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`CineTrack API em http://localhost:${porta}`);
});
