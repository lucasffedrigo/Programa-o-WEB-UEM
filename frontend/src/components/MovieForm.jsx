import { useState } from 'react';

function criarFilmeVazio() {
  return {
    titulo: '',
    ano: '',
    genero: '',
    poster: '',
    status: 'quero',
    nota: '',
    comentario: ''
  };
}

export default function MovieForm({ filme, erro, salvando, aoSalvar, aoCancelar }) {
  const [dados, setDados] = useState(() => filme ? { ...filme } : criarFilmeVazio());
  const [erroValidacao, setErroValidacao] = useState('');

  function alterar(campo, valor) {
    setDados((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErroValidacao('');
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    setErroValidacao('');

    const formulario = evento.currentTarget;
    if (!formulario.checkValidity()) {
      const campoInvalido = formulario.querySelector(':invalid');
      const mensagens = {
        titulo: 'Informe o título do filme.',
        ano: 'Informe um ano inteiro entre 1888 e 2030.',
        genero: 'Informe o gênero do filme.',
        status: 'Selecione o status do filme.',
        nota: 'Informe uma nota inteira de 1 a 5.'
      };
      return setErroValidacao(mensagens[campoInvalido.name] || 'Revise os campos obrigatórios.');
    }

    const titulo = dados.titulo.trim();
    const genero = dados.genero.trim();
    const ano = Number(dados.ano);
    const nota = Number(dados.nota);

    if (!titulo) return setErroValidacao('Informe o título do filme.');
    if (!Number.isInteger(ano) || ano < 1888 || ano > 2030) {
      return setErroValidacao('Informe um ano inteiro entre 1888 e 2030.');
    }
    if (!genero) return setErroValidacao('Informe o gênero do filme.');
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
      return setErroValidacao('A nota deve ser um número inteiro de 1 a 5.');
    }

    aoSalvar({
      titulo,
      ano,
      genero,
      poster: dados.poster.trim(),
      status: dados.status,
      nota,
      comentario: dados.comentario.trim()
    });
  }

  return (
    <main className="form-page">
      <button className="voltar" type="button" onClick={aoCancelar} disabled={salvando}>← Voltar</button>
      <h1 className="form-page-titulo">{filme ? 'Editar filme' : 'Adicionar filme'}</h1>
      <form className="form-card" noValidate onSubmit={enviarFormulario}>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" type="text" required disabled={salvando} value={dados.titulo} onChange={(evento) => alterar('titulo', evento.target.value)} />

        <label htmlFor="ano">Ano</label>
        <input id="ano" name="ano" type="number" min="1888" max="2030" step="1" required disabled={salvando} value={dados.ano} onChange={(evento) => alterar('ano', evento.target.value)} />

        <label htmlFor="genero">Gênero</label>
        <input id="genero" name="genero" type="text" required disabled={salvando} value={dados.genero} onChange={(evento) => alterar('genero', evento.target.value)} />

        <label htmlFor="poster">URL do pôster</label>
        <input id="poster" name="poster" type="text" disabled={salvando} value={dados.poster} onChange={(evento) => alterar('poster', evento.target.value)} />

        <label htmlFor="status">Status</label>
        <select id="status" name="status" required disabled={salvando} value={dados.status} onChange={(evento) => alterar('status', evento.target.value)}>
          <option value="quero">Quero assistir</option>
          <option value="assistindo">Assistindo</option>
          <option value="assistido">Já assisti</option>
        </select>

        <label htmlFor="nota">Nota (1 a 5)</label>
        <input id="nota" name="nota" type="number" min="1" max="5" step="1" required disabled={salvando} value={dados.nota} onChange={(evento) => alterar('nota', evento.target.value)} />

        <label htmlFor="comentario">Comentário</label>
        <textarea id="comentario" name="comentario" disabled={salvando} value={dados.comentario} onChange={(evento) => alterar('comentario', evento.target.value)} />

        {(erroValidacao || erro) && <p className="form-erro" role="alert">{erroValidacao || erro}</p>}
        <div className="form-acoes">
          <button className="btn-cancelar" type="button" onClick={aoCancelar} disabled={salvando}>Cancelar</button>
          <button className="btn-salvar" type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </main>
  );
}
