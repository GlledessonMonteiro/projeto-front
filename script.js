"use strict";

const estudantes = [
  {
    nome: "Ana Souza",
    turma: "2º A",
    codigo: "BIO0001",
    status: "Presente",
  },
  {
    nome: "Bruno Lima",
    turma: "2º A",
    codigo: "BIO0002",
    status: "Presente",
  },
  {
    nome: "Camila Rocha",
    turma: "2º A",
    codigo: "BIO0003",
    status: "Aguardando",
  },
  {
    nome: "Diego Santos",
    turma: "2º A",
    codigo: "BIO0004",
    status: "Presente",
  },
  {
    nome: "Elisa Martins",
    turma: "2º A",
    codigo: "BIO0005",
    status: "Aguardando",
  },
  {
    nome: "Felipe Alves",
    turma: "2º A",
    codigo: "BIO0006",
    status: "Presente",
  },
];

const historico = [
  {
    horario: "07:04",
    nome: "Ana Souza",
    codigo: "BIO0001",
    situacao: "Entrada liberada",
  },
  {
    horario: "07:07",
    nome: "Bruno Lima",
    codigo: "BIO0002",
    situacao: "Entrada liberada",
  },
  {
    horario: "07:12",
    nome: "Diego Santos",
    codigo: "BIO0004",
    situacao: "Entrada liberada",
  },
];

function iniciais(nome) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

function avatarSvg(nome) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
      <rect width="100%" height="100%" rx="22" fill="#dbeafe" />
      <text
        x="50%"
        y="56%"
        text-anchor="middle"
        font-family="Arial"
        font-size="32"
        font-weight="700"
        fill="#17365d"
      >${iniciais(nome)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapar(texto) {
  return String(texto).replace(
    /[&<>"]/g,
    (caractere) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[caractere],
  );
}

function renderizarEstudantes(lista = estudantes) {
  const container = document.querySelector("#student-list");

  if (!lista.length) {
    container.innerHTML =
      '<p class="empty-message">Nenhum estudante encontrado.</p>';
    return;
  }

  container.innerHTML = lista
    .map((estudante) => {
      const presente = estudante.status === "Presente";

      return `
        <article class="student-card">
          <img
            src="${avatarSvg(estudante.nome)}"
            alt="Avatar com iniciais de ${escapar(estudante.nome)}"
            loading="lazy"
            width="52"
            height="52"
          >

          <div>
            <strong>${escapar(estudante.nome)}</strong>

            <small>
              ${escapar(estudante.turma)} • ${escapar(estudante.codigo)}
            </small>

            <span class="status ${
              presente ? "status--present" : "status--pending"
            }">
              ${escapar(estudante.status)}
            </span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderizarHistorico() {
  document.querySelector("#history-body").innerHTML = historico
    .slice(0, 8)
    .map(
      (item) => `
        <tr>
          <td>${item.horario}</td>
          <td>${escapar(item.nome)}</td>
          <td>${escapar(item.codigo)}</td>
          <td>${escapar(item.situacao)}</td>
        </tr>
      `,
    )
    .join("");
}

function atualizarMetricas() {
  const presentes = estudantes.filter(
    (estudante) => estudante.status === "Presente",
  ).length;

  document.querySelector("#metric-students").textContent =
    estudantes.length;

  document.querySelector("#metric-present").textContent = presentes;

  document.querySelector("#metric-pending").textContent =
    estudantes.length - presentes;
}

function horarioAtual() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function atualizarRelogio() {
  const agora = new Date();

  document.querySelector("#current-date").textContent =
    new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }).format(agora);

  document.querySelector("#current-time").textContent = horarioAtual();
}

function renderizarTudo() {
  renderizarEstudantes();
  renderizarHistorico();
  atualizarMetricas();
}

document
  .querySelector("#student-search")
  .addEventListener("input", (event) => {
    const termo = event.target.value.trim().toLowerCase();

    const filtrados = estudantes.filter(
      (estudante) =>
        estudante.nome.toLowerCase().includes(termo) ||
        estudante.codigo.toLowerCase().includes(termo),
    );

    renderizarEstudantes(filtrados);
  });

atualizarRelogio();

setInterval(atualizarRelogio, 60000);

renderizarTudo();