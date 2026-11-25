const fs = require('node:fs');
const path = require('node:path');

const arquivo = path.join(__dirname, 'data', 'filmes.json');

function lerFilmes() {
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const filmes = JSON.parse(conteudo);

  if (!Array.isArray(filmes)) {
    throw new Error('O arquivo de filmes deve conter uma lista.');
  }

  return filmes;
}

function salvarFilmes(filmes) {
  fs.mkdirSync(path.dirname(arquivo), { recursive: true });
  fs.writeFileSync(arquivo, JSON.stringify(filmes, null, 2) + '\n', 'utf8');
}

module.exports = { lerFilmes, salvarFilmes };
