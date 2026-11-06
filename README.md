# meu-app-treino
meu-app-treino
document.addEventListener("DOMContentLoaded", carregarTreinos);

function adicionarExercicio() {
  const exercicioInput = document.getElementById("exercicio-input");
  const seriesInput = document.getElementById("series-input");

  if (!exercicioInput.value || !seriesInput.value) return;

  const item = {
    id: Date.now(),
    exercicio: exercicioInput.value,
    series: seriesInput.value
  };

  salvarNoLocalStorage(item);
  renderizarItem(item);

  exercicioInput.value = "";
  seriesInput.value = "";
}

function renderizarItem(item) {
  const lista = document.getElementById("lista-treinos");
  const li = document.createElement("li");
  li.setAttribute("data-id", item.id);
  li.innerHTML = `
    <div>
      <strong>${item.exercicio}</strong><br>
      <small>${item.series}</small>
    </div>
    <button class="btn-deletar" onclick="removerExercicio(${item.id})">X</button>
  `;
  lista.appendChild(li);
}

function salvarNoLocalStorage(item) {
  const treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
  treinos.push(item);
  localStorage.setItem("treinos", JSON.stringify(treinos));
}

function carregarTreinos() {
  const treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
  treinos.forEach(renderizarItem);
}

function removerExercicio(id) {
  let treinos = JSON.parse(localStorage.getItem("treinos") || "[]");
  treinos = treinos.filter(t => t.id !== id);
  localStorage.setItem("treinos", JSON.stringify(treinos));
  document.querySelector(`[data-id="${id}"]`).remove();
}
