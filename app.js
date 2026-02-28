const STORAGE_KEY = "golf-canarias-state-v2";
const COURSE_DATA_CACHE_KEY = "golf-canarias-course-cache-v4";
const RFEG_HANDICAP_URL = "https://rfeg.es/jugar/handicap";
const RFEG_API_URL = "https://api.rfeg.es/web/search/handicap";
const RFEG_PROXY_PAGE_URL = "https://api.allorigins.win/raw?url=https://rfeg.es/jugar/handicap";
const OPEN_PROXY_BASE_URL = "https://api.allorigins.win/raw?url=";
const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const NETWORK_TIMEOUT_MS = 12000;
const PRIVATE_CONFIG = window.GOLF_PRIVATE_CONFIG ?? {};
const COURSE_GPS_API = {
  provider: "osm",
  enabled: true,
  baseUrl: "https://overpass-api.de/api/interpreter",
  endpointTemplate: "/courses/{courseId}",
  searchEndpointTemplate: "",
  apiKey: "",
  apiKeyHeader: "Authorization",
  apiKeyPrefix: "Key ",
  ...PRIVATE_CONFIG.courseApi,
};

const COURSE_OSM_NAMES = {
  "abama-golf": "Abama Golf",
  "costa-adeje-los-lagos-9-hoyos": "Campo Los Lagos",
  "golf-las-americas": "Golf las Américas",
};

const defaultPlayers = [
  {
    id: "jose-luis",
    name: "Jose Luis Bejar Gutierrez",
    license: "CP41742315",
    handicapIndex: 18.4,
    selected: true,
    validatedAt: "Local",
  },
  {
    id: "javier",
    name: "Javier Bejar Navarrete",
    license: "CM00472449",
    handicapIndex: 28.6,
    selected: true,
    validatedAt: "Local",
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
      [1, 4, 9, 293, 28.1697954, -16.7930868],
      [2, 4, 7, 265, 28.1687650, -16.7884320],
      [3, 5, 11, 502, 28.1697065, -16.7831909],
      [4, 3, 5, 182, 28.1708254, -16.7837752],
      [5, 4, 13, 300, 28.1722343, -16.7796052],
      [6, 5, 15, 423, 28.1716971, -16.7839469],
      [7, 3, 17, 130, 28.1726903, -16.7840225],
      [8, 4, 1, 387, 28.1724324, -16.7871051],
      [9, 4, 3, 390, 28.1710493, -16.7889820],
      [10, 5, 12, 463, 28.1706238, -16.7945814],
      [11, 4, 10, 324, 28.1697855, -16.7983890],
      [12, 3, 14, 152, 28.1699946, -16.8013709],
      [13, 4, 16, 276, 28.1703438, -16.7971284],
      [14, 3, 18, 147, 28.1697810, -16.7940232],
      [15, 4, 4, 349, 28.1693681, -16.7948227],
      [16, 4, 6, 349, 28.1667315, -16.7943821],
      [17, 5, 8, 452, 28.1673424, -16.7922530],
      [18, 4, 2, 385, 28.1662549, -16.7934715],
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
      [1, 5, 7, 472, 28.3708363, -16.8613043],
      [2, 3, 17, 122, 28.3717700, -16.8582922],
      [3, 4, 15, 317, 28.3712322, -16.8580192],
      [4, 3, 9, 178, 28.3700395, -16.8608174],
      [5, 5, 13, 440, 28.3724790, -16.8623198],
      [6, 4, 3, 393, 28.3727838, -16.8589532],
      [7, 4, 1, 367, 28.3739532, -16.8597792],
      [8, 3, 5, 193, 28.3721505, -16.8584580],
      [9, 5, 11, 441, 28.3750354, -16.8625962],
      [10, 5, 18, 468, 28.3726390, -16.8659352],
      [11, 4, 2, 363, 28.3725091, -16.8677811],
      [12, 3, 16, 134, 28.3723430, -16.8651080],
      [13, 5, 12, 444, 28.3749177, -16.8664432],
      [14, 4, 10, 325, 28.3740312, -16.8638303],
      [15, 3, 8, 185, 28.3731399, -16.8642446],
      [16, 4, 6, 304, 28.3727997, -16.8637387],
      [17, 3, 4, 165, 28.3747491, -16.8604599],
      [18, 5, 14, 436, 28.3712325, -16.8626502],
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
const courseDataCache = loadCourseDataCache();
let rfegTokenCache = {
  value: PRIVATE_CONFIG.rfegToken ?? "",
  fetchedAt: PRIVATE_CONFIG.rfegToken ? Date.now() : 0,
};
let rfegTokenPromise = null;

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
    providerCourseId: null,
    osmQueryName: COURSE_OSM_NAMES[name.toLowerCase().replaceAll(" ", "-")] ?? name,
    par,
    holes: config.holes.map(([number, parValue, strokeIndex, meters, greenLat, greenLng]) => ({
      number,
      par: parValue,
      strokeIndex,
      meters,
      greenFront: Math.max(30, meters - 18),
      greenCenter: Math.max(20, meters - 6),
      greenBack: meters + 10,
      greenCoordinates:
        Number.isFinite(greenLat) && Number.isFinite(greenLng)
          ? {
              lat: greenLat,
              lng: greenLng,
            }
          : null,
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
  const startButton = document.querySelector("#start-match");
  const addPlayerButton = document.querySelector("#add-player");

  players.forEach((player) => {
    const row = document.createElement("div");
    row.className = "player-row";
    const federationUi = getPlayerFederationUi(player);
    row.innerHTML = `
      <input class="player-check" type="checkbox" data-player-id="${player.id}" ${player.selected ? "checked" : ""} />
      <div class="player-block">
        <div class="player-main">
          <p class="player-name">${player.name.toUpperCase()}</p>
          <p class="player-meta">Licencia ${player.license}</p>
        </div>
        <div class="player-controls">
          <input
            type="number"
            min="0"
            max="54"
            step="0.1"
            value="${player.handicapIndex}"
            data-handicap-player="${player.id}"
            aria-label="Handicap de ${player.name}"
          />
          <div class="player-actions">
            <button class="compact-button" type="button" data-state="${federationUi.state}" data-validate-player="${player.id}">
              ${federationUi.label}
            </button>
            <span class="validation-note">${federationUi.note}</span>
          </div>
        </div>
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
  playersList.addEventListener("change", (event) => {
    const checkbox = event.target.closest('input[type="checkbox"]');

    if (checkbox) {
      const player = players.find((entry) => entry.id === checkbox.dataset.playerId);
      if (player) {
        player.selected = checkbox.checked;
        persistState();
      }
    }
  });

  playersList.addEventListener("input", (event) => {
    const handicapInput = event.target.closest("[data-handicap-player]");
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

  playersList.addEventListener("click", async (event) => {
    const validateButton = event.target.closest("[data-validate-player]");
    if (!validateButton) {
      return;
    }
    const player = players.find((entry) => entry.id === validateButton.dataset.validatePlayer);
    if (!player) {
      return;
    }
    await syncFederationHandicaps([player], { force: true });
  });

  courseSelect.addEventListener("change", () => {
    const match = courses.find((course) => course.id === courseSelect.value);
    state.selectedCourseId = match?.id ?? courses[0].id;
    persistState();
  });

  addPlayerButton.addEventListener("click", addPlayer);

  startButton.addEventListener("click", async () => {
    startButton.disabled = true;
    startButton.textContent = "Cargando campo...";
    try {
      await startMatch();
    } finally {
      if (state.view === "setup") {
        startButton.disabled = false;
        startButton.textContent = "Comenzar partido";
      }
    }
  });
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
  document.querySelector("#current-hole-yardage").textContent = formatGpsDistance(hole);
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

  document.querySelector("#end-match").addEventListener("click", (event) => {
    event.preventDefault();
    endMatch();
  });

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

async function startMatch() {
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

  void requestCurrentPosition().then(() => {
    if (state.view === "game") {
      render();
    }
  });

  void ensureCourseGpsData(course).then((gpsReady) => {
    if (COURSE_GPS_API.enabled && !gpsReady) {
      console.warn(`No se encontraron datos externos para ${course.name}.`);
    }
    if (state.view === "game") {
      render();
    }
  });
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
  const grossTotal = Object.values(match.scores).reduce((sum, value) => (typeof value === "number" ? sum + value : sum), 0);
  const playedHoles = Object.keys(match.scores).length;
  const stableford = course.holes.reduce((sum, hole) => {
    const gross = match.scores[hole.number];
    if (gross == null) {
      return sum;
    }
    if (gross === "-") {
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
      if (gross === "-") {
        return [hole.number, 0];
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
    match.scores[holeNumber] = "-";
  } else if (value === "10+") {
    const customValue = window.prompt("Introduce los golpes (10 o más):", "10");
    if (customValue == null) {
      return;
    }
    const numericValue = Number(customValue);
    if (!Number.isFinite(numericValue) || numericValue < 10) {
      alert("Introduce un número válido de 10 o más.");
      return;
    }
    match.scores[holeNumber] = Math.floor(numericValue);
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

function getGpsCourseStatus(course) {
  if (!course.playable) {
    return "GPS del campo no disponible.";
  }
  if (hasCachedGpsData(course.id)) {
    return "Datos del campo en caché local: no hará más peticiones durante la partida.";
  }
  if (!COURSE_GPS_API.enabled) {
    return "API externa no configurada todavía. Al activarla, se hará una única petición antes de empezar.";
  }
  if (COURSE_GPS_API.provider === "osm") {
    return "OSM activa: se hará una única consulta pública antes de empezar y quedará guardada localmente.";
  }
  if (COURSE_GPS_API.provider === "golfcourseapi") {
    return "Golf Course API activa: se hará una única búsqueda del campo al iniciar y quedará guardada localmente.";
  }
  return "API activa: se hará una única petición al iniciar y quedará guardado localmente.";
}

function loadPlayers() {
  const stored = loadStoredState();
  if (!stored.players) {
    return defaultPlayers.map((player) => ({ ...player }));
  }

  const mergedDefaults = defaultPlayers.map((player) => {
    const persisted = stored.players.find((entry) => entry.id === player.id);
    const merged = persisted
      ? {
          ...player,
          selected: persisted.selected,
          handicapIndex: persisted.handicapIndex,
          validatedAt: persisted.validatedAt,
          validationStatus: persisted.validationStatus,
          lastFederationLicense: persisted.lastFederationLicense,
          federationAttemptedAt: persisted.federationAttemptedAt,
        }
      : { ...player };
    refreshPlayerValidation(merged);
    return merged;
  });

  const extras = stored.players
    .filter((entry) => !defaultPlayers.some((player) => player.id === entry.id))
    .map((entry) => ({
      id: entry.id,
      name: entry.name,
      license: entry.license ?? "",
      handicapIndex: entry.handicapIndex ?? 0,
      selected: entry.selected ?? true,
      validatedAt: entry.validatedAt ?? "",
      validationStatus: entry.validationStatus,
      lastFederationLicense: entry.lastFederationLicense,
      federationAttemptedAt: entry.federationAttemptedAt,
    }));

  extras.forEach(refreshPlayerValidation);

  return [...mergedDefaults, ...extras];
}

function loadStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function loadCourseDataCache() {
  try {
    return JSON.parse(localStorage.getItem(COURSE_DATA_CACHE_KEY) ?? "{}");
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
    (error) => {
      state.gps.status = error.code === 1 ? "denied" : "searching";
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

function requestCurrentPosition() {
  if (!("geolocation" in navigator)) {
    state.gps.status = "unsupported";
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.gps.userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        state.gps.status = "ready";
        resolve(position);
      },
      (error) => {
        state.gps.status = error.code === 1 ? "denied" : "searching";
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  });
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

function formatGpsDistance(hole) {
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
        name: player.name,
        license: player.license,
        selected: player.selected,
        handicapIndex: player.handicapIndex,
        validatedAt: player.validatedAt,
        validationStatus: player.validationStatus,
        lastFederationLicense: player.lastFederationLicense,
        federationAttemptedAt: player.federationAttemptedAt,
      })),
      selectedCourseId: state.selectedCourseId,
      scores: state.scores,
    }),
  );
}

function addPlayer() {
  const name = window.prompt("Nombre del jugador:");
  if (!name) {
    return;
  }
  const license = window.prompt("Licencia (opcional):", "") ?? "";
  const handicapText = window.prompt("Handicap inicial:", "0");
  const handicapIndex = clamp(Number(handicapText), 0, 54);
  const id = slugify(`${name}-${Date.now()}`);

  players.push({
    id,
    name,
    license,
    handicapIndex: Number.isFinite(handicapIndex) ? handicapIndex : 0,
    selected: true,
    validatedAt: "",
    validationStatus: "idle",
    lastFederationLicense: "",
    federationAttemptedAt: null,
  });
  persistState();
  render();
}

function refreshPlayerValidation(player) {
  if (!player) {
    return;
  }
  if (!player.license) {
    player.validationStatus = "idle";
    return;
  }
  player.validationStatus =
    player.validationStatus ??
    (player.validatedAt && /^\d{4}-\d{2}-\d{2}$/.test(player.validatedAt)
      ? "federation"
      : player.federationAttemptedAt
      ? "failed"
      : "idle");
}

function hasCachedGpsData(courseId) {
  const cached = courseDataCache[courseId];
  return Boolean(cached && Array.isArray(cached.holes) && cached.holes.length > 0);
}

async function ensureCourseGpsData(course) {
  if (!course.playable) {
    return false;
  }

  if (hasCachedGpsData(course.id)) {
    applyGpsDataToCourse(course, courseDataCache[course.id]);
    return true;
  }

  if (!COURSE_GPS_API.enabled || !COURSE_GPS_API.baseUrl) {
    return false;
  }

  const normalized =
    COURSE_GPS_API.provider === "osm" ? await fetchOsmCourseData(course) : normalizeCourseGpsPayload(await fetchCourseGpsPayload(course), course);
  if (!normalized) {
    return false;
  }

  courseDataCache[course.id] = normalized;
  localStorage.setItem(COURSE_DATA_CACHE_KEY, JSON.stringify(courseDataCache));
  applyGpsDataToCourse(course, normalized);
  return true;
}

async function fetchCourseGpsPayload(course) {
  try {
    const endpoint =
      COURSE_GPS_API.provider === "osm"
        ? `?data=${encodeURIComponent(buildOverpassCourseQuery(course))}`
        : COURSE_GPS_API.provider === "golfcourseapi"
        ? COURSE_GPS_API.searchEndpointTemplate.replace("{searchQuery}", encodeURIComponent(course.name))
        : COURSE_GPS_API.endpointTemplate.replace("{courseId}", encodeURIComponent(course.id));
    const url = new URL(endpoint, COURSE_GPS_API.baseUrl).toString();
    const headers = {};
    if (COURSE_GPS_API.apiKey) {
      headers[COURSE_GPS_API.apiKeyHeader] = `${COURSE_GPS_API.apiKeyPrefix ?? ""}${COURSE_GPS_API.apiKey}`;
    }
    const response = await fetchWithTimeout(url, { headers });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchOsmCourseData(course) {
  const byAreaPayload = await fetchJsonViaProxy(new URL(`?data=${encodeURIComponent(buildOverpassCourseQuery(course))}`, COURSE_GPS_API.baseUrl).toString());
  let normalized = normalizeOsmPayload(byAreaPayload, course);
  if (normalized) {
    return normalized;
  }

  const geo = await fetchCourseGeocode(course);
  if (!geo?.boundingBox) {
    return null;
  }

  if (!normalized && geo.boundingBox) {
    const bboxPayload = await fetchJsonViaProxy(new URL(`?data=${encodeURIComponent(buildOverpassBboxQuery(geo.boundingBox))}`, COURSE_GPS_API.baseUrl).toString());
    normalized = normalizeOsmPayload(bboxPayload, course);
  }

  if (!normalized) {
    return null;
  }
  return normalized;
}

async function fetchCourseGeocode(course) {
  const query = `${course.osmQueryName}, ${course.island}, Canarias, España`;
  const url = `${NOMINATIM_SEARCH_URL}?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`;
  const results = await fetchJsonViaProxy(url);
  const hit = Array.isArray(results) ? results[0] : null;
  if (!hit) {
    return null;
  }

  const south = Number(hit.boundingbox?.[0]);
  const north = Number(hit.boundingbox?.[1]);
  const west = Number(hit.boundingbox?.[2]);
  const east = Number(hit.boundingbox?.[3]);

  return {
    center: {
      lat: Number(hit.lat),
      lng: Number(hit.lon),
    },
    boundingBox:
      [south, west, north, east].every((value) => Number.isFinite(value))
        ? { south, west, north, east }
        : null,
  };
}

async function fetchJsonViaProxy(url) {
  try {
    const proxiedUrl = `${OPEN_PROXY_BASE_URL}${encodeURIComponent(url)}`;
    const response = await fetchWithTimeout(proxiedUrl);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

function normalizeCourseGpsPayload(payload, course) {
  if (COURSE_GPS_API.provider === "osm") {
    return normalizeOsmPayload(payload, course);
  }
  if (COURSE_GPS_API.provider === "golfcourseapi") {
    return normalizeGolfCourseApiPayload(payload, course);
  }

  const incomingHoles = Array.isArray(payload?.holes) ? payload.holes : Array.isArray(payload) ? payload : null;
  if (!incomingHoles) {
    return null;
  }

  const normalizedHoles = incomingHoles
    .map((hole) => {
      const number = Number(hole.number ?? hole.hole ?? hole.id);
      const green = hole.greenCoordinates ?? hole.green ?? hole.center ?? null;
      const lat = Number(green?.lat ?? green?.latitude ?? hole.greenLat ?? hole.latitude);
      const lng = Number(green?.lng ?? green?.lon ?? green?.longitude ?? hole.greenLng ?? hole.longitude);
      if (!Number.isInteger(number) || !Number.isFinite(lat) || !Number.isFinite(lng)) {
        return null;
      }
      return {
        number,
        greenCoordinates: { lat, lng },
      };
    })
    .filter(Boolean);

  if (normalizedHoles.length !== course.holesCount) {
    return null;
  }

  return { holes: normalizedHoles };
}

function applyGpsDataToCourse(course, gpsData) {
  if (gpsData.tee) {
    course.tee = gpsData.tee.tee_name ?? course.tee;
    course.slope = gpsData.tee.slope_rating ?? course.slope;
    course.courseRating = gpsData.tee.course_rating ?? course.courseRating;
    course.par = gpsData.tee.par_total ?? course.par;
  }

  if (gpsData.providerCourseId) {
    course.providerCourseId = gpsData.providerCourseId;
  }
  course.holes.forEach((hole, index) => {
    const match = gpsData.holes.find((entry) => entry.number === hole.number) ?? gpsData.holes[index];
    if (!match) {
      return;
    }
    if (match.par != null) {
      hole.par = match.par;
    }
    if (match.handicap != null) {
      hole.strokeIndex = match.handicap;
    }
    if (match.meters != null) {
      hole.meters = match.meters;
      hole.greenFront = Math.max(30, hole.meters - 18);
      hole.greenCenter = Math.max(20, hole.meters - 6);
      hole.greenBack = hole.meters + 10;
    }
    if (match.greenCoordinates) {
      hole.greenCoordinates = match.greenCoordinates;
    }
  });
}

function normalizeGolfCourseApiPayload(payload, course) {
  const coursesResult = Array.isArray(payload?.courses) ? payload.courses : [];
  if (coursesResult.length === 0) {
    return null;
  }

  const match =
    coursesResult.find((entry) => isCourseNameMatch(entry, course)) ??
    coursesResult.find((entry) => String(entry.course_name || "").toLowerCase().includes(course.name.toLowerCase())) ??
    coursesResult[0];

  const tee = pickGolfCourseApiTee(match, course);
  if (!tee || !Array.isArray(tee.holes) || tee.holes.length !== course.holesCount) {
    return null;
  }

  return {
    providerCourseId: match.id ?? null,
    tee,
    holes: tee.holes.map((hole, index) => ({
      number: index + 1,
      par: Number(hole.par),
      handicap: Number(hole.handicap),
      meters: Number.isFinite(Number(hole.meters)) ? Number(hole.meters) : yardsToMeters(Number(hole.yardage)),
    })),
  };
}

function buildOverpassCourseQuery(course) {
  const escapedName = String(course.osmQueryName || course.name).replaceAll('"', '\\"');
  return `
[out:json][timeout:25];
(
  way["leisure"="golf_course"]["name"="${escapedName}"];
  relation["leisure"="golf_course"]["name"="${escapedName}"];
)->.course;
map_to_area .course->.courseArea;
(
  node["golf"~"^(hole|green|pin|tee)$"](area.courseArea);
  way["golf"~"^(hole|green|pin|tee)$"](area.courseArea);
  relation["golf"~"^(hole|green|pin|tee)$"](area.courseArea);
)->.holes;
(
  .holes;
);
out geom center tags qt;
  `.trim();
}

function buildOverpassBboxQuery(boundingBox) {
  return `
[out:json][timeout:25];
(
  node["golf"~"^(hole|green|pin|tee)$"](${boundingBox.south},${boundingBox.west},${boundingBox.north},${boundingBox.east});
  way["golf"~"^(hole|green|pin|tee)$"](${boundingBox.south},${boundingBox.west},${boundingBox.north},${boundingBox.east});
  relation["golf"~"^(hole|green|pin|tee)$"](${boundingBox.south},${boundingBox.west},${boundingBox.north},${boundingBox.east});
);
out geom center tags qt;
  `.trim();
}

function normalizeOsmPayload(payload, course) {
  const elements = Array.isArray(payload?.elements) ? payload.elements : [];
  const getLat = (entry) => Number(entry.lat ?? entry.center?.lat);
  const getLng = (entry) => Number(entry.lon ?? entry.center?.lon);
  const holes = [];
  const tees = [];
  const explicitGreens = [];
  const looseGreens = [];

  elements.forEach((entry) => {
    const lat = getLat(entry);
    const lng = getLng(entry);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }

    const golfType = entry.tags?.golf;
    const numberedRef = golfType === "hole" && entry.tags?.ref ? Number(entry.tags.ref) : extractHoleNumberFromTags(entry.tags);

    if (golfType === "hole" && Number.isInteger(numberedRef)) {
      holes.push({ number: numberedRef, lat, lng });
      return;
    }

    if (golfType === "tee" && Number.isInteger(numberedRef)) {
      tees.push({ number: numberedRef, lat, lng });
      return;
    }

    if (["green", "pin"].includes(golfType)) {
      if (Number.isInteger(numberedRef)) {
        explicitGreens.push({ number: numberedRef, lat, lng });
      } else {
        looseGreens.push({ lat, lng });
      }
    }
  });

  const exactMap = buildExactGreenMap(explicitGreens, course.holesCount);
  if (exactMap) {
    return {
      providerCourseId: `osm:${course.id}`,
      holes: exactMap.map((entry) => ({
        number: entry.number,
        greenCoordinates: entry.greenCoordinates,
      })),
    };
  }

  const fromHoles = buildMixedGreenMap(holes, explicitGreens, looseGreens, course.holesCount);
  if (fromHoles) {
    return {
      providerCourseId: `osm:${course.id}`,
      holes: fromHoles.map((entry) => ({
        number: entry.number,
        greenCoordinates: entry.greenCoordinates,
      })),
    };
  }

  const fromTees = buildMixedGreenMap(tees, explicitGreens, looseGreens, course.holesCount);
  if (fromTees) {
    return {
      providerCourseId: `osm:${course.id}`,
      holes: fromTees.map((entry) => ({
        number: entry.number,
        greenCoordinates: entry.greenCoordinates,
      })),
    };
  }

  return null;
}

function assignGreensToHoles(holes, greens) {
  const remainingGreens = [...greens];
  const result = holes
    .sort((left, right) => left.number - right.number)
    .map((hole) => {
      if (remainingGreens.length === 0) {
        return null;
      }
      let closestIndex = 0;
      let closestDistance = Infinity;
      remainingGreens.forEach((green, index) => {
        const distance = haversineMeters(hole.lat, hole.lng, green.lat, green.lng);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      const [green] = remainingGreens.splice(closestIndex, 1);
      return {
        number: hole.number,
        greenCoordinates: { lat: green.lat, lng: green.lng },
      };
    });

  if (result.some((entry) => entry === null)) {
    return null;
  }
  return result;
}

function buildExactGreenMap(explicitGreens, holesCount) {
  const unique = dedupeNumberedPoints(explicitGreens);
  if (unique.length !== holesCount) {
    return null;
  }
  return unique
    .sort((left, right) => left.number - right.number)
    .map((entry) => ({
      number: entry.number,
      greenCoordinates: { lat: entry.lat, lng: entry.lng },
    }));
}

function buildMixedGreenMap(referencePoints, explicitGreens, looseGreens, holesCount) {
  const uniqueRefs = dedupeNumberedPoints(referencePoints);
  const exactByNumber = new Map(
    dedupeNumberedPoints(explicitGreens).map((entry) => [entry.number, { lat: entry.lat, lng: entry.lng }]),
  );
  const referenceByNumber = new Map(uniqueRefs.map((entry) => [entry.number, entry]));
  const allNumbers = new Set([...exactByNumber.keys(), ...referenceByNumber.keys()]);
  if (allNumbers.size !== holesCount) {
    return null;
  }

  const orderedNumbers = [...allNumbers].sort((left, right) => left - right);
  const remainingRefs = [];
  const result = orderedNumbers.map((number) => {
      const exact = exactByNumber.get(number);
      if (exact) {
        return {
          number,
          greenCoordinates: exact,
        };
      }
      const reference = referenceByNumber.get(number);
      if (!reference) {
        return null;
      }
      remainingRefs.push(reference);
      return null;
    });

  if (result.some((entry) => entry === null) && remainingRefs.length === 0) {
    return null;
  }
  if (remainingRefs.length === 0) {
    return result;
  }
  if (looseGreens.length < remainingRefs.length) {
    return null;
  }

  const assigned = assignGreensToHoles(remainingRefs, looseGreens);
  if (!assigned) {
    return null;
  }
  const assignedByNumber = new Map(assigned.map((entry) => [entry.number, entry.greenCoordinates]));
  const merged = result.map((entry, index) =>
    entry ??
    (() => {
      const number = orderedNumbers[index];
      const greenCoordinates = assignedByNumber.get(number);
      if (!greenCoordinates) {
        return null;
      }
      return {
        number,
        greenCoordinates,
      };
    })(),
  );

  if (merged.some((entry) => entry === null)) {
    return null;
  }
  return merged;
}

function dedupeNumberedPoints(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    if (!Number.isInteger(entry.number) || seen.has(entry.number)) {
      return false;
    }
    seen.add(entry.number);
    return true;
  });
}

function extractHoleNumberFromTags(tags) {
  if (!tags) {
    return null;
  }

  for (const value of Object.values(tags)) {
    const match = String(value).match(/(?:^|[^0-9])(1[0-8]|[1-9])(?:[^0-9]|$)/);
    if (match) {
      const number = Number(match[1]);
      if (Number.isInteger(number)) {
        return number;
      }
    }
  }

  return null;
}

function isCourseNameMatch(entry, course) {
  const candidate = normalizeName(`${entry.club_name ?? ""} ${entry.course_name ?? ""}`);
  const target = normalizeName(course.name);
  return candidate.includes(target) || target.includes(normalizeName(entry.course_name ?? ""));
}

function pickGolfCourseApiTee(entry, course) {
  const tees = [...(entry?.tees?.male ?? []), ...(entry?.tees?.female ?? [])].filter(
    (tee) => tee.number_of_holes === course.holesCount && Array.isArray(tee.holes) && tee.holes.length === course.holesCount,
  );
  if (tees.length === 0) {
    return null;
  }

  return tees.sort((left, right) => {
    const leftDelta = Math.abs((left.total_meters ?? yardsToMeters(left.total_yards ?? 0)) - course.holes.reduce((sum, hole) => sum + hole.meters, 0));
    const rightDelta = Math.abs((right.total_meters ?? yardsToMeters(right.total_yards ?? 0)) - course.holes.reduce((sum, hole) => sum + hole.meters, 0));
    return leftDelta - rightDelta;
  })[0];
}

function normalizeName(value) {
  return value
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim();
}

function yardsToMeters(yards) {
  return Math.round((yards || 0) * 0.9144);
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

function getPlayerFederationUi(player) {
  if (player.validationStatus === "loading") {
    return {
      state: "loading",
      label: "Federación...",
      note: "Buscando HCP",
    };
  }

  if (player.validationStatus === "federation" && player.validatedAt) {
    return {
      state: "done",
      label: "Federación",
      note: `Act. ${formatShortDate(player.validatedAt)}`,
    };
  }

  if (player.validationStatus === "failed") {
    return {
      state: "idle",
      label: "Federación",
      note: "Guardado",
    };
  }

  return {
    state: "idle",
    label: "Federación",
    note: player.license ? "Pendiente" : "Sin licencia",
  };
}

function formatShortDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "-";
  }
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

async function syncFederationHandicaps(targetPlayers = players, options = {}) {
  const force = Boolean(options.force);
  const candidates = targetPlayers.filter(
    (player) =>
      player.license &&
      (force ||
        player.lastFederationLicense !== player.license ||
        (!player.federationAttemptedAt && player.validationStatus !== "federation")),
  );
  if (candidates.length === 0) {
    return;
  }
  const pendingPlayers = candidates.filter((player) => player.validationStatus !== "loading");
  pendingPlayers.forEach((player) => {
    player.validationStatus = "loading";
  });

  if (pendingPlayers.length > 0 && state.view === "setup") {
    render();
  }

  await Promise.all(
    candidates.map(async (player) => {
      try {
        const result = await fetchFederationHandicap(player.license);
        if (!result) {
          player.validationStatus = "failed";
          player.lastFederationLicense = player.license;
          player.federationAttemptedAt = Date.now();
          persistState();
          return;
        }
        player.handicapIndex = result.handicapIndex;
        player.validatedAt = result.updatedAt;
        player.validationStatus = "federation";
        player.lastFederationLicense = player.license;
        player.federationAttemptedAt = Date.now();
        persistState();
      } catch {
        player.validationStatus = "failed";
        player.lastFederationLicense = player.license;
        player.federationAttemptedAt = Date.now();
        persistState();
      }
    }),
  );

  if (state.view === "setup") {
    render();
  }
}

async function fetchFederationHandicap(query) {
  let token = await getCurrentRfegToken();
  if (!token) {
    return null;
  }
  const url = `${RFEG_API_URL}?q=${encodeURIComponent(query)}`;
  let response = await fetchWithTimeout(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    token = await getCurrentRfegToken(true);
    if (!token) {
      return null;
    }
    response = await fetchWithTimeout(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  if (!response.ok) {
    return null;
  }
  const payload = await response.json();
  const hit = pickFederationDocument(payload?.data?.hits, query);
  const handicapIndex = Number(hit?.handicap);
  if (!Number.isFinite(handicapIndex)) {
    return null;
  }
  return {
    handicapIndex: clamp(handicapIndex, 0, 54),
    updatedAt: hit?.date_hdc_updated_at ?? "",
  };
}

function pickFederationDocument(hits, query) {
  const documents = Array.isArray(hits) ? hits.map((entry) => entry?.document).filter(Boolean) : [];
  if (documents.length === 0) {
    return null;
  }

  const normalizedQuery = normalizeFederationValue(query);
  const exactMatches = documents.filter((document) => federationDocumentMatches(document, normalizedQuery));
  if (exactMatches.length > 0) {
    return exactMatches[0];
  }

  return documents.length === 1 ? documents[0] : null;
}

function federationDocumentMatches(document, normalizedQuery) {
  if (!normalizedQuery) {
    return false;
  }

  return collectFederationStrings(document).some((value) => normalizeFederationValue(value) === normalizedQuery);
}

function collectFederationStrings(value, seen = new Set()) {
  if (value == null) {
    return [];
  }
  if (typeof value === "string" || typeof value === "number") {
    return [String(value)];
  }
  if (typeof value !== "object") {
    return [];
  }
  if (seen.has(value)) {
    return [];
  }
  seen.add(value);
  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectFederationStrings(entry, seen));
  }
  return Object.values(value).flatMap((entry) => collectFederationStrings(entry, seen));
}

function normalizeFederationValue(value) {
  return String(value ?? "")
    .toUpperCase()
    .replaceAll(/[^A-Z0-9]+/g, "");
}

async function getCurrentRfegToken(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && rfegTokenCache.value && now - rfegTokenCache.fetchedAt < 5 * 60 * 1000) {
    return rfegTokenCache.value;
  }
  if (!forceRefresh && rfegTokenPromise) {
    return await rfegTokenPromise;
  }

  rfegTokenPromise = (async () => {
    try {
      const response = await fetchWithTimeout(RFEG_PROXY_PAGE_URL);
      if (!response.ok) {
        rfegTokenPromise = null;
        return "";
      }
      const html = await response.text();
      const match = html.match(/App\.page\.init\("jugar",\s*'([^']+)'/);
      if (!match?.[1]) {
        rfegTokenPromise = null;
        return "";
      }
      rfegTokenCache = {
        value: match[1],
        fetchedAt: Date.now(),
      };
      rfegTokenPromise = null;
      return rfegTokenCache.value;
    } catch {
      rfegTokenPromise = null;
      return "";
    }
  })();
  return await rfegTokenPromise;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = NETWORK_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timer);
  }
}
