const filtros = [
  { valor: 'todos', texto: 'Todos' },
  { valor: 'assistido', texto: 'Assistido' },
  { valor: 'assistindo', texto: 'Assistindo' },
  { valor: 'quero', texto: 'Quero assistir' }
];

export default function StatusFilter({ status, aoFiltrar }) {
  return (
    <nav className="status-filtros" aria-label="Filtros de status">
      {filtros.map((filtro) => (
        <button
          key={filtro.valor}
          type="button"
          className={status === filtro.valor ? 'ativo' : ''}
          aria-pressed={status === filtro.valor}
          onClick={() => aoFiltrar(filtro.valor)}
        >
          {filtro.texto}
        </button>
      ))}
    </nav>
  );
}
