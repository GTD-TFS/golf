const STORAGE_KEY = "golf-canarias-state-v2";
const RFEG_HANDICAP_URL = "https://rfeg.es/jugar/handicap";

const defaultPlayers = [
  {
    id: "jose-luis",
    name: "Jose Luis Bejar Gutierrez",
    license: "CP41742315",
    handicapIndex: 18.4,
    selected: true,
    validatedAt: null,
  },
  {
    id: "javier",
    name: "Javier Bejar Navarrete",
    license: "CM00472449",
    handicapIndex: 28.6,
    selected: true,
    validatedAt: null,
  },
];

const courseCatalog = [
  { name: "Abama Golf", island: "Tenerife" },
  { name: "Amarilla Golf", island: "Tenerife" },
  { name: "Buenavista Golf", island: "Tenerife" },
  { name: "Costa Adeje Los Lagos (9 hoyos)", island: "Tenerife" },
  { name: "Golf Costa Adeje", island: "Tenerife" },
  { name: "Golf del Sur", island: "Tenerife" },
  { name: "Golf La Rosaleda", island: "Tenerife" },
  { name: "Golf Las Americas", island: "Tenerife" },
  { name: "Golf Los Palos", island: "Tenerife" },
  { name: "Real Club de Golf de Tenerife", island: "Tenerife" },
  { name: "Anfi Tauro Golf", island: "Gran Canaria" },
  { name: "El Cortijo Club de Campo", island: "Gran Canaria" },
  { name: "Las Palmeras Golf", island: "Gran Canaria" },
  { name: "Maspalomas Golf", island: "Gran Canaria" },
  { name: "Meloneras Golf", island: "Gran Canaria" },
  { name: "Real Club de Golf de Las Palmas", island: "Gran Canaria" },
  { name: "Salobre Golf", island: "Gran Canaria" },
  { name: "Costa Teguise Golf", island: "Lanzarote" },
  { name: "Lanzarote Golf", island: "Lanzarote" },
  { name: "Fuerteventura Golf Club", island: "Fuerteventura" },
  { name: "Golf Salinas de Antigua", island: "Fuerteventura" },
  { name: "Jandia Golf", island: "Fuerteventura" },
  { name: "Playitas Golf", island: "Fuerteventura" },
  { name: "Tecina Golf", island: "La Gomera" },
];

const verifiedCourseConfigs = {
  "abama-golf": {
    sourceLabel: "Tarjeta oficial verificada",
    sourceUrl: "https://www.abamagolf.com/es/campo-de-golf-tenerife",
    tee: "Amarillas",
    slope: 136,
    courseRating: 69.8,
    holes: [
      [1, 4, 9, 293],
      [2, 4, 7, 265],
      [3, 5, 11, 502],
      [4, 3, 5, 182],
      [5, 4, 13, 300],
      [6, 5, 15, 423],
      [7, 3, 17, 130],
      [8, 4, 1, 387],
      [9, 4, 3, 390],
      [10, 5, 12, 463],
      [11, 4, 10, 324],
      [12, 3, 14, 152],
      [13, 4, 16, 276],
      [14, 3, 18, 147],
      [15, 4, 4, 349],
      [16, 4, 6, 349],
      [17, 5, 8, 452],
      [18, 4, 2, 385],
    ],
  },
  "amarilla-golf": {
    sourceLabel: "Scorecard público estructurado verificado",
    sourceUrl: "https://www.softline.golf/campo/1011",
    tee: "Amarillas",
    slope: 122,
    courseRating: 69.3,
    holes: [
      [1, 4, 5, 362],
      [2, 3, 17, 121],
      [3, 5, 13, 468],
      [4, 4, 11, 324],
      [5, 3, 15, 99],
      [6, 4, 1, 343],
      [7, 5, 3, 453],
      [8, 4, 7, 339],
      [9, 4, 9, 355],
      [10, 4, 6, 340],
      [11, 4, 4, 376],
      [12, 3, 18, 120],
      [13, 4, 8, 326],
      [14, 3, 10, 135],
      [15, 5, 12, 445],
      [16, 5, 2, 455],
      [17, 4, 16, 300],
      [18, 3, 14, 157],
    ],
  },
  "golf-costa-adeje": {
    sourceLabel: "Tarjeta y slope oficiales verificados",
    sourceUrl: "https://www.golfcostaadeje.com/fr/championship-parcour/",
    tee: "59",
    slope: 134,
    courseRating: 71.9,
    holes: [
      [1, 5, 5, 477],
      [2, 3, 17, 113],
      [3, 5, 13, 512],
      [4, 4, 7, 406],
      [5, 3, 15, 124],
      [6, 4, 9, 324],
      [7, 3, 3, 147],
      [8, 5, 11, 482],
      [9, 4, 1, 372],
      [10, 3, 4, 198],
      [11, 5, 12, 461],
      [12, 4, 8, 317],
      [13, 5, 14, 467],
      [14, 3, 10, 141],
      [15, 4, 6, 364],
      [16, 3, 18, 154],
      [17, 4, 2, 401],
      [18, 5, 16, 470],
    ],
  },
  "buenavista-golf": {
    sourceLabel: "Scorecard público estructurado verificado",
    sourceUrl: "https://www.golfify.io/courses/buenavista-golf-s-a",
    tee: "Amarillos",
    slope: 127,
    courseRating: 70.6,
    holes: [
      [1, 5, 7, 472],
      [2, 3, 17, 122],
      [3, 4, 15, 317],
      [4, 3, 9, 178],
      [5, 5, 13, 440],
      [6, 4, 3, 393],
      [7, 4, 1, 367],
      [8, 3, 5, 193],
      [9, 5, 11, 441],
      [10, 5, 18, 468],
      [11, 4, 2, 363],
      [12, 3, 16, 134],
      [13, 5, 12, 444],
      [14, 4, 10, 325],
      [15, 3, 8, 185],
      [16, 4, 6, 304],
      [17, 3, 4, 165],
      [18, 5, 14, 436],
    ],
  },
  "golf-del-sur": {
    sourceLabel: "Tabla oficial verificada",
    sourceUrl: "https://www.golfdelsur.es/el-campo/",
    tee: "Amarillas",
    slope: 135,
    courseRating: 70.9,
    holes: [
      [1, 4, 3, 329],
      [2, 3, 9, 130],
      [3, 5, 6, 447],
      [4, 5, 2, 457],
      [5, 4, 5, 316],
      [6, 4, 1, 342],
      [7, 4, 4, 342],
      [8, 4, 7, 236],
      [9, 3, 8, 170],
      [10, 4, 3, 327],
      [11, 3, 8, 134],
      [12, 5, 2, 472],
      [13, 4, 5, 244],
      [14, 5, 7, 477],
      [15, 4, 6, 320],
      [16, 4, 1, 326],
      [17, 3, 9, 175],
      [18, 4, 4, 324],
    ],
  },
  "costa-adeje-los-lagos-9-hoyos": {
    sourceLabel: "Tarjeta 9 hoyos contrastada",
    sourceUrl: "https://www.golfpass.com/travel-advisor/courses/23418-costa-adeje-golf-club-lagos-course",
    tee: "Amarillas",
    slope: 108,
    courseRating: 31.6,
    ratingPar: 33,
    holes: [
      [1, 4, 2, 282],
      [2, 5, 1, 499],
      [3, 4, 5, 296],
      [4, 3, 8, 89],
      [5, 4, 9, 354],
      [6, 3, 3, 175],
      [7, 3, 6, 129],
      [8, 4, 7, 319],
      [9, 3, 4, 184],
    ],
  },
  "golf-la-rosaleda": {
    sourceLabel: "Scorecard público estructurado verificado",
    sourceUrl: "https://www.softline.golf/campo/1035",
    tee: "Verdes Caballeros",
    slope: 56,
    courseRating: 24.5,
    ratingPar: 27,
    holes: [
      [1, 3, 5, 69],
      [2, 3, 7, 56],
      [3, 3, 13, 60],
      [4, 3, 3, 50],
      [5, 3, 17, 34],
      [6, 3, 15, 34],
      [7, 3, 1, 47],
      [8, 3, 9, 60],
      [9, 3, 11, 48],
    ],
  },
  "golf-las-americas": {
    sourceLabel: "Tarjeta oficial verificada; CR público complementario",
    sourceUrl: "https://www.golflasamericas.com/fr/terrain-de-golf/",
    tee: "Amarilla",
    slope: 124,
    courseRating: 71.6,
    holes: [
      [1, 5, 7, 440],
      [2, 4, 3, 373],
      [3, 4, 5, 381],
      [4, 4, 15, 248],
      [5, 3, 9, 178],
      [6, 4, 1, 414],
      [7, 5, 13, 444],
      [8, 3, 17, 161],
      [9, 4, 11, 353],
      [10, 4, 4, 418],
      [11, 3, 18, 150],
      [12, 4, 6, 307],
      [13, 3, 16, 132],
      [14, 4, 14, 251],
      [15, 4, 2, 400],
      [16, 5, 12, 442],
      [17, 4, 8, 308],
      [18, 5, 10, 460],
    ],
  },
  "golf-los-palos": {
    sourceLabel: "Scorecard público verificado",
    sourceUrl: "https://www.golfpass.com/travel-advisor/courses/23437-los-palos-golf-center",
    tee: "Amarillas",
    slope: 89,
    courseRating: 27.2,
    ratingPar: 27,
    holes: [
      [1, 3, 6, 106],
      [2, 3, 8, 92],
      [3, 3, 3, 127],
      [4, 3, 1, 155],
      [5, 3, 2, 115],
      [6, 3, 5, 100],
      [7, 3, 7, 132],
      [8, 3, 9, 101],
      [9, 3, 4, 113],
    ],
  },
  "real-club-de-golf-de-tenerife": {
    sourceLabel: "Scorecard público estructurado verificado",
    sourceUrl: "https://www.golfify.io/courses/real-club-de-golf-de-tenerife",
    tee: "Amarillas",
    slope: 130,
    courseRating: 69.6,
    holes: [
      [1, 4, 4, 348],
      [2, 3, 6, 194],
      [3, 4, 10, 274],
      [4, 4, 2, 347],
      [5, 5, 14, 434],
      [6, 4, 18, 246],
      [7, 3, 16, 111],
      [8, 4, 12, 307],
      [9, 4, 8, 369],
      [10, 5, 1, 419],
      [11, 3, 13, 157],
      [12, 4, 3, 336],
      [13, 4, 15, 310],
      [14, 3, 5, 165],
      [15, 5, 7, 519],
      [16, 3, 11, 164],
      [17, 4, 9, 324],
      [18, 5, 17, 479],
    ],
  },
};

const players = loadPlayers();

const courses = courseCatalog.map((course) => {
  const id = slugify(course.name);
  const verified = verifiedCourseConfigs[id];

  if (!verified) {
    return {
      id,
      name: course.name,
      island: course.island,
      playable: false,
      sourceLabel: "Listado de campo disponible; falta importar tarjeta oficial hoyo a hoyo",
      sourceUrl: null,
    };
  }

  return createCourse(course.name, course.island, verified);
});

const app = document.querySelector("#app");
const modal = document.querySelector("#score-modal");
const modalPlayerName = document.querySelector("#modal-player-name");
const closeModalButton = document.querySelector("#close-modal");
const scorePad = document.querySelector("#score-pad");
const summaryModal = document.querySelector("#summary-modal");
const summaryModalContent = document.querySelector("#summary-modal-content");
const closeSummaryModalButton = document.querySelector("#close-summary-modal");

const state = {
  view: "setup",
  selectedCourseId: loadStoredState().selectedCourseId ?? courses[0].id,
  currentHole: 0,
  scores: loadStoredState().scores ?? {},
  modalPlayerId: null,
  gps: {
    userPosition: null,
    distanceMeters: null,
    status: "idle",
  },
};

registerServiceWorker();
startGeolocationWatch();
render();

function createCourse(name, island, config) {
  const par = config.holes.reduce((sum, hole) => sum + hole[1], 0);

  return {
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    island,
    playable: true,
    holesCount: config.holes.length,
    tee: config.tee,
    slope: config.slope,
    courseRating: config.courseRating,
    ratingPar: config.ratingPar ?? par,
    handicapFactor: config.handicapFactor ?? 1,
    sourceLabel: config.sourceLabel,
    sourceUrl: config.sourceUrl,
    par,
    holes: config.holes.map(([number, parValue, strokeIndex, meters]) => ({
      number,
      par: parValue,
      strokeIndex,
      meters,
      greenFront: Math.max(30, meters - 18),
      greenCenter: Math.max(20, meters - 6),
      greenBack: meters + 10,
    })),
  };
}

function render() {
  document.body.dataset.view = state.view;
  app.innerHTML = "";
  if (state.view === "setup") {
    renderSetup();
    return;
  }
  renderGame();
}

function renderSetup() {
  const template = document.querySelector("#setup-template");
  const fragment = template.content.cloneNode(true);
  app.appendChild(fragment);

  const playersList = document.querySelector("#players-list");
  const courseSelect = document.querySelector("#course-select");
  const courseHint = document.querySelector("#course-hint");
  const startButton = document.querySelector("#start-match");

  players.forEach((player) => {
    const row = document.createElement("label");
    row.className = "player-row";
    row.innerHTML = `
      <input type="checkbox" data-player-id="${player.id}" ${player.selected ? "checked" : ""} />
      <div class="player-main">
        <p class="player-name">${player.name.toUpperCase()}</p>
        <p class="player-meta">Licencia ${player.license}</p>
        <input
          type="number"
          min="0"
          max="54"
          step="0.1"
          value="${player.handicapIndex}"
          data-handicap-player="${player.id}"
          aria-label="Handicap de ${player.name}"
        />
      </div>
      <div class="player-actions">
        <button
          class="compact-button"
          type="button"
          data-validate-player="${player.id}"
          data-state="${player.validatedAt ? "done" : "idle"}"
        >
          ${player.validatedAt ? "Validado" : "Validar HCP"}
        </button>
        <span class="validation-note">${player.validatedAt ? `Manual · ${player.validatedAt}` : "RFEG + ajuste manual"}</span>
      </div>
    `;
    playersList.appendChild(row);
  });

  const selectedCourse = getSelectedCourse();
  courseSelect.innerHTML = courses
    .map(
      (course) => `
        <option value="${course.id}" ${course.id === selectedCourse.id ? "selected" : ""}>
          ${course.name} (${course.island})
        </option>
      `,
    )
    .join("");
  courseHint.innerHTML = getCourseHint(selectedCourse);

  playersList.addEventListener("change", (event) => {
    const checkbox = event.target.closest('input[type="checkbox"]');
    const handicapInput = event.target.closest("[data-handicap-player]");

    if (checkbox) {
      const player = players.find((entry) => entry.id === checkbox.dataset.playerId);
      if (player) {
        player.selected = checkbox.checked;
        persistState();
      }
    }

    if (handicapInput) {
      const player = players.find((entry) => entry.id === handicapInput.dataset.handicapPlayer);
      if (!player) {
        return;
      }
      const numericValue = Number(handicapInput.value);
      if (!Number.isFinite(numericValue)) {
        return;
      }
      player.handicapIndex = clamp(numericValue, 0, 54);
      persistState();
    }
  });

  playersList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-validate-player]");
    if (!button) {
      return;
    }
    const player = players.find((entry) => entry.id === button.dataset.validatePlayer);
    if (!player) {
      return;
    }
    window.open(RFEG_HANDICAP_URL, "_blank", "noopener,noreferrer");
    player.validatedAt = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date());
    persistState();
    render();
  });

  courseSelect.addEventListener("change", () => {
    const match = courses.find((course) => course.id === courseSelect.value);
    state.selectedCourseId = match?.id ?? courses[0].id;
    persistState();
    courseHint.innerHTML = getCourseHint(getSelectedCourse());
  });

  startButton.addEventListener("click", startMatch);
}

function renderGame() {
  const template = document.querySelector("#game-template");
  const fragment = template.content.cloneNode(true);
  app.appendChild(fragment);

  const course = getSelectedCourse();
  if (!course.playable) {
    app.innerHTML = `
      <section class="setup-screen">
        <div class="panel">
          <div class="panel-title">
            <span>${course.name}</span>
            <span class="panel-chip">${course.island}</span>
          </div>
          <p class="helper-text">
            Este campo está en el listado real de Canarias, pero todavía no tiene cargada su tarjeta oficial hoyo a hoyo.
            Sin Par, HCP y metros verificados, no dejo calcular para no inventar golpes.
          </p>
          <button id="back-to-setup" class="primary-action" type="button">Volver y elegir otro campo</button>
        </div>
      </section>
    `;
    document.querySelector("#back-to-setup").addEventListener("click", () => {
      state.view = "setup";
      persistState();
      render();
    });
    return;
  }
  const hole = course.holes[state.currentHole];
  const activePlayers = getActivePlayers();
  const matchTitle = document.querySelector("#match-title");
  const scoreboard = document.querySelector("#scoreboard");
  updateGpsDistance(hole);

  document.querySelector("#current-hole-number").textContent = hole.number;
  document.querySelector("#current-hole-par").textContent = hole.par;
  document.querySelector("#current-hole-hcp").textContent = hole.strokeIndex;
  document.querySelector("#current-hole-yardage").textContent = formatGpsDistance();
  document.querySelector("#hole-total-yardage").textContent = `${hole.meters}m`;
  matchTitle.textContent = `${activePlayers.map((player) => player.name.split(" ")[0]).join(" vs ")} · ${course.name}`;

  activePlayers.forEach((player) => {
    const playerState = getPlayerMatchData(player.id);
    const holeScore = playerState.scores[hole.number] ?? null;
    const shotsOnHole = shotsReceivedForHole(playerState.courseHandicap, hole.strokeIndex);
    const holeStableford = playerState.holeStableford[hole.number];

    const row = document.createElement("div");
    row.className = "score-row";
    const stablefordClass = getStablefordClass(holeStableford);
    row.innerHTML = `
      <div class="score-card">
        <div class="score-heading">
          <h3>${player.name.toUpperCase()}</h3>
          <span class="pill pill-blue">HI ${formatNumber(player.handicapIndex)}</span>
        </div>
        <div class="score-stats">
          <div class="score-stat">
            <span>HCP+</span>
            <strong>${shotsOnHole}</strong>
          </div>
          <div class="score-stat ${holeStableford === null ? "" : `score-stat-stableford ${stablefordClass}`}">
            <span>Stableford</span>
            <strong>${holeStableford === null ? "-" : holeStableford}</strong>
          </div>
          <div class="score-stat">
            <span>Bruto</span>
            <strong>${playerState.grossTotal}</strong>
          </div>
          <button class="score-entry" type="button" data-score-player="${player.id}">
            ${holeScore === null ? "+" : holeScore}
          </button>
        </div>
      </div>
    `;
    scoreboard.appendChild(row);
  });

  scoreboard.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-score-player]");
    if (!trigger) {
      return;
    }
    openScoreModal(trigger.dataset.scorePlayer);
  });

  document.querySelector("#show-summary").addEventListener("click", () => {
    openSummaryModal(activePlayers);
  });

  document.querySelector("#end-match").addEventListener("click", endMatch);

  document.querySelector("#prev-hole").addEventListener("click", () => {
    state.currentHole = (state.currentHole + course.holes.length - 1) % course.holes.length;
    persistState();
    render();
  });

  document.querySelector("#next-hole").addEventListener("click", () => {
    state.currentHole = (state.currentHole + 1) % course.holes.length;
    persistState();
    render();
  });
}

function renderSummary(container, activePlayers) {
  const ranking = activePlayers
    .map((player) => {
      const data = getPlayerMatchData(player.id);
      return {
        name: player.name.toUpperCase(),
        stableford: data.stableford,
        gross: data.grossTotal,
        played: data.playedHoles,
      };
    })
    .sort((left, right) => right.stableford - left.stableford || left.gross - right.gross);

  container.innerHTML = `
    <div class="panel-title">
      <span>Clasificación general</span>
      <span class="panel-chip">Individual · Stableford</span>
    </div>
    <div class="summary-list">
      ${ranking
        .map(
          (entry, index) => `
            <div class="summary-row">
              <span class="summary-rank">${index + 1}</span>
              <strong>${entry.name}</strong>
              <span>${entry.stableford} ptos</span>
              <span>${entry.played ? `H${entry.played}` : "-"}</span>
              <span>${entry.gross} golpes</span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function openSummaryModal(activePlayers) {
  summaryModalContent.innerHTML = "";
  renderSummary(summaryModalContent, activePlayers);
  summaryModal.classList.remove("hidden");
  summaryModal.setAttribute("aria-hidden", "false");
}

function closeSummaryModal() {
  summaryModal.classList.add("hidden");
  summaryModal.setAttribute("aria-hidden", "true");
}

function startMatch() {
  const activePlayers = getActivePlayers();
  if (activePlayers.length === 0) {
    alert("Selecciona al menos un jugador.");
    return;
  }

  const course = getSelectedCourse();
  if (!course) {
    alert("Selecciona un campo válido.");
    return;
  }

  state.scores = Object.fromEntries(
    activePlayers.map((player) => {
      const existing = state.scores[player.id]?.scores ?? {};
      return [
        player.id,
        {
          scores: existing,
          courseHandicap: course.playable ? calculateCourseHandicap(player.handicapIndex, course) : 0,
        },
      ];
    }),
  );
  state.view = "game";
  state.currentHole = 0;
  persistState();
  render();
}

function endMatch() {
  const confirmed = window.confirm("¿Terminar partido y volver al inicio? Se conservarán los últimos valores guardados.");
  if (!confirmed) {
    return;
  }

  closeScoreModal();
  closeSummaryModal();
  state.view = "setup";
  state.currentHole = 0;
  state.scores = {};
  persistState();
  render();
}

function calculateCourseHandicap(handicapIndex, course) {
  const fullRoundValue = handicapIndex * (course.slope / 113) + (course.courseRating - course.ratingPar);
  return Math.max(0, Math.round(fullRoundValue * course.handicapFactor));
}

function getPlayerMatchData(playerId) {
  const course = getSelectedCourse();
  const player = players.find((entry) => entry.id === playerId);
  const match = state.scores[playerId] ?? {
    scores: {},
    courseHandicap: calculateCourseHandicap(player.handicapIndex, course),
  };
  const grossTotal = Object.values(match.scores).reduce((sum, value) => sum + value, 0);
  const playedHoles = Object.keys(match.scores).length;
  const stableford = course.holes.reduce((sum, hole) => {
    const gross = match.scores[hole.number];
    if (gross == null) {
      return sum;
    }
    const net = gross - shotsReceivedForHole(match.courseHandicap, hole.strokeIndex);
    return sum + Math.max(0, 2 + hole.par - net);
  }, 0);
  const holeStableford = Object.fromEntries(
    course.holes.map((hole) => {
      const gross = match.scores[hole.number];
      if (gross == null) {
        return [hole.number, null];
      }
      const net = gross - shotsReceivedForHole(match.courseHandicap, hole.strokeIndex);
      return [hole.number, Math.max(0, 2 + hole.par - net)];
    }),
  );

  return {
    scores: match.scores,
    courseHandicap: match.courseHandicap,
    grossTotal,
    playedHoles,
    stableford,
    holeStableford,
  };
}

function shotsReceivedForHole(playingHandicap, strokeIndex) {
  if (playingHandicap <= 0) {
    return 0;
  }
  return Math.floor((playingHandicap - strokeIndex + 17) / 18);
}

function openScoreModal(playerId) {
  state.modalPlayerId = playerId;
  const player = players.find((entry) => entry.id === playerId);
  modalPlayerName.textContent = player.name.toUpperCase();
  scorePad.innerHTML = "";

  const padValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+", "-", "Borrar"];
  padValues.forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pad-button ${value === "10+" || value === "-" ? "special" : ""}`.trim();
    button.textContent = value;
    button.dataset.value = value;
    scorePad.appendChild(button);
  });

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeScoreModal() {
  state.modalPlayerId = null;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

scorePad.addEventListener("click", (event) => {
  const button = event.target.closest("[data-value]");
  if (!button || !state.modalPlayerId) {
    return;
  }

  const holeNumber = getSelectedCourse().holes[state.currentHole].number;
  const match = state.scores[state.modalPlayerId];
  const { value } = button.dataset;

  if (value === "Borrar") {
    delete match.scores[holeNumber];
  } else if (value === "-") {
    match.scores[holeNumber] = 0;
  } else if (value === "10+") {
    match.scores[holeNumber] = 10;
  } else {
    match.scores[holeNumber] = Number(value);
  }

  closeScoreModal();
  persistState();
  render();
});

closeModalButton.addEventListener("click", closeScoreModal);
closeSummaryModalButton.addEventListener("click", closeSummaryModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeScoreModal();
  }
});
summaryModal.addEventListener("click", (event) => {
  if (event.target === summaryModal) {
    closeSummaryModal();
  }
});

function getActivePlayers() {
  return players.filter((player) => player.selected);
}

function getSelectedCourse() {
  return courses.find((course) => course.id === state.selectedCourseId) ?? courses[0];
}

function getStablefordClass(points) {
  if (points == null) {
    return "";
  }
  if (points <= 1) {
    return "stableford-low";
  }
  if (points === 2) {
    return "stableford-mid";
  }
  if (points === 3) {
    return "stableford-good";
  }
  return "stableford-hot";
}

function getCourseHint(course) {
  if (!course.playable) {
    return `${course.island} · ${course.sourceLabel}`;
  }

  const source = course.sourceUrl
    ? `<a href="${course.sourceUrl}" target="_blank" rel="noopener noreferrer">${course.sourceLabel}</a>`
    : course.sourceLabel;

  return `${course.island} · ${course.holesCount} hoyos · Barras ${course.tee} · Slope ${course.slope} · CR ${formatNumber(course.courseRating)} · ${source}`;
}

function loadPlayers() {
  const stored = loadStoredState();
  if (!stored.players) {
    return defaultPlayers.map((player) => ({ ...player }));
  }

  return defaultPlayers.map((player) => {
    const persisted = stored.players.find((entry) => entry.id === player.id);
    return persisted
      ? {
          ...player,
          selected: persisted.selected,
          handicapIndex: persisted.handicapIndex,
          validatedAt: persisted.validatedAt,
        }
      : { ...player };
  });
}

function loadStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function startGeolocationWatch() {
  if (!("geolocation" in navigator)) {
    state.gps.status = "unsupported";
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      state.gps.userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      state.gps.status = "ready";
      if (state.view === "game") {
        render();
      }
    },
    () => {
      state.gps.status = "denied";
      if (state.view === "game") {
        render();
      }
    },
    {
      enableHighAccuracy: true,
      maximumAge: 3000,
      timeout: 10000,
    },
  );
}

function updateGpsDistance(hole) {
  if (!hole.greenCoordinates || !state.gps.userPosition) {
    state.gps.distanceMeters = null;
    return;
  }

  state.gps.distanceMeters = Math.round(
    haversineMeters(state.gps.userPosition.lat, state.gps.userPosition.lng, hole.greenCoordinates.lat, hole.greenCoordinates.lng),
  );
}

function formatGpsDistance() {
  if (state.gps.distanceMeters != null) {
    return `${state.gps.distanceMeters}m`;
  }
  if (state.gps.status === "denied") {
    return "GPS off";
  }
  if (state.gps.status === "unsupported") {
    return "Sin GPS";
  }
  return "--";
}

function haversineMeters(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function persistState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      players: players.map((player) => ({
        id: player.id,
        selected: player.selected,
        handicapIndex: player.handicapIndex,
        validatedAt: player.validatedAt,
      })),
      selectedCourseId: state.selectedCourseId,
      scores: state.scores,
    }),
  );
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function formatNumber(value) {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
