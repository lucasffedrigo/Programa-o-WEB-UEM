import { useState } from 'react';

const filmeVazio = {
  titulo: '',
  ano: '',
  genero: '',
  poster: '',
  status: 'quero',
  nota: '',
  comentario: ''
};

export default function MovieForm({ filme, aoCancelar }) {
  const [dados, setDados] = useState(filme || filmeVazio);

  function alterar(campo, valor) {
    setDados((anteriores) => ({ ...anteriores, [campo]: valor }));
  }

  return (
    <main className="form-page">
      <button className="voltar" type="button" onClick={aoCancelar}>← Voltar</button>
      <h1 className="form-page-titulo">{filme ? 'Editar filme' : 'Adicionar filme'}</h1>
      <form className="form-card" onSubmit={(evento) => evento.preventDefault()}>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" type="text" required value={dados.titulo} onChange={(evento) => alterar('titulo', evento.target.value)} />

        <label htmlFor="ano">Ano</label>
        <input id="ano" name="ano" type="number" min="1888" max="2030" required value={dados.ano} onChange={(evento) => alterar('ano', evento.target.value)} />

        <label htmlFor="genero">Gênero</label>
        <input id="genero" name="genero" type="text" required value={dados.genero} onChange={(evento) => alterar('genero', evento.target.value)} />

        <label htmlFor="poster">URL do pôster</label>
        <input id="poster" name="poster" type="text" value={dados.poster} onChange={(evento) => alterar('poster', evento.target.value)} />

        <label htmlFor="status">Status</label>
        <select id="status" name="status" required value={dados.status} onChange={(evento) => alterar('status', evento.target.value)}>
          <option value="quero">Quero assistir</option>
          <option value="assistindo">Assistindo</option>
          <option value="assistido">Já assisti</option>
        </select>

        <label htmlFor="nota">Nota (1 a 5)</label>
        <input id="nota" name="nota" type="number" min="1" max="5" required value={dados.nota} onChange={(evento) => alterar('nota', evento.target.value)} />

        <label htmlFor="comentario">Comentário</label>
        <textarea id="comentario" name="comentario" value={dados.comentario} onChange={(evento) => alterar('comentario', evento.target.value)} />

        <div className="form-acoes">
          <button className="btn-cancelar" type="button" onClick={aoCancelar}>Cancelar</button>
          <button className="btn-salvar" type="submit" disabled>Salvar</button>
        </div>
      </form>
    </main>
  );
}
