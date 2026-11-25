export default function Header({ busca, aoBuscar, aoAdicionar, mostrarBusca = false }) {
  return (
    <header className="header">
      <h1 className="logo">CineTrack</h1>
      {mostrarBusca && (
        <div className="header-actions">
          <label className="sr-only" htmlFor="busca">Buscar filme por título</label>
          <input
            id="busca"
            className="input-search"
            type="search"
            placeholder="Buscar filme"
            value={busca}
            onChange={(evento) => aoBuscar(evento.target.value)}
          />
          <button className="btn-add" type="button" onClick={aoAdicionar}>+ Adicionar</button>
        </div>
      )}
    </header>
  );
}
