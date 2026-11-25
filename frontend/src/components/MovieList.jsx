import MovieCard from './MovieCard.jsx';

export default function MovieList({ filmes, carregando, erro, temFilmes, aoEditar, aoRemover, idRemovendo }) {
  let mensagem = '';
  if (carregando) mensagem = 'Carregando filmes...';
  else if (erro) mensagem = erro;
  else if (!temFilmes) mensagem = 'Nenhum filme cadastrado.';
  else if (filmes.length === 0) mensagem = 'Nenhum filme encontrado para esta busca ou filtro.';

  return (
    <main id="lista" aria-live="polite">
      {mensagem
        ? <p className="estado-lista">{mensagem}</p>
        : filmes.map((filme) => (
          <MovieCard
            key={filme.id}
            filme={filme}
            aoEditar={aoEditar}
            aoRemover={aoRemover}
            removendo={idRemovendo === filme.id}
          />
        ))}
    </main>
  );
}
