const nomesStatus = {
  assistido: 'assistido',
  assistindo: 'assistindo',
  quero: 'quero assistir'
};

export default function MovieCard({ filme, aoEditar }) {
  const estrelas = '★'.repeat(filme.nota) + '☆'.repeat(5 - filme.nota);
  const poster = filme.poster || 'https://placehold.co/200x300?text=Sem+Poster';

  return (
    <section className="card">
      <img className="card-poster" src={poster} alt={`Pôster de ${filme.titulo}`} />
      <h2 className="card-title">{filme.titulo}</h2>
      <p className="card-meta">{filme.ano} · {filme.genero}</p>
      <p className="card-rating" aria-label={`Nota: ${filme.nota} de 5 estrelas`}>
        Nota: <span aria-hidden="true">{estrelas}</span>
      </p>
      <div className="card-footer">
        <span className={`badge badge-${filme.status}`}>{nomesStatus[filme.status]}</span>
        <button type="button" onClick={() => aoEditar(filme)}>Editar</button>
        <button type="button" disabled>Remover</button>
      </div>
    </section>
  );
}
