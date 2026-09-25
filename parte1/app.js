// CineTrack - app.js
// Parte 1: dados iniciais, persistência local e render dos cards

// Dados de exemplo (carregados na primeira visita)
var filmesIniciais = [
  { id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=A+Origem", nota: 5, status: "assistido", comentario: "Revejo sempre." },
  { id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://placehold.co/200x300?text=Parasita", nota: 4, status: "assistido", comentario: "" },
  { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://placehold.co/200x300?text=Compadecida", nota: 5, status: "assistido", comentario: "Classico nacional." },
  { id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Duna+2", nota: 4, status: "assistindo", comentario: "" },
  { id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Interestelar", nota: 5, status: "quero", comentario: "" },
  { id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://placehold.co/200x300?text=Cidade+de+Deus", nota: 4, status: "quero", comentario: "" }
];

// Lista que fica na memória durante o uso
var filmes = [];

// Carrega os filmes do localStorage; na primeira visita usa os dados iniciais
function carregar() {
  var salvo = localStorage.getItem("filmes");
  if (salvo) {
    filmes = JSON.parse(salvo);
  } else {
    filmes = filmesIniciais;
    salvar();
  }
}

// Salva a lista atual no localStorage
function salvar() {
  localStorage.setItem("filmes", JSON.stringify(filmes));
}

// Monta as 5 estrelas (cheias e vazias) conforme a nota
function estrelas(nota) {
  var texto = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= nota) {
      texto = texto + "★";
    } else {
      texto = texto + "☆";
    }
  }
  return texto;
}

// Texto e classe da badge de status
function textoStatus(status) {
  if (status === "assistido") return "assistido";
  if (status === "assistindo") return "assistindo";
  return "quero assistir";
}

// Desenha os cards na tela
function render(lista) {
  var main = document.getElementById("lista");
  main.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var f = lista[i];

    // Se não tiver pôster, usa um placeholder
    var poster = f.poster;
    if (!poster) {
      poster = "https://placehold.co/200x300?text=Sem+Poster";
    }

    var card = document.createElement("section");
    card.className = "card";
    card.innerHTML =
      '<img src="' + poster + '" alt="' + f.titulo + '" class="card-poster">' +
      '<h2 class="card-title">' + f.titulo + '</h2>' +
      '<p class="card-meta">' + f.ano + ' · ' + f.genero + '</p>' +
      '<p class="card-rating">Nota: ' + estrelas(f.nota) + '</p>' +
      '<div class="card-footer">' +
        '<span class="badge badge-' + f.status + '">' + textoStatus(f.status) + '</span>' +
        '<button>Editar</button>' +
        '<button>Remover</button>' +
      '</div>';

    main.appendChild(card);
  }
}

// Inicialização
carregar();
render(filmes);
