<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Gestão de Treinos Pro</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-container">
    <header class="app-header">
      <h1>ProWorkout Manager</h1>
      <p>Gestão de Pessoas e Fichas de Treino</p>
    </header>

    <!-- Navegação Principal entre Alunos/Pessoas -->
    <section class="section-pessoas">
      <div class="header-section">
        <h2>Pessoas Cadastradas</h2>
      </div>
      
      <!-- Formulário para Adicionar Nova Pessoa -->
      <div class="form-inline">
        <input type="text" id="nova-pessoa-nome" placeholder="Nome da pessoa (ex: Erick)">
        <button onclick="adicionarPessoa()">+ Adicionar Pessoa</button>
      </div>

      <!-- Abas das Pessoas -->
      <div id="abas-pessoas" class="abas-scroll"></div>
    </section>

    <!-- Área de Conteúdo da Pessoa Selecionada -->
    <main id="conteudo-treinos" class="conteudo-treinos hidden">
      <div class="pessoa-ativa-header">
        <h2 id="titulo-pessoa-ativa">Treinos de: <span>-</span></h2>
        <button class="btn-perigo-sm" onclick="removerPessoaAtiva()">Excluir Pessoa</button>
      </div>

      <!-- Formulário de Adicionar Exercício -->
      <div class="card-form">
        <h3>Adicionar Novo Exercício</h3>
        
        <div class="form-grid">
          <div class="field">
            <label for="treino-categoria">Divisão / Categoria</label>
            <select id="treino-categoria">
              <option value="Treino A">Treino A (Peito / Tríceps)</option>
              <option value="Treino B">Treino B (Costas / Bíceps)</option>
              <option value="Treino C">Treino C (Pernas / Ombros)</option>
              <option value="Treino D">Treino D (Cardio / Abdômen)</option>
            </select>
          </div>

          <div class="field">
            <label for="exercicio-nome">Nome do Exercício</label>
            <input type="text" id="exercicio-nome" placeholder="ex: Supino Reto com Barra">
          </div>

          <div class="field-group">
            <div class="field">
              <label for="exercicio-series">Séries</label>
              <input type="number" id="exercicio-series" placeholder="4" min="1">
            </div>

            <div class="field">
              <label for="exercicio-reps">Reps</label>
              <input type="text" id="exercicio-reps" placeholder="10-12">
            </div>

            <div class="field">
              <label for="exercicio-carga">Carga (kg)</label>
              <input type="number" id="exercicio-carga" placeholder="80" step="0.5">
            </div>
          </div>

          <div class="field">
            <label for="exercicio-obs">Observações / Descanso</label>
            <input type="text" id="exercicio-obs" placeholder="ex: Descanso 90s, focar na cadência">
          </div>
        </div>

        <button class="btn-sucesso" onclick="adicionarExercicio()">Adicionar ao Treino</button>
      </div>

      <!-- Abas de Categorias de Treino (A, B, C, D) -->
      <div class="abas-treino" id="abas-treino">
        <button class="tab-btn active" onclick="filtrarCategoria('Treino A', this)">Treino A</button>
        <button class="tab-btn" onclick="filtrarCategoria('Treino B', this)">Treino B</button>
        <button class="tab-btn" onclick="filtrarCategoria('Treino C', this)">Treino C</button>
        <button class="tab-btn" onclick="filtrarCategoria('Treino D', this)">Treino D</button>
      </div>

      <!-- Lista de Exercícios -->
      <ul id="lista-exercicios" class="lista-exercicios"></ul>
    </main>

    <!-- Estado Vazio caso nenhuma pessoa esteja cadastrada -->
    <div id="estado-vazio" class="estado-vazio">
      <p>Nenhuma pessoa selecionada. Cadastre ou selecione uma pessoa acima para gerenciar os treinos.</p>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
