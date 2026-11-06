<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ficha de Treino</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-container">
    <header>
      <h1>Meu App de Treino</h1>
      <p>Gerencie seus exercícios diários</p>
    </header>

    <div class="form-container">
      <select id="treino-categoria">
        <option value="Treino A">Treino A (Peito / Tríceps)</option>
        <option value="Treino B">Treino B (Costas / Bíceps)</option>
        <option value="Treino C">Treino C (Pernas / Ombros)</option>
      </select>
      <input type="text" id="exercicio-nome" placeholder="Nome do exercício">
      <input type="text" id="exercicio-series" placeholder="Séries x Reps (ex: 4x10)">
      <button onclick="adicionarExercicio()">Adicionar Exercício</button>
    </div>

    <div class="abas">
      <button class="aba-btn active" onclick="filtrarTreino('Treino A', this)">Treino A</button>
      <button class="aba-btn" onclick="filtrarTreino('Treino B', this)">Treino B</button>
      <button class="aba-btn" onclick="filtrarTreino('Treino C', this)">Treino C</button>
    </div>

    <ul id="lista-exercicios" class="lista"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>
