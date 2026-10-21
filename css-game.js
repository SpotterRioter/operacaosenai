(() => {
  const query = new URLSearchParams(window.location.search);
  const gameRoot = document.getElementById("css-game");

  if (query.get("preview") === "1") {
    document.body.classList.add("css-preview-mode");
    return;
  }

  document.body.classList.add("css-editor-mode");

  const missions = [
    {
      title: "Inicialização do kernel",
      topic: "Variáveis CSS e reset global",
      xp: 150,
      description: "Configure as cores do sistema, remova os espaçamentos padrão e defina a tipografia da página."
    },
    {
      title: "Barra de comando",
      topic: "Flexbox",
      xp: 200,
      description: "Organize o cabeçalho e os botões com Flexbox. Dê destaque ao botão de parada de emergência."
    },
    {
      title: "Crachá e sensores",
      topic: "Box model e seletores de atributo",
      xp: 250,
      description: "Posicione o selo do operador e diferencie visualmente os estados ativo, alerta e crítico."
    },
    {
      title: "Matriz central",
      topic: "CSS Grid",
      xp: 300,
      description: "Monte o painel em duas dimensões, posicionando sidebar, sensores, telemetria, controle e rodapé."
    },
    {
      title: "Bancada de sensores",
      topic: "Flexbox responsivo",
      xp: 250,
      description: "Faça os cards de sensores quebrarem de linha e organizarem seus dados em coluna."
    },
    {
      title: "Relatório de telemetria",
      topic: "Tabelas e pseudo-seletores",
      xp: 200,
      description: "Formate a tabela, crie linhas alternadas e destaque cada linha ao passar o mouse."
    },
    {
      title: "Terminal de calibração",
      topic: "Formulários e foco",
      xp: 200,
      description: "Organize os campos e aplique estados de foco acessíveis aos controles do formulário."
    },
    {
      title: "Boss fight: sobrecarga mobile",
      topic: "Animação e media queries",
      xp: 450,
      description: "Anime o alerta crítico e reorganize o dashboard para telas com até 900 pixels."
    }
  ];

  const xpTotal = missions.reduce((total, mission) => total + mission.xp, 0);
  const completed = new Set();
  let selectedMission = 0;
  let initialCss = "";

  gameRoot.innerHTML = `
    <main class="game-shell">
      <header class="game-header">
        <div>
          <span class="game-eyebrow">SENAI Areias // Laboratório CSS</span>
          <h1>Operação MangueTech 2077</h1>
          <p>Complete as fases, escreva CSS e acompanhe o resultado na prévia.</p>
        </div>
        <div class="score-card" aria-live="polite">
          <strong id="game-score">0 XP</strong>
          <span id="game-progress-label">0 de 8 fases</span>
        </div>
      </header>

      <div class="game-progress" role="progressbar" aria-label="Progresso das fases"
        aria-valuemin="0" aria-valuemax="8" aria-valuenow="0">
        <span id="game-progress-bar"></span>
      </div>

      <div class="game-layout">
        <section class="game-panel mission-panel" aria-labelledby="missions-heading">
          <div class="panel-header">
            <span class="panel-kicker">Central de missões</span>
            <h2 id="missions-heading">Fases da operação</h2>
          </div>
          <nav class="mission-list" id="mission-list" aria-label="Fases do jogo"></nav>
          <div class="mission-content" aria-live="polite">
            <span class="panel-kicker" id="mission-topic"></span>
            <h3 id="mission-title"></h3>
            <p class="mission-copy" id="mission-description"></p>
            <button class="game-button game-button-primary" id="validate-mission" type="button">
              Validar fase
            </button>
          </div>
        </section>

        <section class="game-panel editor-panel" aria-labelledby="editor-heading">
          <div class="game-toolbar">
            <div class="editor-heading">
              <span aria-hidden="true">⌨</span>
              <strong id="editor-heading">style-aluno.css</strong>
            </div>
            <button class="game-button" id="reset-css" type="button">Restaurar</button>
          </div>
          <label class="sr-only" for="css-input">Editor de CSS</label>
          <textarea class="css-input" id="css-input" spellcheck="false"
            autocapitalize="off" autocomplete="off" autocorrect="off"
            aria-describedby="editor-status" placeholder="Escreva seu CSS aqui..."></textarea>
          <div class="editor-status" id="editor-status" role="status" aria-live="polite">
            Carregando os arquivos da missão...
          </div>
        </section>

        <section class="game-panel preview-panel" aria-labelledby="preview-title">
          <div class="preview-heading">
            <strong id="preview-title">Prévia ao vivo</strong>
            <span>suas alterações aparecem aqui</span>
          </div>
          <iframe class="preview-frame" id="preview-frame" title="Prévia do dashboard estilizado"
            src="?preview=1"></iframe>
        </section>
      </div>

      <p class="editor-footnote">
        O CSS é aplicado somente nesta sessão. Para publicar alterações no Vercel, atualize o arquivo do projeto e faça um novo deploy.
      </p>
    </main>
  `;

  const missionList = document.getElementById("mission-list");
  const cssInput = document.getElementById("css-input");
  const previewFrame = document.getElementById("preview-frame");
  const status = document.getElementById("editor-status");
  const validateButton = document.getElementById("validate-mission");
  const resetButton = document.getElementById("reset-css");

  missions.forEach((mission, index) => {
    const button = document.createElement("button");
    button.className = "mission-button";
    button.type = "button";
    button.dataset.mission = String(index);
    button.innerHTML = `
      <span class="mission-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="mission-label"></span>
      <span class="mission-xp">${mission.xp} XP</span>
    `;
    button.querySelector(".mission-label").textContent = mission.title;
    button.addEventListener("click", () => selectMission(index));
    missionList.append(button);
  });

  function setStatus(message, kind = "info") {
    status.textContent = message;
    status.dataset.kind = kind;
  }

  function selectMission(index) {
    selectedMission = index;
    const mission = missions[index];
    document.getElementById("mission-topic").textContent = `Fase ${index + 1} // ${mission.topic}`;
    document.getElementById("mission-title").textContent = mission.title;
    document.getElementById("mission-description").textContent = mission.description;

    missionList.querySelectorAll(".mission-button").forEach((button, buttonIndex) => {
      if (buttonIndex === index) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    validateButton.textContent = completed.has(index) ? "Fase concluída" : "Validar fase";
    validateButton.disabled = completed.has(index);
  }

  function updateScore() {
    const score = missions.reduce(
      (total, mission, index) => total + (completed.has(index) ? mission.xp : 0),
      0
    );
    const progress = completed.size;
    document.getElementById("game-score").textContent = `${score} XP`;
    document.getElementById("game-progress-label").textContent = `${progress} de ${missions.length} fases`;
    document.getElementById("game-progress-bar").style.width = `${(progress / missions.length) * 100}%`;
    const progressBar = document.querySelector(".game-progress");
    progressBar.setAttribute("aria-valuenow", String(progress));

    completed.forEach((index) => {
      missionList.querySelector(`[data-mission="${index}"]`).dataset.completed = "true";
    });
  }

  function getPreviewDocument() {
    return previewFrame.contentDocument;
  }

  function computed(selector, pseudoElement) {
    const element = getPreviewDocument().querySelector(selector);
    const view = getPreviewDocument().defaultView;
    return element ? view.getComputedStyle(element, pseudoElement) : null;
  }

  function baseDeclaration(selector, property) {
    const style = getPreviewDocument().getElementById("player-css");
    if (!style.sheet) return "";

    const rule = Array.from(style.sheet.cssRules).find((item) =>
      item.type === 1 &&
      item.selectorText.split(",").some((itemSelector) => itemSelector.trim() === selector)
    );
    return rule ? rule.style.getPropertyValue(property).trim() : "";
  }

  function hasMediaRule() {
    const style = getPreviewDocument().getElementById("player-css");
    if (!style.sheet) return false;

    return Array.from(style.sheet.cssRules).some((rule) => {
      if (rule.type !== 4 || !rule.conditionText.includes("max-width: 900px")) {
        return false;
      }

      return Array.from(rule.cssRules).some((nestedRule) =>
        nestedRule.type === 1 &&
        nestedRule.selectorText.split(",").some((selector) => selector.trim() === ".dashboard-grid") &&
        nestedRule.style.getPropertyValue("grid-template-columns").trim() === "1fr"
      );
    });
  }

  function validateCurrentMission() {
    const doc = getPreviewDocument();
    if (!doc || !doc.body) {
      setStatus("A prévia ainda está carregando. Tente novamente em instantes.", "error");
      return false;
    }

    const style = doc.getElementById("player-css");
    if (!style || !style.sheet) {
      setStatus("Não foi possível ler o CSS da prévia. Recarregue a página e tente novamente.", "error");
      return false;
    }

    const view = doc.defaultView;
    const rootStyle = view.getComputedStyle(doc.documentElement);
    const bodyStyle = view.getComputedStyle(doc.body);
    const value = (selector, property, pseudo) => {
      const result = computed(selector, pseudo);
      return result ? result.getPropertyValue(property).trim() : "";
    };

    switch (selectedMission) {
      case 0: {
        const variables = [
          "--bg-principal", "--bg-painel", "--bg-card", "--cor-senai", "--cor-ciano",
          "--cor-texto", "--cor-texto-suave", "--status-ativo", "--status-alerta",
          "--status-critico", "--borda-padrao", "--raio-borda"
        ];
        return variables.every((name) => rootStyle.getPropertyValue(name).trim()) &&
          bodyStyle.margin === "0px" &&
          bodyStyle.padding === "0px" &&
          bodyStyle.boxSizing === "border-box" &&
          bodyStyle.backgroundColor !== "rgba(0, 0, 0, 0)" &&
          bodyStyle.color !== "rgb(0, 0, 0)";
      }
      case 1:
        return baseDeclaration(".topo-terminal", "display") === "flex" &&
          baseDeclaration(".topo-terminal", "justify-content") === "space-between" &&
          baseDeclaration(".topo-terminal", "align-items") === "center" &&
          value(".btn", "cursor") === "pointer";
      case 2:
        return value(".cracha-industrial", "position") === "relative" &&
          value(".selo-nivel", "position") === "absolute" &&
          value('.status-badge[data-status="ativo"]', "background-color") !== "rgba(0, 0, 0, 0)";
      case 3:
        return value(".dashboard-grid", "display") === "grid" &&
          baseDeclaration(".dashboard-grid", "grid-template-columns") === "280px 1fr 1fr" &&
          baseDeclaration(".dashboard-grid", "grid-template-areas").includes("sidebar") &&
          value(".area-sensores", "grid-area") === "sensores";
      case 4:
        return value(".grade-sensores", "display") === "flex" &&
          value(".grade-sensores", "flex-wrap") === "wrap" &&
          value(".sensor-card", "display") === "flex" &&
          value(".sensor-card", "flex-direction") === "column";
      case 5: {
        const rows = doc.querySelectorAll(".tabela-industrial tbody tr");
        return value(".tabela-industrial", "border-collapse") === "collapse" &&
          rows.length > 1 &&
          view.getComputedStyle(rows[1]).backgroundColor !== view.getComputedStyle(rows[0]).backgroundColor;
      }
      case 6: {
        const input = doc.querySelector('.form-calibracao input[type="text"]');
        const range = doc.querySelector('.form-calibracao input[type="range"]');
        const checkbox = doc.querySelector('.form-calibracao input[type="checkbox"]');
        if (!input || !range || !checkbox || value(".form-calibracao", "display") !== "flex" ||
            value(".form-calibracao", "flex-direction") !== "column") {
          return false;
        }
        input.focus();
        const focusStyle = view.getComputedStyle(input);
        const focusConfigured = focusStyle.outlineStyle === "none" &&
          focusStyle.boxShadow !== "none" &&
          view.getComputedStyle(range).accentColor !== "auto" &&
          view.getComputedStyle(checkbox).accentColor !== "auto";
        input.blur();
        return focusConfigured;
      }
      case 7:
        return value(".alerta-critico", "animation-name") === "pulsar-alerta" &&
          hasMediaRule();
      default:
        return false;
    }
  }

  function applyCss() {
    const doc = getPreviewDocument();
    if (!doc || !doc.head) return;

    let style = doc.getElementById("player-css");
    if (!style) {
      style = doc.createElement("style");
      style.id = "player-css";
      doc.head.append(style);
    }
    style.textContent = cssInput.value;
  }

  cssInput.addEventListener("input", () => {
    applyCss();
    if (status.dataset.kind === "error" || status.dataset.kind === "success") {
      setStatus("Prévia atualizada. Continue a missão e valide quando estiver pronto.");
    }
  });

  previewFrame.addEventListener("load", applyCss);

  validateButton.addEventListener("click", () => {
    if (completed.has(selectedMission)) return;
    if (selectedMission > 0 && !completed.has(selectedMission - 1)) {
      setStatus("Conclua a fase anterior para liberar esta missão.", "error");
      return;
    }

    try {
      if (!validateCurrentMission()) {
        setStatus("Ainda falta cumprir algum objetivo desta fase. Revise a missão e confira a prévia.", "error");
        return;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Falha ao validar o CSS: ${message}`, "error");
      return;
    }

    completed.add(selectedMission);
    missionList.querySelector(`[data-mission="${selectedMission}"]`).dataset.completed = "true";
    updateScore();
    setStatus(`Fase concluída! Você ganhou ${missions[selectedMission].xp} XP.`, "success");

    if (selectedMission < missions.length - 1) {
      selectMission(selectedMission + 1);
    } else {
      setStatus(`Operação concluída! Você conquistou ${xpTotal} XP.`, "success");
    }
  });

  resetButton.addEventListener("click", () => {
    cssInput.value = initialCss;
    completed.clear();
    missionList.querySelectorAll(".mission-button").forEach((button) => {
      button.dataset.completed = "false";
    });
    updateScore();
    selectMission(0);
    applyCss();
    setStatus("CSS restaurado ao arquivo inicial. O progresso desta sessão foi reiniciado.");
  });

  async function loadInitialCss() {
    try {
      const response = await fetch(new URL("style-aluno.css", window.location.href));
      if (!response.ok) {
        throw new Error(`Resposta HTTP ${response.status}`);
      }
      initialCss = await response.text();
      cssInput.value = initialCss;
      applyCss();
      setStatus("CSS carregado. Edite o código e acompanhe a prévia ao vivo.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Não foi possível carregar style-aluno.css: ${message}`, "error");
    }
  }

  selectMission(0);
  updateScore();
  loadInitialCss();
})();
