/**
 * ProWorkout Manager - Lógica Front-End Otimizada
 * Gerenciamento de estado local via localStorage
 */

const STORAGE_KEY = "proworkout_atletas_data";

// Estado Global
let atletas = [];
let atletaIdAtivo = null;
let categoriaAtiva = "Treino A";

// Inicialização da Aplicação
document.addEventListener("DOMContentLoaded", () => {
  carregarDadosStorage();
  renderizarPessoas();
});

/* ==========================================================================
   Persistência de Dados (localStorage)
   ========================================================================== */
function carregarDadosStorage() {
  const dados = localStorage.getItem(STORAGE_KEY);
  atletas = dados ? JSON.parse(dados) : [];
}

function salvarDadosStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atletas));
}

/* ==========================================================================
   Gestão de Pessoas / Atletas
   ========================================================================== */
function handleAdicionarPessoa(event) {
  event.preventDefault();
  const inputNome = document.getElementById("pessoa-nome");
  const nome = inputNome.value.trim();

  if (!nome) return;

  const novoAtleta = {
    id: Date.now(),
    nome: nome,
    exercicios: []
  };

  atletas.push(novoAtleta);
  salvarDadosStorage();
  
  inputNome.value = "";
  selecionarPessoa(novoAtleta.id);
}

function renderizarPessoas() {
  const abasContainer = document.getElementById("abas-pessoas");
  const areaTreinos = document.getElementById("area-treinos");
  const estadoVazio = document.getElementById("estado-vazio");
  
  abasContainer.innerHTML = "";

  if (atletas.length === 0) {
    areaTreinos.classList.add("hidden");
    estadoVazio.classList.remove("hidden");
    atletaIdAtivo = null;
    return;
  }

  atletas.forEach(atleta => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `aba-pessoa ${atleta.id === atletaIdAtivo ? 'active' : ''}`;
    btn.textContent = atleta.nome;
    btn.onclick = () => selecionarPessoa(atleta.id);
    abasContainer.appendChild(btn);
  });

  // Se nenhum estiver ativo, ativa o primeiro da lista
  if (!atletaIdAtivo && atletas.length > 0) {
    selecionarPessoa(atletas[0].id);
  }
}

function selecionarPessoa(id) {
  atletaIdAtivo = id;
  const atleta = atletas.find(a => a.id === id);

  if (!atleta) return;

  document.getElementById("nome-atleta-ativo").textContent = atleta.nome;
  document.getElementById("area-treinos").classList.remove("hidden");
  document.getElementById("estado-vazio").classList.add("hidden");

  renderizarPessoas();
  renderizarExercicios();
}

function handleRemoverPessoa() {
  const atleta = atletas.find(a => a.id === atletaIdAtivo);
  if (!atleta) return;

  const confirmacao = confirm(`Deseja realmente remover o perfil de "${atleta.nome}" e todos os seus treinos?`);
  if (confirmacao) {
    atletas = atletas.filter(a => a.id !== atletaIdAtivo);
    atletaIdAtivo = null;
    salvarDadosStorage();
    renderizarPessoas();
  }
}

/* ==========================================================================
   Gestão de Exercícios
   ========================================================================== */
function handleAdicionarExercicio(event) {
  event.preventDefault();
  if (!atletaIdAtivo) return;

  const categoria = document.getElementById("ex-categoria").value;
  const nome = document.getElementById("ex-nome").value.trim();
  const series = document.getElementById("ex-series").value;
  const reps = document.getElementById("ex-reps").value.trim();
  const carga = document.getElementById("ex-carga").value;
  const obs = document.getElementById("ex-obs").value.trim();

  const novoExercicio = {
    id: Date.now(),
    categoria: categoria,
    nome: nome,
    series: series,
    reps: reps,
    carga: carga ? `${carga} kg` : "Sem carga",
    obs: obs,
    concluido: false
  };

  const atleta = atletas.find(a => a.id === atletaIdAtivo);
  atleta.exercicios.push(novoExercicio);

  salvarDadosStorage();
  limparFormularioExercicio();
  
  // Atualiza aba para a categoria recém-adicionada
  categoriaAtiva = categoria;
  atualizarAbasTreinoUI();
  renderizarExercicios();
}

function renderizarExercicios() {
  const lista = document.getElementById("lista-exercicios");
  lista.innerHTML = "";

  const atleta = atletas.find(a => a.id === atletaIdAtivo);
  if (!atleta) return;

  const exerciciosFiltrados = atleta.exercicios.filter(ex => ex.categoria === categoriaAtiva);

  if (exerciciosFiltrados.length === 0) {
    lista.innerHTML = `
      <li class="estado-vazio-card" style="padding: 24px 16px;">
        <p>Nenhum exercício cadastrado no <strong>${categoriaAtiva}</strong> para este atleta.</p>
      </li>
    `;
    return;
  }

  exerciciosFiltrados.forEach(item => {
    const li = document.createElement("li");
    li.className = `item-exercicio ${item.concluido ? 'concluido' : ''}`;
    li.innerHTML = `
      <div class="ex-info">
        <span class="ex-title">${escapeHTML(item.nome)}</span>
        <div class="ex-tags">
          <span class="tag">${item.series} Séries</span>
          <span class="tag">${escapeHTML(item.reps)} Reps</span>
          <span class="tag">${escapeHTML(item.carga)}</span>
        </div>
        ${item.obs ? `<span class="ex-obs">${escapeHTML(item.obs)}</span>` : ''}
      </div>
      <div class="ex-actions">
        <input 
          type="checkbox" 
          class="check-concluido" 
          ${item.concluido ? 'checked' : ''} 
          onclick="handleToggleConcluido(${item.id})"
          title="Marcar como feito"
        >
        <button 
          type="button" 
          class="btn-del-ex" 
          onclick="handleRemoverExercicio(${item.id})"
          title="Excluir exercício"
        >✕</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function handleToggleConcluido(id) {
  const atleta = atletas.find(a => a.id === atletaIdAtivo);
  if (!atleta) return;

  const ex = atleta.exercicios.find(e => e.id === id);
  if (ex) {
    ex.concluido = !ex.concluido;
    salvarDadosStorage();
    renderizarExercicios();
  }
}

function handleRemoverExercicio(id) {
  const atleta = atletas.find(a => a.id === atletaIdAtivo);
  if (!atleta) return;

  atleta.exercicios = atleta.exercicios.filter(e => e.id !== id);
  salvarDadosStorage();
  renderizarExercicios();
}

function selecionarCategoria(categoria, elementoBtn) {
  categoriaAtiva = categoria;
  atualizarAbasTreinoUI();
  renderizarExercicios();
}

function atualizarAbasTreinoUI() {
  document.querySelectorAll(".tab-treino").forEach(btn => {
    if (btn.textContent.trim().startsWith(categoriaAtiva)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function limparFormularioExercicio() {
  document.getElementById("ex-nome").value = "";
  document.getElementById("ex-series").value = "";
  document.getElementById("ex-reps").value = "";
  document.getElementById("ex-carga").value = "";
  document.getElementById("ex-obs").value = "";
}

// Utilitário para evitar XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
