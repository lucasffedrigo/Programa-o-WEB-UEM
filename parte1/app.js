// CineTrack

var filmesIniciais = [
  { id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=A+Origem", nota: 5, status: "assistido", comentario: "Revejo sempre." },
  { id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://placehold.co/200x300?text=Parasita", nota: 4, status: "assistido", comentario: "" },
  { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://placehold.co/200x300?text=Compadecida", nota: 5, status: "assistido", comentario: "Classico nacional." },
  { id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Duna+2", nota: 4, status: "assistindo", comentario: "" },
  { id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica", poster: "https://placehold.co/200x300?text=Interestelar", nota: 5, status: "quero", comentario: "" },
  { id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://placehold.co/200x300?text=Cidade+de+Deus", nota: 4, status: "quero", comentario: "" }
];

var filmes = [];

function carregar() {
  var salvo = localStorage.getItem("filmes");
  if (salvo) {
    filmes = JSON.parse(salvo);
  } else {
    filmes = filmesIniciais;
    salvar();
  }
}

function salvar() {
  localStorage.setItem("filmes", JSON.stringify(filmes));
}

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

function textoStatus(status) {
  if (status === "assistido") return "assistido";
  if (status === "assistindo") return "assistindo";
  return "quero assistir";
}

function render(lista) {
  var main = document.getElementById("lista");
  main.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var f = lista[i];

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
        '<button class="btn-editar" data-id="' + f.id + '">Editar</button>' +
        '<button class="btn-remover" data-id="' + f.id + '">Remover</button>' +
      '</div>';

    main.appendChild(card);
  }
}

var termoBusca = "";
var statusAtivo = "todos";

// filtra por titulo e status ao mesmo tempo
function aplicarFiltros() {
  var lista = [];

  for (var i = 0; i < filmes.length; i++) {
    var f = filmes[i];

    var titulo = f.titulo.toLowerCase();
    var combinaBusca = titulo.indexOf(termoBusca.toLowerCase()) !== -1;
    var combinaStatus = statusAtivo === "todos" || f.status === statusAtivo;

    if (combinaBusca && combinaStatus) {
      lista.push(f);
    }
  }

  render(lista);
}

function removerFilme(id) {
  var novaLista = [];
  for (var i = 0; i < filmes.length; i++) {
    if (filmes[i].id !== id) {
      novaLista.push(filmes[i]);
    }
  }
  filmes = novaLista;
  salvar();
  aplicarFiltros();
}

carregar();

// Pagina da home (listagem)
if (document.getElementById("lista")) {
  aplicarFiltros();

  var tempoBusca;
  var campoBusca = document.getElementById("busca");
  campoBusca.addEventListener("input", function () {
    clearTimeout(tempoBusca);
    tempoBusca = setTimeout(function () {
      termoBusca = campoBusca.value;
      aplicarFiltros();
    }, 250);
  });

  var botoesFiltro = document.querySelectorAll("nav button");
  for (var b = 0; b < botoesFiltro.length; b++) {
    botoesFiltro[b].addEventListener("click", function () {
      for (var j = 0; j < botoesFiltro.length; j++) {
        botoesFiltro[j].classList.remove("ativo");
      }
      this.classList.add("ativo");

      statusAtivo = this.getAttribute("data-status");
      aplicarFiltros();
    });
  }

  // editar e remover (os botoes sao criados pelo render)
  var lista = document.getElementById("lista");
  lista.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-remover")) {
      var id = Number(e.target.getAttribute("data-id"));
      if (confirm("Remover este filme?")) {
        removerFilme(id);
      }
    }
    if (e.target.classList.contains("btn-editar")) {
      var id = e.target.getAttribute("data-id");
      window.location.href = "adicionar.html?id=" + id;
    }
  });
}

// Pagina de adicionar/editar
if (document.getElementById("form-filme")) {
  var form = document.getElementById("form-filme");
  var erro = document.getElementById("erro");

  // se veio um id na url, estamos editando
  var params = new URLSearchParams(window.location.search);
  var idEditar = params.get("id");
  var filmeEditar = null;

  if (idEditar) {
    for (var i = 0; i < filmes.length; i++) {
      if (filmes[i].id === Number(idEditar)) {
        filmeEditar = filmes[i];
      }
    }
  }

  if (filmeEditar) {
    document.getElementById("form-titulo").textContent = "Editar filme";
    document.getElementById("titulo").value = filmeEditar.titulo;
    document.getElementById("ano").value = filmeEditar.ano;
    document.getElementById("genero").value = filmeEditar.genero;
    document.getElementById("poster").value = filmeEditar.poster;
    document.getElementById("status").value = filmeEditar.status;
    document.getElementById("nota").value = filmeEditar.nota;
    document.getElementById("comentario").value = filmeEditar.comentario;
  }

  document.getElementById("cancelar").addEventListener("click", function () {
    window.location.href = "home.html";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var titulo = document.getElementById("titulo").value.trim();
    var ano = Number(document.getElementById("ano").value);
    var genero = document.getElementById("genero").value.trim();
    var poster = document.getElementById("poster").value.trim();
    var status = document.getElementById("status").value;
    var nota = Number(document.getElementById("nota").value);
    var comentario = document.getElementById("comentario").value.trim();

    // validacao
    if (titulo === "") {
      erro.textContent = "Informe o titulo.";
      return;
    }
    if (ano < 1888 || ano > 2030) {
      erro.textContent = "Informe um ano valido.";
      return;
    }
    if (genero === "") {
      erro.textContent = "Informe o genero.";
      return;
    }
    if (nota < 1 || nota > 5) {
      erro.textContent = "A nota deve ser de 1 a 5.";
      return;
    }

    erro.textContent = "";

    if (filmeEditar) {
      // atualiza o filme existente
      filmeEditar.titulo = titulo;
      filmeEditar.ano = ano;
      filmeEditar.genero = genero;
      filmeEditar.poster = poster;
      filmeEditar.status = status;
      filmeEditar.nota = nota;
      filmeEditar.comentario = comentario;
    } else {
      // cria um id novo
      var novoId = 1;
      for (var k = 0; k < filmes.length; k++) {
        if (filmes[k].id >= novoId) {
          novoId = filmes[k].id + 1;
        }
      }
      filmes.push({
        id: novoId,
        titulo: titulo,
        ano: ano,
        genero: genero,
        poster: poster,
        status: status,
        nota: nota,
        comentario: comentario
      });
    }

    salvar();
    window.location.href = "home.html";
  });
}
