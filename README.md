<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProWorkout Manager - Gestão de Treinos</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-container">
    
    <!-- Cabeçalho Principal -->
    <header class="app-header">
      <div class="logo-area">
        <span class="logo-icon">⚡</span>
        <div>
          <h1>ProWorkout</h1>
          <p>Gestão de Treinos & Performance</p>
        </div>
      </div>
    </header>

    <!-- Seção de Gestão de Pessoas / Alunos -->
    <section class="card-section pessoas-section">
      <div class="section-title">
        <h2>Atletas / Alunos</h2>
      </div>

      <form id="form-pessoa" class="form-inline" onsubmit="handleAdicionarPessoa(event)">
        <input 
          type="text" 
          id="pessoa-nome" 
          placeholder="Nome do atleta (ex: Erick)" 
          autocomplete="off"
          required
        >
        <button type="submit" class="btn btn-primary">+ Cadastrar</button>
      </form>

      <!-- Abas Roláveis de Pessoas -->
      <div id="abas-pessoas" class="abas-scroll" role="tablist"></div>
    </section>

    <!-- Área Principal do Perfil Selecionado -->
    <main id="area-treinos" class="area-treinos hidden">
      
      <!-- Cabeçalho do Perfil Ativo -->
      <div class="perfil-header-card">
        <div>
          <span class="badge">Atleta Ativo</span>
          <h2 id="nome-atleta-ativo">---</h2>
        </div>
        <button type="button" class="btn btn-danger-outline" onclick="handleRemoverPessoa()">
          Excluir Atleta
        </button>
      </div>

      <!-- Formulário para Cadastrar Exercício -->
      <section class="card-section">
        <div class="section-title">
          <h3>Adicionar Exercício</h3>
        </div>

        <form id="form-exercicio" class="form-grid" onsubmit="handleAdicionarExercicio(event)">
          
          <div class="field-group full-width">
            <label for="ex-categoria">Divisão do Treino</label>
            <select id="ex-categoria" required>
              <option value="Treino A">Treino A - Peito & Tríceps</option>
              <option value="Treino B">Treino B - Costas & Bíceps</option>
              <option value="Treino C">Treino C - Pernas & Ombros</option>
              <option value="Treino D">Treino D - Cardio & Core</option>
            </select>
          </div>

          <div class="field-group full-width">
            <label for="ex-nome">Nome do Exercício</label>
            <input type="text" id="ex-nome" placeholder="ex: Supino Reto com Barra" required>
          </div>

          <div class="field-row">
            <div class="field-group">
              <label for="ex-series">Séries</label>
              <input type="number" id="ex-series" placeholder="4" min="1" max="99" required>
            </div>

            <div class="field-group">
              <label for="ex-reps">Repetições</label>
              <input type="text" id="ex-reps" placeholder="10-12" required>
            </div>

            <div class="field-group">
              <label for="ex-carga">Carga (kg)</label>
              <input type="number" id="ex-carga" placeholder="80" step="0.5" min="0">
            </div>
          </div>

          <div class="field-group full-width">
            <label for="ex-obs">Observações / Descanso</label>
            <input type="text" id="ex-obs" placeholder="ex: Descanso 90s, focar na cadência">
          </div>

          <button type="submit" class="btn btn-success full-width">+ Adicionar ao Treino</button>
        </form>
      </section>

      <!-- Abas de Treino (A, B, C, D) -->
      <nav class="abas-treino" role="tablist">
        <button type="button" class="tab-treino active" onclick="selecionarCategoria('Treino A', this)">Treino A</button>
        <button type="button" class="tab-treino" onclick="selecionarCategoria('Treino B', this)">Treino B</button>
        <button type="button" class="tab-treino" onclick="selecionarCategoria('Treino C', this)">Treino C</button>
        <button type="button" class="tab-treino" onclick="selecionarCategoria('Treino D', this)">Treino D</button>
      </nav>

      <!-- Lista Dinâmica de Exercícios -->
      <ul id="lista-exercicios" class="lista-exercicios"></ul>
    </main>

    <!-- Estado Vazio / Sem Atleta Selecionado -->
    <div id="estado-vazio" class="estado-vazio-card">
      <div class="vazio-icon">📋</div>
      <h3>Nenhum atleta selecionado</h3>
      <p>Cadastre um novo atleta ou escolha um perfil na barra superior para visualizar e gerenciar as fichas de treino.</p>
    </div>

  </div>

  <script src="script.js"></script>
</body>
</html>
