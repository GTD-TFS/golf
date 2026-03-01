const STORAGE_KEY = "golf-canarias-state-v2";
const COURSE_DATA_CACHE_KEY = "golf-canarias-course-cache-v9";
const RFEG_HANDICAP_URL = "https://rfeg.es/jugar/handicap";
const RFEG_API_URL = "https://api.rfeg.es/web/search/handicap";
const RFEG_PROXY_PAGE_URL = "https://api.allorigins.win/raw?url=https://rfeg.es/jugar/handicap";
const OPEN_PROXY_BASE_URL = "https://api.allorigins.win/raw?url=";
const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const NETWORK_TIMEOUT_MS = 12000;
const OVERPASS_TIMEOUT_SECONDS = 60;
const PRIVATE_CONFIG = window.GOLF_PRIVATE_CONFIG ?? {};
const COURSE_GPS_API = {
  provider: "osm",
  enabled: true,
  baseUrl: "https://overpass.kumi.systems/api/interpreter",
  endpointTemplate: "/courses/{courseId}",
  searchEndpointTemplate: "",
  apiKey: "",
  apiKeyHeader: "Authorization",
  apiKeyPrefix: "Key ",
  ...PRIVATE_CONFIG.courseApi,
};

const COURSE_OSM_CONFIG = {
  "abama-golf": {
    name: "Abama Golf",
  },
  "amarilla-golf": {
    name: "Amarilla Golf",
    osmElementType: "relation",
    osmElementId: 2586907,
  },
  "costa-adeje-los-lagos-9-hoyos": {
    name: "Campo Los Lagos",
    osmElementType: "way",
    osmElementId: 28530345,
  },
  "golf-costa-adeje": {
    name: "Golf Costa Adeje",
    osmElementType: "way",
    osmElementId: 28530316,
  },
  "golf-del-sur": {
    name: "Golf del Sur",
    osmElementType: "relation",
    osmElementId: 13107306,
  },
  "golf-las-americas": {
    name: "Golf las Américas",
    osmElementType: "relation",
    osmElementId: 4077462,
  },
};

const defaultPlayers = [
  {
    id: "jose-luis",
    name: "Jose Luis Bejar Gutierrez",
    license: "CP41742315",
    handicapIndex: 18.4,
    selected: true,
    validatedAt: "Local",
    removable: false,
  },
  {
    id: "javier",
    name: "Javier Bejar Navarrete",
    license: "CM00472449",
    handicapIndex: 28.6,
    selected: true,
    validatedAt: "Local",
    removable: false,
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
    exactGreens: true,
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
    exactGreens: true,
    sourceLabel: "Scorecard principal verificado + greens exactos fijados",
    sourceUrl: "https://amarillagolf.es/golf/campo-18-hoyos/",
    tee: "Blancas",
    slope: 125,
    courseRating: 71.1,
    holes: [
      [1, 5, 2, 461, 28.02789058381047, -16.619070502254914],
      [2, 4, 16, 297, 28.0267713593, -16.6191970423],
      [3, 3, 14, 159, 28.022995543778567, -16.619902939527886],
      [4, 4, 5, 348, 28.0193220828, -16.6191904194],
      [5, 3, 17, 127, 28.0197814349, -16.6180920599],
      [6, 5, 13, 458, 28.0232094635, -16.6184801153],
      [7, 4, 11, 325, 28.028487700423643, -16.618153362072956],
      [8, 3, 15, 101, 28.0277508572, -16.6145207862],
      [9, 4, 1, 318, 28.02507961450293, -16.617426094772952],
      [10, 5, 3, 444, 28.026011972612697, -16.61370768829099],
      [11, 4, 7, 338, 28.02209288009303, -16.613175745999996],
      [12, 4, 9, 356, 28.0212814032, -16.6136657254],
      [13, 4, 6, 354, 28.024960361693754, -16.61374264468197],
      [14, 4, 4, 379, 28.0274814239, -16.6133823638],
      [15, 3, 18, 121, 28.029902990015156, -16.617331051754917],
      [16, 4, 8, 325, 28.0357940788, -16.6151307755],
      [17, 3, 10, 144, 28.0340250643, -16.6168317722],
      [18, 5, 12, 424, 28.032136458604647, -16.618670902754925],
    ],
  },
  "golf-costa-adeje": {
    exactGreens: true,
    sourceLabel: "Tarjeta oficial + greens OSM fijados",
    sourceUrl: "https://www.golfcostaadeje.com/fr/championship-parcour/",
    tee: "59",
    slope: 134,
    courseRating: 71.9,
    holes: [
      [1, 5, 5, 477, 28.1178248, -16.7505347],
      [2, 3, 17, 113, 28.1147031, -16.7491981],
      [3, 5, 13, 512, 28.1150934, -16.7529082],
      [4, 4, 7, 406, 28.1121632, -16.7557716],
      [5, 3, 15, 124, 28.1112573, -16.7596827],
      [6, 4, 9, 324, 28.1109430, -16.7587481],
      [7, 3, 3, 147, 28.1145403, -16.7480525],
      [8, 5, 11, 482, 28.1134068, -16.7551673],
      [9, 4, 1, 372, 28.1099253, -16.7516826],
      [10, 3, 4, 198, 28.1115229, -16.7509271],
      [11, 5, 12, 461, 28.1126950, -16.7536085],
      [12, 4, 8, 317, 28.1131937, -16.7508847],
      [13, 5, 14, 467, 28.1125926, -16.7495020],
      [14, 3, 10, 141, 28.1190619, -16.7503999],
      [15, 4, 6, 364, 28.1188001, -16.7489359],
      [16, 3, 18, 154, 28.1164143, -16.7474671],
      [17, 4, 2, 401, 28.1155152, -16.7474618],
      [18, 5, 16, 470, 28.1184343, -16.7496812],
    ],
  },
  "buenavista-golf": {
    exactGreens: true,
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
    exactGreens: true,
    sourceLabel: "Tabla oficial verificada + greens exactos fijados",
    sourceUrl: "https://www.golfdelsur.es/el-campo/",
    tee: "Amarillas",
    slope: 129,
    courseRating: 71.7,
    holes: [
      [1, 4, 3, 329, 28.0379849617, -16.61083393],
      [2, 3, 9, 130, 28.0371392886, -16.6117892727],
      [3, 5, 6, 447, 28.0399512617, -16.6120338299],
      [4, 5, 2, 457, 28.0378224715, -16.6149559024],
      [5, 4, 5, 316, 28.0341973884, -16.6131713685],
      [6, 4, 1, 342, 28.033359969, -16.6123718759],
      [7, 4, 4, 342, 28.0362620016, -16.6136001334],
      [8, 4, 7, 236, 28.0383069593, -16.6136609593],
      [9, 3, 8, 170, 28.034519719500008, -16.61177785427296],
      [10, 4, 3, 327, 28.0342398503, -16.6065091309],
      [11, 3, 8, 134, 28.0357296755, -16.6062688789],
      [12, 5, 2, 472, 28.038560623520002, -16.607702995863104],
      [13, 4, 5, 244, 28.0406883965, -16.6085590968],
      [14, 5, 7, 477, 28.036350810997256, -16.607129955736895],
      [15, 4, 6, 320, 28.0384951981, -16.6093808053],
      [16, 4, 1, 326, 28.040347175, -16.6114767573],
      [17, 3, 9, 175, 28.038635056502407, -16.610780529799996],
      [18, 4, 4, 324, 28.035720243373227, -16.609785235963948],
    ],
  },
  "costa-adeje-los-lagos-9-hoyos": {
    sourceLabel: "Tarjeta oficial Los Lagos verificada",
    sourceUrl: "https://www.golfcostaadeje.com/fr/los-lagos-9-trous/",
    tee: "Amarillas",
    slope: 112,
    courseRating: 31.5,
    ratingPar: 33,
    holes: [
      [1, 4, 3, 258],
      [2, 5, 1, 456],
      [3, 4, 9, 271],
      [4, 3, 15, 81],
      [5, 4, 17, 324],
      [6, 3, 5, 160],
      [7, 3, 11, 118],
      [8, 4, 13, 292],
      [9, 3, 7, 168],
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
    exactGreens: true,
    sourceLabel: "Tarjeta oficial verificada",
    sourceUrl: "https://www.golflasamericas.com/fr/terrain-de-golf/",
    tee: "Amarilla",
    slope: 124,
    courseRating: 71.6,
    holes: [
      [1, 5, 7, 449, 28.0608267123, -16.7228874045],
      [2, 4, 3, 381, 28.0598912924, -16.7196511250],
      [3, 4, 5, 390, 28.0615926189, -16.7163504726],
      [4, 4, 15, 255, 28.0632016122, -16.7147034019],
      [5, 3, 9, 194, 28.0636733166, -16.7168952429],
      [6, 4, 1, 431, 28.0646183865, -16.7205294419],
      [7, 5, 13, 456, 28.0643788542, -16.7161223781],
      [8, 3, 17, 168, 28.0637192061, -16.7146838493],
      [9, 4, 11, 355, 28.0620169446, -16.7178694487],
      [10, 4, 4, 434, 28.0623265221, -16.7231136436],
      [11, 3, 18, 166, 28.0611603439, -16.7231972683],
      [12, 4, 6, 320, 28.0624947859, -16.7255976511],
      [13, 3, 16, 140, 28.0625494398, -16.7245773526],
      [14, 4, 14, 258, 28.0642471758, -16.7262347634],
      [15, 4, 2, 410, 28.0647508286, -16.7212288966],
      [16, 5, 12, 449, 28.0644663268, -16.7256898864],
      [17, 4, 8, 314, 28.0622563827, -16.7237886765],
      [18, 5, 10, 469, 28.0621777915, -16.7187734219],
    ],
  },
  "golf-los-palos": {
    exactGreens: true,
    sourceLabel: "Scorecard público verificado",
    sourceUrl: "https://www.golfpass.com/travel-advisor/courses/23437-los-palos-golf-center",
    tee: "Amarillas",
    slope: 89,
    courseRating: 27.2,
    ratingPar: 27,
    holes: [
      [1, 3, 6, 106, 28.0373725343, -16.6806916714],
      [2, 3, 8, 92, 28.0365765723, -16.6813593471],
      [3, 3, 3, 127, 28.0364470432, -16.6826680708],
      [4, 3, 1, 155, 28.0358381035, -16.6811135364],
      [5, 3, 2, 115, 28.0366058389, -16.6807633138],
      [6, 3, 5, 100, 28.0357814611, -16.6802655698],
      [7, 3, 7, 132, 28.0367930438, -16.6801272417],
      [8, 3, 9, 101, 28.0369097292, -16.6804475714],
      [9, 3, 4, 113, 28.0381923711, -16.6803508176],
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
    enabled: false,
    watchStarted: false,
    userPosition: null,
    distanceMeters: null,
    status: "idle",
  },
};

registerServiceWorker();
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
    osmQueryName: COURSE_OSM_CONFIG[name.toLowerCase().replaceAll(" ", "-")]?.name ?? name,
    osmElementType: COURSE_OSM_CONFIG[name.toLowerCase().replaceAll(" ", "-")]?.osmElementType ?? null,
    osmElementId: COURSE_OSM_CONFIG[name.toLowerCase().replaceAll(" ", "-")]?.osmElementId ?? null,
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
        config.exactGreens === true && Number.isFinite(greenLat) && Number.isFinite(greenLng)
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
        <div class="player-topline">
          <div class="player-main">
            <p class="player-name">${player.name.toUpperCase()}</p>
            <p class="player-meta">Licencia ${player.license || "Sin licencia"}</p>
          </div>
          ${player.removable ? `<button class="player-delete" type="button" data-remove-player="${player.id}" aria-label="Eliminar jugador">×</button>` : ""}
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
          ${course.name}
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
    const removeButton = event.target.closest("[data-remove-player]");
    if (removeButton) {
      removePlayer(removeButton.dataset.removePlayer);
      return;
    }
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
    startButton.textContent = "Entrando...";
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
  const gpsToggle = document.querySelector("#gps-toggle");
  updateGpsDistance(hole);

  document.querySelector("#current-hole-number").textContent = hole.number;
  document.querySelector("#current-hole-par").textContent = hole.par;
  document.querySelector("#current-hole-hcp").textContent = hole.strokeIndex;
  document.querySelector("#current-hole-yardage").textContent = state.gps.enabled ? formatGpsDistance(hole) : "";
  gpsToggle.dataset.enabled = state.gps.enabled ? "true" : "false";
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
            <span>STB</span>
            <strong>${holeStableford === null ? "-" : holeStableford}</strong>
          </div>
          <div class="score-stat">
            <span>Bruto</span>
            <strong>${holeScore === null ? "-" : holeScore}</strong>
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

  gpsToggle.addEventListener("click", async () => {
    await toggleGps();
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
  const course = getSelectedCourse();
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
    <div class="final-card">
      ${activePlayers
        .map((player) => {
          const data = getPlayerMatchData(player.id);
          const starCells = course.holes
            .map((hole) => {
              const stars = "*".repeat(strokeMarksForHole(data.courseHandicap, hole.strokeIndex));
              return `<span class="scorecard-cell">${stars || "-"}</span>`;
            })
            .join("");
          const grossCells = course.holes
            .map((hole) => `<span class="scorecard-cell">${data.scores[hole.number] ?? "-"}</span>`)
            .join("");
          const parCells = course.holes.map((hole) => `<span class="scorecard-cell">${hole.par}</span>`).join("");
          const hcpCells = course.holes.map((hole) => `<span class="scorecard-cell">${hole.strokeIndex}</span>`).join("");
          const stbCells = course.holes
            .map((hole) => {
              const points = data.holeStableford[hole.number];
              const colorClass =
                points == null ? "" : points <= 0 ? "stb-low" : points === 1 ? "stb-mid" : points <= 3 ? "stb-good" : "stb-hot";
              return `<span class="scorecard-cell ${colorClass}">${points == null ? "-" : points}</span>`;
            })
            .join("");
          return `
            <section class="final-player">
              <h3>${player.name.toUpperCase()}</h3>
              <div class="scorecard-grid">
                <div class="scorecard-row">
                  <span class="scorecard-label">H</span>
                  ${course.holes.map((hole) => `<span class="scorecard-cell">H${hole.number}</span>`).join("")}
                </div>
                <div class="scorecard-row">
                  <span class="scorecard-label">PAR</span>
                  ${parCells}
                </div>
                <div class="scorecard-row">
                  <span class="scorecard-label">HCP</span>
                  ${hcpCells}
                </div>
                <div class="scorecard-row">
                  <span class="scorecard-label">*</span>
                  ${starCells}
                </div>
                <div class="scorecard-row">
                  <span class="scorecard-label">BRU</span>
                  ${grossCells}
                </div>
                <div class="scorecard-row">
                  <span class="scorecard-label">STB</span>
                  ${stbCells}
                </div>
              </div>
            </section>
          `;
        })
        .join("")}
    </div>
    <button class="primary-action summary-download" type="button" data-download-summary>Descargar resultados</button>
  `;
}

function openSummaryModal(activePlayers) {
  summaryModalContent.innerHTML = "";
  renderSummary(summaryModalContent, activePlayers);
  summaryModalContent.querySelector("[data-download-summary]")?.addEventListener("click", () => {
    downloadResults(activePlayers);
  });
  summaryModal.classList.remove("hidden");
  summaryModal.setAttribute("aria-hidden", "false");
}

function closeSummaryModal() {
  summaryModal.classList.add("hidden");
  summaryModal.setAttribute("aria-hidden", "true");
}

function downloadResults(activePlayers) {
  const course = getSelectedCourse();
  const lines = [
    `${activePlayers.map((player) => player.name.split(" ")[0]).join(" vs ")} - ${course.name}`,
    "",
  ];

  activePlayers.forEach((player) => {
    const data = getPlayerMatchData(player.id);
    lines.push(player.name.toUpperCase());
    lines.push(`Stableford total: ${data.stableford}`);
    lines.push(`Bruto total: ${data.grossTotal}`);
    lines.push(
      `Hoyos: ${course.holes
        .map((hole) => {
          const score = data.scores[hole.number] ?? "-";
          const stb = data.holeStableford[hole.number];
          const stars = "*".repeat(shotsReceivedForHole(data.courseHandicap, hole.strokeIndex));
          return `H${hole.number} BRU ${score} STB ${stb == null ? "-" : stb} ${stars}`;
        })
        .join(" | ")}`,
    );
    lines.push("");
  });

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(`${course.name}-resultados`)}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
  state.gps.enabled = false;
  state.gps.distanceMeters = null;
  persistState();
  render();

  void ensureCourseGpsData(course).then((gpsReady) => {
    if (COURSE_GPS_API.enabled && !gpsReady) {
      console.warn(`No se encontraron datos externos para ${course.name}.`);
    }
    if (state.view === "game") {
      render();
    }
  });
}

async function toggleGps() {
  state.gps.enabled = !state.gps.enabled;
  state.gps.distanceMeters = null;
  if (!state.gps.enabled) {
    render();
    return;
  }
  startGeolocationWatch();
  await requestCurrentPosition();
  if (state.view === "game") {
    render();
  }
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
  state.gps.enabled = false;
  state.gps.distanceMeters = null;
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
  return Math.floor((playingHandicap - strokeIndex + 18) / 18);
}

function strokeMarksForHole(playingHandicap, strokeIndex) {
  if (playingHandicap <= 0) {
    return 0;
  }
  const baseStrokes = Math.floor(playingHandicap / 18);
  const remainder = playingHandicap % 18;
  return baseStrokes + (remainder > 0 && strokeIndex <= remainder ? 1 : 0);
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
          removable: false,
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
      removable: entry.removable ?? true,
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
  if (state.gps.watchStarted) {
    return;
  }
  if (!("geolocation" in navigator)) {
    state.gps.status = "unsupported";
    return;
  }

  state.gps.watchStarted = true;
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
  if (!state.gps.enabled) {
    return Promise.resolve(null);
  }
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
  if (!state.gps.enabled || !hole.greenCoordinates || !state.gps.userPosition) {
    state.gps.distanceMeters = null;
    return;
  }

  state.gps.distanceMeters = Math.round(
    haversineMeters(state.gps.userPosition.lat, state.gps.userPosition.lng, hole.greenCoordinates.lat, hole.greenCoordinates.lng),
  );
}

function formatGpsDistance(hole) {
  if (!state.gps.enabled) {
    return "";
  }
  if (state.gps.distanceMeters != null) {
    return `${state.gps.distanceMeters}m`;
  }
  if (state.gps.status === "denied") {
    return "GPS off";
  }
  if (state.gps.status === "unsupported") {
    return "Sin GPS";
  }
  return hole.greenCoordinates ? "..." : "--";
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
        removable: player.removable ?? false,
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
    removable: true,
  });
  persistState();
  render();
}

function removePlayer(playerId) {
  const index = players.findIndex((entry) => entry.id === playerId && entry.removable);
  if (index === -1) {
    return;
  }
  delete state.scores[playerId];
  players.splice(index, 1);
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
  return Boolean(isUsableGpsData(cached));
}

function getDistinctGreenCoordinateCount(holes) {
  if (!Array.isArray(holes)) {
    return 0;
  }
  return new Set(
    holes
      .filter((hole) => Number.isFinite(hole?.greenCoordinates?.lat) && Number.isFinite(hole?.greenCoordinates?.lng))
      .map((hole) => `${hole.greenCoordinates.lat.toFixed(6)},${hole.greenCoordinates.lng.toFixed(6)}`),
  ).size;
}

function isUsableGpsData(gpsData, holesCount = null) {
  if (!gpsData || !Array.isArray(gpsData.holes) || gpsData.holes.length === 0) {
    return false;
  }
  if (holesCount != null && gpsData.holes.length !== holesCount) {
    return false;
  }
  const distinctCoordinates = getDistinctGreenCoordinateCount(gpsData.holes);
  const requiredDistinct = Math.min(gpsData.holes.length, 3);
  return distinctCoordinates >= requiredDistinct;
}

async function ensureCourseGpsData(course) {
  if (!course.playable) {
    return false;
  }

  if (hasCachedGpsData(course.id)) {
    applyGpsDataToCourse(course, courseDataCache[course.id]);
    return true;
  }
  delete courseDataCache[course.id];
  localStorage.setItem(COURSE_DATA_CACHE_KEY, JSON.stringify(courseDataCache));

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
  let normalized = null;
  let mergedPayload = null;

  if (course.osmElementType && course.osmElementId) {
    const objectPayload = await fetchJsonViaProxy(
      new URL(`?data=${encodeURIComponent(buildOverpassObjectQuery(course))}`, COURSE_GPS_API.baseUrl).toString(),
    );
    mergedPayload = mergeOsmPayloads(mergedPayload, objectPayload);
  }

  const byNamePayload = await fetchJsonViaProxy(
    new URL(`?data=${encodeURIComponent(buildOverpassNamedCourseQuery(course))}`, COURSE_GPS_API.baseUrl).toString(),
  );
  mergedPayload = mergeOsmPayloads(mergedPayload, byNamePayload);
  normalized = normalizeOsmPayload(mergedPayload, course);

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

function mergeOsmPayloads(left, right) {
  const leftElements = Array.isArray(left?.elements) ? left.elements : [];
  const rightElements = Array.isArray(right?.elements) ? right.elements : [];
  if (leftElements.length === 0 && rightElements.length === 0) {
    return null;
  }

  const seen = new Set();
  const elements = [...leftElements, ...rightElements].filter((entry) => {
    const key = `${entry.type}:${entry.id}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  return { elements };
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

  return isUsableGpsData({ holes: normalizedHoles }, course.holesCount) ? { holes: normalizedHoles } : null;
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

  const normalized = {
    providerCourseId: match.id ?? null,
    tee,
    holes: tee.holes.map((hole, index) => ({
      number: index + 1,
      par: Number(hole.par),
      handicap: Number(hole.handicap),
      meters: Number.isFinite(Number(hole.meters)) ? Number(hole.meters) : yardsToMeters(Number(hole.yardage)),
    })),
  };
  return isUsableGpsData(normalized, course.holesCount) ? normalized : null;
}

function buildOverpassCourseQuery(course) {
  return (course.osmElementType && course.osmElementId ? buildOverpassObjectQuery(course) : buildOverpassNamedCourseQuery(course)).trim();
}

function buildOverpassObjectQuery(course) {
  if (course.osmElementType && course.osmElementId) {
    const elementKeyword =
      course.osmElementType === "relation" ? "rel" : course.osmElementType === "way" ? "way" : course.osmElementType === "node" ? "node" : null;
    if (!elementKeyword) {
      return "";
    }
    return `
[out:json][timeout:${OVERPASS_TIMEOUT_SECONDS}];
${elementKeyword}(${course.osmElementId});
map_to_area;
(
  node["golf"~"^(hole|green|pin|tee)$"](area);
  way["golf"~"^(hole|green|pin|tee)$"](area);
  relation["golf"~"^(hole|green|pin|tee)$"](area);
);
out geom center tags qt;
    `.trim();
  }

  return "";
}

function buildOverpassNamedCourseQuery(course) {
  const escapedName = String(course.osmQueryName || course.name).replaceAll('"', '\\"');
  return `
[out:json][timeout:${OVERPASS_TIMEOUT_SECONDS}];
nwr["leisure"="golf_course"]["name"="${escapedName}"]->.course;
.course map_to_area -> .courseArea;
(
  node["golf"~"^(hole|green|pin|tee)$"](area.courseArea);
  way["golf"~"^(hole|green|pin|tee)$"](area.courseArea);
  relation["golf"~"^(hole|green|pin|tee)$"](area.courseArea);
);
out geom center tags qt;
  `.trim();
}

function buildOverpassBboxQuery(boundingBox) {
  return `
[out:json][timeout:${OVERPASS_TIMEOUT_SECONDS}];
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
  const explicitGreens = [];

  elements.forEach((entry) => {
    const lat = getLat(entry);
    const lng = getLng(entry);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }

    const golfType = entry.tags?.golf;
    const numberedRef = golfType === "hole" && entry.tags?.ref ? Number(entry.tags.ref) : extractHoleNumberFromTags(entry.tags);

    if (["green", "pin"].includes(golfType)) {
      if (Number.isInteger(numberedRef)) {
        explicitGreens.push({ number: numberedRef, lat, lng, kind: golfType });
      }
    }
  });

  const exactMap = buildExactGreenMap(explicitGreens, course.holesCount);
  if (exactMap) {
    const normalized = {
      providerCourseId: `osm:${course.id}`,
      holes: exactMap.map((entry) => ({
        number: entry.number,
        greenCoordinates: entry.greenCoordinates,
      })),
    };
    return isUsableGpsData(normalized, course.holesCount) ? normalized : null;
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
  const orderedCourseNumbers = Array.from({ length: holesCount }, (_, index) => index + 1);
  const missingNumbers = orderedCourseNumbers.filter((number) => !allNumbers.has(number));
  if (missingNumbers.length > 1) {
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
    if (missingNumbers.length === 0) {
      return result;
    }
    if (looseGreens.length !== 1) {
      return null;
    }
    return [
      ...result,
      {
        number: missingNumbers[0],
        greenCoordinates: { lat: looseGreens[0].lat, lng: looseGreens[0].lng },
      },
    ].sort((left, right) => left.number - right.number);
  }
  const extraLooseGreens = missingNumbers.length;
  if (looseGreens.length < remainingRefs.length + extraLooseGreens) {
    return null;
  }

  const assignment = findOptimalGreenAssignment(remainingRefs, looseGreens, extraLooseGreens);
  if (!assignment) {
    return null;
  }
  const assignedByNumber = new Map(assignment.assigned.map((entry) => [entry.number, entry.greenCoordinates]));
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

  if (missingNumbers.length === 1) {
    if (assignment.leftoverGreens.length !== 1) {
      return null;
    }
    merged.push({
      number: missingNumbers[0],
      greenCoordinates: {
        lat: assignment.leftoverGreens[0].lat,
        lng: assignment.leftoverGreens[0].lng,
      },
    });
  }

  return merged.sort((left, right) => left.number - right.number);
}

function findOptimalGreenAssignment(referencePoints, candidateGreens, allowedExtraGreens = 0) {
  if (!Array.isArray(referencePoints) || !Array.isArray(candidateGreens) || referencePoints.length === 0) {
    return null;
  }
  if (candidateGreens.length < referencePoints.length || candidateGreens.length > referencePoints.length + allowedExtraGreens) {
    return null;
  }
  if (candidateGreens.length > 20) {
    return null;
  }

  const distanceMatrix = referencePoints.map((reference) =>
    candidateGreens.map((green) => haversineMeters(reference.lat, reference.lng, green.lat, green.lng)),
  );
  const memo = new Map();

  function solve(referenceIndex, usedMask) {
    if (referenceIndex === referencePoints.length) {
      return { totalDistance: 0, pickedIndices: [] };
    }

    const key = `${referenceIndex}:${usedMask}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    let best = null;
    for (let greenIndex = 0; greenIndex < candidateGreens.length; greenIndex += 1) {
      if (usedMask & (1 << greenIndex)) {
        continue;
      }
      const remainder = solve(referenceIndex + 1, usedMask | (1 << greenIndex));
      if (!remainder) {
        continue;
      }
      const totalDistance = distanceMatrix[referenceIndex][greenIndex] + remainder.totalDistance;
      if (!best || totalDistance < best.totalDistance) {
        best = {
          totalDistance,
          pickedIndices: [greenIndex, ...remainder.pickedIndices],
        };
      }
    }

    memo.set(key, best);
    return best;
  }

  const best = solve(0, 0);
  if (!best || best.pickedIndices.length !== referencePoints.length) {
    return null;
  }

  const picked = new Set(best.pickedIndices);
  return {
    assigned: referencePoints.map((reference, index) => {
      const green = candidateGreens[best.pickedIndices[index]];
      return {
        number: reference.number,
        greenCoordinates: {
          lat: green.lat,
          lng: green.lng,
        },
      };
    }),
    leftoverGreens: candidateGreens.filter((_, index) => !picked.has(index)),
  };
}

function dedupeNumberedPoints(entries) {
  const ordered = [...entries].sort((left, right) => {
    const leftPriority = left.kind === "pin" ? 0 : 1;
    const rightPriority = right.kind === "pin" ? 0 : 1;
    return leftPriority - rightPriority;
  });
  const seen = new Set();
  return ordered.filter((entry) => {
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
      const html = (await fetchPageText(RFEG_PROXY_PAGE_URL)) || (await fetchPageText(RFEG_HANDICAP_URL));
      const match = html?.match(/App\.page\.init\("jugar",\s*'([^']+)'/);
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

async function fetchPageText(url) {
  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      return "";
    }
    return await response.text();
  } catch {
    return "";
  }
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
