const urlApi = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${urlApi}${caminho}`, opcoes);

  if (!resposta.ok) {
    let mensagem = `Erro na requisição (${resposta.status}).`;
    try {
      const dados = await resposta.json();
      mensagem = dados.erro || mensagem;
    } catch {
      // A resposta de erro pode não conter JSON.
    }
    throw new Error(mensagem);
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}

export function listarFilmes(status) {
  const filtro = status ? `?status=${encodeURIComponent(status)}` : '';
  return requisicao(`/filmes${filtro}`);
}

export function consultarFilme(id) {
  return requisicao(`/filmes/${encodeURIComponent(id)}`);
}

export function criarFilme(filme) {
  return requisicao('/filmes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme)
  });
}

export function atualizarFilme(id, filme) {
  return requisicao(`/filmes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme)
  });
}

export function removerFilme(id) {
  return requisicao(`/filmes/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
