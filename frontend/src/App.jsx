import { useEffect, useState } from 'react';
import { listarFilmes } from './api.js';
import Header from './components/Header.jsx';
import StatusFilter from './components/StatusFilter.jsx';
import MovieList from './components/MovieList.jsx';
import MovieForm from './components/MovieForm.jsx';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [status, setStatus] = useState('todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);
  const [tela, setTela] = useState('lista');

  useEffect(() => {
    async function carregarFilmes() {
      try {
        setFilmes(await listarFilmes());
      } catch (falha) {
        setErro(`Não foi possível carregar os filmes: ${falha.message}`);
      } finally {
        setCarregando(false);
      }
    }
    carregarFilmes();
  }, []);

  useEffect(() => {
    const tempo = setTimeout(() => setTermoBusca(busca.trim().toLowerCase()), 250);
    return () => clearTimeout(tempo);
  }, [busca]);

  const filmesVisiveis = filmes.filter((filme) => {
    const combinaBusca = filme.titulo.toLowerCase().includes(termoBusca);
    const combinaStatus = status === 'todos' || filme.status === status;
    return combinaBusca && combinaStatus;
  });

  function abrirFormulario(filme = null) {
    setFilmeEmEdicao(filme);
    setTela('formulario');
  }

  if (tela === 'formulario') {
    return (
      <>
        <Header />
        <MovieForm filme={filmeEmEdicao} aoCancelar={() => setTela('lista')} />
      </>
    );
  }

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => abrirFormulario()} mostrarBusca />
      <StatusFilter status={status} aoFiltrar={setStatus} />
      <MovieList
        filmes={filmesVisiveis}
        carregando={carregando}
        erro={erro}
        temFilmes={filmes.length > 0}
        aoEditar={abrirFormulario}
      />
      <footer><small>CineTrack - UEM</small></footer>
    </>
  );
}
