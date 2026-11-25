import { useEffect, useState } from 'react';
import { atualizarFilme, criarFilme, listarFilmes, removerFilme } from './api.js';
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
  const [erroCarregamento, setErroCarregamento] = useState('');
  const [erroOperacao, setErroOperacao] = useState('');
  const [erroFormulario, setErroFormulario] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [idRemovendo, setIdRemovendo] = useState(null);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);
  const [tela, setTela] = useState('lista');

  useEffect(() => {
    async function carregarFilmes() {
      try {
        setFilmes(await listarFilmes());
      } catch (falha) {
        setErroCarregamento(`Não foi possível carregar os filmes: ${falha.message}`);
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
    setErroFormulario('');
    setErroOperacao('');
    setFilmeEmEdicao(filme);
    setTela('formulario');
  }

  async function salvarFilme(dados) {
    if (salvando) return;
    setSalvando(true);
    setErroFormulario('');

    try {
      if (filmeEmEdicao) {
        const atualizado = await atualizarFilme(filmeEmEdicao.id, dados);
        setFilmes((listaAtual) => listaAtual.map((filme) =>
          filme.id === atualizado.id ? atualizado : filme
        ));
      } else {
        const criado = await criarFilme(dados);
        setFilmes((listaAtual) => [...listaAtual, criado]);
      }

      setTela('lista');
      setFilmeEmEdicao(null);
    } catch (falha) {
      setErroFormulario(`Não foi possível salvar o filme: ${falha.message}`);
    } finally {
      setSalvando(false);
    }
  }

  async function removerFilmeDaLista(filme) {
    if (idRemovendo !== null) return;
    const confirmou = window.confirm(`Remover “${filme.titulo}” da lista?`);
    if (!confirmou) return;

    setIdRemovendo(filme.id);
    setErroOperacao('');
    try {
      await removerFilme(filme.id);
      setFilmes((listaAtual) => listaAtual.filter((item) => item.id !== filme.id));
    } catch (falha) {
      setErroOperacao(`Não foi possível remover o filme: ${falha.message}`);
    } finally {
      setIdRemovendo(null);
    }
  }

  if (tela === 'formulario') {
    return (
      <>
        <Header />
        <MovieForm
          filme={filmeEmEdicao}
          erro={erroFormulario}
          salvando={salvando}
          aoSalvar={salvarFilme}
          aoCancelar={() => {
            if (!salvando) {
              setErroFormulario('');
              setTela('lista');
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => abrirFormulario()} mostrarBusca />
      <StatusFilter status={status} aoFiltrar={setStatus} />
      {erroOperacao && <p className="aviso-erro" role="alert">{erroOperacao}</p>}
      <MovieList
        filmes={filmesVisiveis}
        carregando={carregando}
        erro={erroCarregamento}
        temFilmes={filmes.length > 0}
        aoEditar={abrirFormulario}
        aoRemover={removerFilmeDaLista}
        idRemovendo={idRemovendo}
      />
      <footer><small>CineTrack - UEM</small></footer>
    </>
  );
}
