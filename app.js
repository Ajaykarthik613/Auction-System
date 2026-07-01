// ─────────────────────────────────────────────────────
//  app.js  —  KPL Auction Portal (Complete Clean Build)
// ─────────────────────────────────────────────────────

// ── PLAYER NAMES ──────────────────────────────────────
const RAW_NAMES = [
  "Arunkumar", "Muthukumar.E", "Praveen Mantapam", "Selvi", "Jayaraman.S", "Anandhi.M",
  "Senthilkumar.V", "Sathanu J", "Raja Murukesh.D", "Srivathsan.S", "Shenba Vignesh",
  "Senthil Kannan S", "Sakthi.D", "Sridharan.D", "Parthasarathi N", "Vigneshwaran P",
  "Ramkumar V", "Durairaj S", "Reha J", "Perumal Karuppanna", "Shalini Murugan",
  "Suresh Kumar Veluswamy", "Roopesh Kumar Gooty", "Sangeetha Priya", "Suhail Shadab",
  "Sumeetha", "Khaja Masthan", "Shajakhan Ansari", "Venkata Sandeep", "Hari Prasad",
  "Palanikumar Subas", "Santhosh Kumar S", "Sruthi C K", "Pratap Kumar",
  "Haripragatesh Subramanian", "Dhanush Shanker Subramani", "Dani Allwinson Davidson",
  "Muhesh Kumar Nagarajan", "Hamsavarthanan Devanathan", "Harish Chidambaram",
  "Meenakshi Chandrasekaran", "Praveenkumar Moorthi", "Sudarshan Nagaraj",
  "Naveen K K Ravi", "Aswin Sivakumar", "Vinush Sadayappan", "Monica Ram Ganesh",
  "Dharanidharan Raja", "Sampath Kumar Jayaraj", "Priyanka Nagarajan", "Krishna Priya M",
  "Tejashree Chinnasamy", "Seingouttavane P", "Nandhini Balasubramaniyan",
  "Mohammed Imthiyas", "Tamilvendhan Mani", "Leonard Dsouza", "Samuel Jebin Devasirvatham",
  "Lakshitha Padmanaban", "Sridhar Raj Selvarajan", "Sathya Moorthy K", "Kishor Kumar R",
  "Kavyaanjali R", "Kaviyadevi M", "Sathyan Kesavan", "Imran Naseer M", "Ajay Munirajappa",
  "Balamurugan Sorimuthu", "Tanushree Mehra", "Harini Ramesh", "Selvaraj Muthusamy",
  "Tharani K Velusamy", "Rubyland Victorraj", "Alamelu Chidambaram",
  "Ajay Sankar Thrikkasserry", "Supriya Phadke", "Snehanjali Anguselvan", "Dinesh Ganesan",
  "Naveenshankar Sivashankar", "Jaivikram A Soundararajan", "Ajaykarthik Dharmalingam",
  "Arun Prasanth Sakthivel", "Subhash Rajasekaran", "Dhivyabharathy Jayakumar",
  "Akshaya C Venugopal", "Bharathsree Selvaraj", "Sadhanand Senthilkumar S", "Arthi Ashokkumar",
  "Deepthee Saravanan", "Sanjaykar Chinnasamy", "Sarath Shoban Babu", "Sandhiya Sivakumar",
  "Thowfic Asmi Hakkim", "Deepakprasath Marichamy", "Karan Balamurugan",
  "Mohamudha Shifa Thahsina Jasimudeen", "Janisha Flavy Florina Josephwilson",
  "Elakkiya Dhinakaran", "Rithanya Rangasamy Radhamani", "Yuvarani S Kannan",
  "Bhavana Shree Balavenkatesh Sarala", "Devika Selvam", "Inbaarunraj Duraisamy",
  "Sasmitha Kathiravan", "Abinila Murugesan", "Sophia Infant Soosai Rajendran",
  "Vaishnavi Ayyappan", "Pranav Shaji", "Abhishek Kumar", "Megha Vijayan",
  "Mohanraj Krishnasamy", "Manjula Mani", "Prajwal Sangamesh Motagi", "Mounishka Vellingirisamy",
  "Girish Narayanan Kutty", "Jecintha Franchana Rajan", "Dineshkumar Venugopal",
  "Arrnesh Senthilkumar", "Kiruthiga Ramanathan Sakthi", "Ashwini Kanagaraj",
  "Arundhati Arun Hagaragi", "Amit Surendra Sharma", "Sudharsan Gopal", "Sonu Singh",
  "Kamal Namani", "Vinodh Kumar Jangid", "Tarun Sachdeva"
];

// ── TEAM DEFAULTS ──────────────────────────────────────
const DEFAULT_CRICKET_TEAMS = {
  PBH: { name: "Phoenix Hawks", emoji: "🦅", color: "#ff5e3a", purse: 120 },
  SSK: { name: "Super Kings", emoji: "🦁", color: "#ffb700", purse: 120 },
  TSS: { name: "Thunder Storms", emoji: "⚡", color: "#ba55d3", purse: 120 },
  BBL: { name: "Blue Blasters", emoji: "🌀", color: "#00d2ff", purse: 120 },
  NGK: { name: "Ninja Knights", emoji: "⚔️", color: "#00ff87", purse: 120 }
};
const DEFAULT_SMASHFEST_TEAMS = {
  RK: { name: "Rally Kings", emoji: "👑", color: "#ffd700", purse: 200 },
  RB: { name: "Racquet Blasters", emoji: "🚀", color: "#00f0ff", purse: 200 },
  SS: { name: "Smashing Stars", emoji: "⭐", color: "#ec008c", purse: 200 },
  SH: { name: "Shuttle Heroes", emoji: "🛡️", color: "#00ff87", purse: 200 }
};

// ── ROUND PRIORITY ─────────────────────────────────────
const ROUND_PRIORITY = ["Pro", "Intermediate", "Beginner"];
const AUCTION_LIMITS = {
  teamBudget: 120.0,
  captainPrice: 20.0,
  categoryMaxBid: { Pro: 8.0, Intermediate: 5.0, Beginner: 3.0 },
  basePrices: { Pro: 12.0, Intermediate: 7.0, Beginner: 3.0 }
};

// ── HELPERS ────────────────────────────────────────────
function formatPurse(lakhs) {
  if (lakhs >= 100) {
    const cr = lakhs / 100;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  }
  return `₹${lakhs.toFixed(1).replace(/\.0$/, "")}L`;
}

function teamTreeEscape(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function findRealEmpId(name) {
  const map = window.IMAGE_MAP_OVERRIDE || {};
  if (!name) return null;
  const lowerName = name.toLowerCase();
  const cleanName = lowerName.replace(/[^a-z0-9]/g, "");
  const filenames = Object.entries(map);

  const getCleanFilename = (fn) => {
    let base = fn.toLowerCase();
    while (base.endsWith('.png') || base.endsWith('.jpg') || base.endsWith('.jpeg') || base.endsWith('.jfif') || base.endsWith('.pdf')) {
      base = base.substring(0, base.lastIndexOf('.'));
    }
    return base.replace(/^k[- ]?\d+/, "").replace(/[^a-z0-9]/g, "");
  };

  // 1. Hardcoded custom rules for spelling exceptions
  if (lowerName.includes("balamurugan") || lowerName.includes("balamurgan")) {
    const entry = filenames.find(([empId, fn]) => fn.toLowerCase().includes("balamurgan"));
    if (entry) return entry[0];
  }
  if (lowerName.includes("shajakhan") || lowerName.includes("shahja")) {
    const entry = filenames.find(([empId, fn]) => fn.toLowerCase().includes("shahja"));
    if (entry) return entry[0];
  }
  if (lowerName.includes("inbaarunraj")) {
    const entry = filenames.find(([empId, fn]) => fn.toLowerCase().includes("inbaarunraj"));
    if (entry) return entry[0];
  }
  if (lowerName.includes("hamsavarthanan") || lowerName.includes("hamsavarathanan")) {
    const entry = filenames.find(([empId, fn]) => fn.toLowerCase().includes("hamsavarathanan") || fn.toLowerCase().includes("hamsavarthanan"));
    if (entry) return entry[0];
  }
  if (lowerName.includes("aswin") || lowerName.includes("ashwin")) {
    const entry = filenames.find(([empId, fn]) => fn.toLowerCase().includes("ashwin") || fn.toLowerCase().includes("aswin"));
    if (entry) return entry[0];
  }
  if (lowerName.includes("arthi")) {
    const entry = filenames.find(([empId, fn]) => fn.toLowerCase().includes("arthi"));
    if (entry) return entry[0];
  }

  // 2. Exact or substring match on clean names (without extension)
  let matchedEntry = filenames.find(([empId, filename]) => {
    const cleanFn = getCleanFilename(filename);
    return cleanFn.includes(cleanName) || cleanName.includes(cleanFn);
  });
  if (matchedEntry) return matchedEntry[0];

  // 3. Split name parts match (all parts >= 3 chars must match somewhere in the filename)
  const nameParts = lowerName.split(/[\s\.]+/).filter(part => part.length >= 3);
  if (nameParts.length > 0) {
    matchedEntry = filenames.find(([empId, filename]) => {
      const cleanFn = getCleanFilename(filename);
      return nameParts.every(part => cleanFn.includes(part));
    });
    if (matchedEntry) return matchedEntry[0];
  }

  // 4. Match by first name + first letter of second name
  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const secondInitial = nameParts[1][0];
    matchedEntry = filenames.find(([empId, filename]) => {
      const cleanFn = getCleanFilename(filename);
      return cleanFn.startsWith(firstName) && cleanFn.includes(secondInitial);
    });
    if (matchedEntry) return matchedEntry[0];
  }

  // 5. Match by exact first name match (e.g. MOHANRAJ should match "mohanraj" exact file over "mohanraj_rangasamy")
  const firstName = nameParts[0];
  if (firstName && firstName.length >= 4) {
    // Try exact clean filename match first
    matchedEntry = filenames.find(([empId, filename]) => {
      const cleanFn = getCleanFilename(filename);
      return cleanFn === firstName;
    });
    if (matchedEntry) return matchedEntry[0];

    // Otherwise match unique substring
    const matches = filenames.filter(([empId, filename]) => {
      const cleanFn = getCleanFilename(filename);
      return cleanFn.includes(firstName);
    });
    if (matches.length === 1) {
      return matches[0][0];
    }
  }

  return null;
}

function getEmpIdCandidates(empId) {
  const candidates = new Set();
  if (empId === null || empId === undefined || empId === "") return [];

  const raw = String(empId).trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!raw) return [];

  candidates.add(raw);
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits) {
    candidates.add(digits);
    candidates.add(`K${digits}`);
    const noLeadingZeros = digits.replace(/^0+/, "");
    if (noLeadingZeros) {
      candidates.add(noLeadingZeros);
      candidates.add(`K${noLeadingZeros}`);
    }
  }

  if (raw.startsWith("SF")) {
    const num = parseInt(raw.substring(2), 10);
    if (!isNaN(num)) {
      candidates.add(`K${num - 1000}`);
    }
  }

  if (raw.startsWith("K")) {
    const num = raw.substring(1).replace(/^0+/, "");
    if (num) {
      candidates.add(num);
      candidates.add(`K${num}`);
    }
  }

  return Array.from(candidates);
}

function getPhoto(name, empId) {
  const map = window.IMAGE_MAP_OVERRIDE || {};

  // 1. Try matching by Emp ID first (important for Excel-imported rosters)
  const idCandidates = getEmpIdCandidates(empId);
  for (const candidate of idCandidates) {
    if (map[candidate]) return map[candidate];
    if (map[candidate.replace(/^K/, "")]) return map[candidate.replace(/^K/, "")];

    for (const [key, value] of Object.entries(map)) {
      const keyCandidates = getEmpIdCandidates(key);
      const valueCandidates = getEmpIdCandidates(value);
      if (keyCandidates.includes(candidate) || valueCandidates.includes(candidate)) {
        return value;
      }
    }
  }

  // 2. Try resolving the real Employee ID by name from the map
  const realId = findRealEmpId(name);
  if (realId && map[realId]) {
    return map[realId];
  }

  // 3. Fallback to hardcoded name-based rule mapping (matching original getPhoto exact filenames)
  if (name) {
    const l = name.toLowerCase();
    if (l.includes("arun") && !l.includes("inbaarunraj")) return "K1244_Arun.pdf";
    if (l.includes("praveen")) return "K1002_Praveen_Mantapam.png";
    if (l.includes("raja") && l.includes("murukesh")) return "K1038_Rajamurukesh_Dhandapani.jpeg";
    if (l.includes("sampath")) return "K1171_Sampath.jpeg";
    if (l.includes("imran")) return "K1203_Imran Naseer Mohamed Ibrahim.jpg";
    if (l.includes("ajaykarthik")) return "K1243_Ajaykarthik.jpeg";
    if (l.includes("dhanush")) return "K1131_Dhanush Shankar.jpg";
    if (l.includes("vinush")) return "K1164_vinush.jpg";
    if (l.includes("balamurugan")) return "K1212_Balamurgan.jpg";
    if (l.includes("dani")) return "K1134_Dani Allwinson_D.JPG";
    if (l.includes("parthasarathi")) return "K1053_Parthasarathi_Nagarajan.png";
    if (l.includes("aswin") || l.includes("ashwin")) return "K1162_Ashwin.jpg";
    if (l.includes("ramkumar")) return "K1056_Ramkumar-removebg-preview.png";
    if (l.includes("muhesh")) return "K1137_Muhesh Kumar.JPG";
    if (l.includes("sathya") && !l.includes("sathyan")) return "K1197_Sathya Moorthy Kanthapalam.jpg";
    if (l.includes("subhash") || l.includes("subash")) return "K1245_Subash.JPG";
    if (l.includes("muthukumar")) return "K1001_Muthukumar_Palanisamy.png";
    if (l.includes("senthilkumar")) return "K1026_Senthilkumar Viswanathan.png";
    if (l.includes("leonard")) return "K1191_leonard.jfif";
    if (l.includes("rubyland")) return "K1222_Rubyland.jpeg";
    if (l.includes("sathyan")) return "K1201_Sathyan Kesavan.jpg";
    if (l.includes("sridhar")) return "K1196_Sridhar Raj Selvarajan.jpg";
    if (l.includes("imthiyas")) return "K1186_Mohammed Imthiyas.JPG";
    if (l.includes("dharanidharan")) return "K1168_Dharanidharan.jpg";
    if (l.includes("durairaj")) return "K1059_Durairaj.jpg";
    if (l.includes("sridharan")) return "K1046_Sridharan.png";
    if (l.includes("sudarshan")) return "K1153_Sudarshan.jpeg";
    if (l.includes("naveen")) return "K1158_Naveen.jpg";
  }

  return "default.png";
}

function getLevelInfo(idx) {
  const r = idx % 3;
  const prices = (State.config && State.config.basePrices) ? State.config.basePrices : AUCTION_LIMITS.basePrices;
  if (r === 0) return { level: "Beginner", basePrice: prices.Beginner };
  if (r === 1) return { level: "Intermediate", basePrice: prices.Intermediate };
  return { level: "Pro", basePrice: prices.Pro };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateLotteryNums(count) {
  return shuffle(Array.from({ length: count }, (_, i) => i + 1));
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const n = parseInt(hex, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function getCategoryBidLimit(level) {
  const normalized = normalizeLevel(level);
  const configured = State.config?.categoryMaxBid?.[normalized];
  if (configured !== undefined && configured !== null && configured !== "") return Number(configured);
  return AUCTION_LIMITS.categoryMaxBid[normalized] || AUCTION_LIMITS.categoryMaxBid.Beginner;
}

function getLevelBasePrice(level) {
  const normalized = normalizeLevel(level);
  const configured = State.config?.basePrices?.[normalized];
  if (configured !== undefined && configured !== null && configured !== "") return Number(configured);
  return AUCTION_LIMITS.basePrices[normalized] || AUCTION_LIMITS.basePrices.Beginner;
}

function isSmashFestTournament() {
  return State.tournament === "smashfest";
}

function getSmashFestRequirements() {
  return {
    minPlayers: 16,
    maxPlayers: 16,
    maxProPlayers: 2,
    male: { min: 10, max: 11 },
    female: { min: 5, max: 6 },
    maleLevels: {
      Pro: { min: 2, max: 2 },
      Intermediate: { min: 5, max: 5 },
      Beginner: { min: 3, max: 4 }
    },
    femaleLevels: {
      Pro: { min: 0, max: 0 },
      Intermediate: { min: 1, max: 2 },
      Beginner: { min: 4, max: 4 }
    },
    intermediateGenderSplit: {
      male: { min: 5, max: 5 },
      female: { min: 1, max: 2 }
    },
    beginnerGenderSplit: {
      male: { min: 3, max: 4 },
      female: { min: 4, max: 4 },
      maleFourPlayerTeams: 1,
      femaleFourPlayerTeams: 999
    },
    maxTeamsWithFiveFemales: 1
  };
}

function getTeamBudget(teamCode) {
  const teamInfo = State.teams[teamCode] || {};
  if (isSmashFestTournament()) {
    return teamInfo.purse !== undefined ? teamInfo.purse : (State.config.maxBudget || 200);
  }
  return teamInfo.purse !== undefined ? teamInfo.purse : (State.config.maxBudget || AUCTION_LIMITS.teamBudget);
}

function getTeamSpent(teamCode) {
  return State.players.filter(p => p.teamName === teamCode && p.isSold).reduce((sum, p) => sum + (Number(p.price) || 0), 0);
}

function calculateReserveBudget(teamCode, hypotheticalPlayer = null) {
  const basePrices = (State.config && State.config.basePrices) ? State.config.basePrices : AUCTION_LIMITS.basePrices;
  if (!basePrices) return { error: true, errorMessage: "Mandatory configuration missing: Base prices must be defined." };

  const currentTeamPlayers = State.players.filter(p => p.teamName === teamCode && p.isSold);
  if (hypotheticalPlayer) {
    currentTeamPlayers.push(hypotheticalPlayer);
  }

  if (isSmashFestTournament()) {
    const rules = getSmashFestRequirements();
    const counts = {
      male: currentTeamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male").length,
      female: currentTeamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female").length,
      malePro: currentTeamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male" && normalizeLevel(p.level) === "Pro").length,
      maleIntermediate: currentTeamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male" && normalizeLevel(p.level) === "Intermediate").length,
      maleBeginner: currentTeamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male" && normalizeLevel(p.level) === "Beginner").length,
      femalePro: currentTeamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female" && normalizeLevel(p.level) === "Pro").length,
      femaleIntermediate: currentTeamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female" && normalizeLevel(p.level) === "Intermediate").length,
      femaleBeginner: currentTeamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female" && normalizeLevel(p.level) === "Beginner").length
    };

    const reserveBreakdown = {};
    let reserveBudget = 0;

    const addRequiredBucket = (label, required, current, priceKey) => {
      const need = Math.max(0, required - current);
      if (need > 0) {
        reserveBreakdown[label] = need;
        reserveBudget += need * basePrices[priceKey];
      }
    };

    addRequiredBucket("malePro", rules.maleLevels.Pro.min, counts.malePro, "Pro");
    addRequiredBucket("maleIntermediate", rules.maleLevels.Intermediate.min, counts.maleIntermediate, "Intermediate");
    addRequiredBucket("maleBeginner", rules.maleLevels.Beginner.min, counts.maleBeginner, "Beginner");
    addRequiredBucket("femalePro", rules.femaleLevels.Pro.min, counts.femalePro, "Pro");
    addRequiredBucket("femaleIntermediate", rules.femaleLevels.Intermediate.min, counts.femaleIntermediate, "Intermediate");
    addRequiredBucket("femaleBeginner", rules.femaleLevels.Beginner.min, counts.femaleBeginner, "Beginner");

    const remainingOverall = Math.max(0, rules.minPlayers - currentTeamPlayers.length);
    return {
      reserveBudget,
      remainingOverall,
      breakdown: { ...reserveBreakdown, remainingOverall }
    };
  }

  const configService = new TournamentConfigService();
  const config = configService.getConfig();
  if (!basePrices) return { error: true, errorMessage: "Mandatory configuration missing: Base prices must be defined." };

  const currentPro = currentTeamPlayers.filter(p => p.level === "Pro").length;
  const currentInter = currentTeamPlayers.filter(p => p.level === "Intermediate").length;
  const currentBeg = currentTeamPlayers.filter(p => p.level === "Beginner").length;

  const minPro = config.categories?.Advanced?.min;
  const minInter = config.categories?.Intermediate?.min;
  const minBeg = config.categories?.Beginner?.min;
  if (minPro === undefined || minInter === undefined || minBeg === undefined) {
    return { error: true, errorMessage: "Mandatory configuration missing: Minimum category counts must be defined." };
  }

  const remPro = Math.max(0, minPro - currentPro);
  const remInter = Math.max(0, minInter - currentInter);
  const remBeg = Math.max(0, minBeg - currentBeg);

  const requiredCategorySlots = remPro + remInter + remBeg;
  const minSquadSize = config.minPlayersPerTeam;
  if (minSquadSize === undefined) return { error: true, errorMessage: "Mandatory configuration missing: minPlayersPerTeam must be defined." };
  const remainingOverall = Math.max(0, minSquadSize - currentTeamPlayers.length);

  const flexSlots = Math.max(0, remainingOverall - requiredCategorySlots);
  const flexPrice = Math.min(basePrices.Pro, basePrices.Intermediate, basePrices.Beginner);

  const reserveBudget = (remPro * basePrices.Pro) +
                        (remInter * basePrices.Intermediate) +
                        (remBeg * basePrices.Beginner) +
                        (flexSlots * flexPrice);

  return {
    reserveBudget,
    remainingOverall,
    breakdown: { remPro, remInter, remBeg, flexSlots, flexPrice }
  };
}

const AuctionValidator = {
  validateAll(teamCode, bidAmount) {
    const player = State.selectedPlayer;
    if (!player) return { valid: false, code: "NO_PLAYER", message: "No active player selected." };
    if (player.isSold) return { valid: false, code: "PLAYER_SOLD", message: "Player is already sold." };
    if (!teamCode) return { valid: false, code: "NO_TEAM", message: "No team selected for this bid." };
    if (!State.teams[teamCode]) return { valid: false, code: "INVALID_TEAM", message: "Invalid team selected." };
    if (bidAmount <= 0) return { valid: false, code: "INVALID_BID", message: "Bid amount must be greater than zero." };

    const teamPlayers = State.players.filter(p => p.teamName === teamCode && p.isSold);
    const spent = getTeamSpent(teamCode);
    const maxBudget = getTeamBudget(teamCode);
    const remainingPurse = maxBudget - spent;
    
    if (bidAmount > remainingPurse) {
      return { valid: false, code: "INSUFFICIENT_FUNDS", message: `${State.teams[teamCode].name || teamCode} only has ₹${remainingPurse.toFixed(2)} Lakhs left - insufficient funds!` };
    }

    if (isSmashFestTournament()) {
      const rules = getSmashFestRequirements();
      const currentMale = teamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male").length;
      const currentFemale = teamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female").length;
      const currentSize = teamPlayers.length;
      const currentPro = teamPlayers.filter(p => normalizeLevel(p.level) === "Pro").length;
      const currentIntermediateMale = teamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male" && normalizeLevel(p.level) === "Intermediate").length;
      const currentIntermediateFemale = teamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female" && normalizeLevel(p.level) === "Intermediate").length;
      const currentBeginnerMale = teamPlayers.filter(p => (p.gender || "Male").toLowerCase() === "male" && normalizeLevel(p.level) === "Beginner").length;
      const currentBeginnerFemale = teamPlayers.filter(p => (p.gender || "Female").toLowerCase() === "female" && normalizeLevel(p.level) === "Beginner").length;

      if (currentSize + 1 > rules.maxPlayers) {
        return { valid: false, code: "TEAM_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Maximum squad size of ${rules.maxPlayers} players reached.` };
      }

      const nextGender = (player.gender || "Male").toLowerCase() === "female" ? "female" : "male";
      const nextMale = nextGender === "male" ? currentMale + 1 : currentMale;
      const nextFemale = nextGender === "female" ? currentFemale + 1 : currentFemale;
      if (nextMale > rules.male.max || nextFemale > rules.female.max) {
        return { valid: false, code: "GENDER_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Gender composition limit reached for this team.` };
      }

      const projectedSize = currentSize + 1;
      if (projectedSize === rules.maxPlayers) {
        const isValidFinalComposition = (nextMale === 10 && nextFemale === 6) || (nextMale === 11 && nextFemale === 5);
        if (!isValidFinalComposition) {
          return { valid: false, code: "GENDER_COMPOSITION_INVALID", message: `${State.teams[teamCode].name || teamCode}: Final squad must be 10 men + 6 women or 11 men + 5 women.` };
        }
      }

      if (nextGender === "female" && nextFemale === 5) {
        const teamsAtFiveFemales = Object.keys(State.teams).filter(code => {
          if (code === teamCode) return false;
          const count = State.players.filter(p => p.isSold && p.teamName === code && (p.gender || "Female").toLowerCase() === "female").length;
          return count === 5;
        }).length;

        if (teamsAtFiveFemales >= rules.maxTeamsWithFiveFemales) {
          return { valid: false, code: "FEMALE_FIVE_TEAM_LIMIT", message: `${State.teams[teamCode].name || teamCode}: Only one team can finish with 5 female players.` };
        }
      }

      const nextLevel = normalizeLevel(player.level);
      if (nextLevel === "Pro" && currentPro + 1 > rules.maxProPlayers) {
        return { valid: false, code: "PRO_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Maximum Pro/Advanced players per team is ${rules.maxProPlayers}.` };
      }

      if (nextLevel === "Intermediate") {
        const nextIntermediateMale = nextGender === "male" ? currentIntermediateMale + 1 : currentIntermediateMale;
        const nextIntermediateFemale = nextGender === "female" ? currentIntermediateFemale + 1 : currentIntermediateFemale;

        if (nextGender === "male" && nextIntermediateMale > rules.intermediateGenderSplit.male.max) {
          return { valid: false, code: "INTERMEDIATE_MALE_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Intermediate male quota is limited to ${rules.intermediateGenderSplit.male.max} per team.` };
        }

        if (nextGender === "female" && (nextIntermediateFemale < rules.intermediateGenderSplit.female.min || nextIntermediateFemale > rules.intermediateGenderSplit.female.max)) {
          return { valid: false, code: "INTERMEDIATE_FEMALE_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Intermediate female quota must stay between ${rules.intermediateGenderSplit.female.min} and ${rules.intermediateGenderSplit.female.max} per team.` };
        }
      }

      if (nextLevel === "Beginner") {
        const nextBeginnerMale = nextGender === "male" ? currentBeginnerMale + 1 : currentBeginnerMale;
        const nextBeginnerFemale = nextGender === "female" ? currentBeginnerFemale + 1 : currentBeginnerFemale;

        if (nextGender === "male") {
          if (nextBeginnerMale > rules.beginnerGenderSplit.male.max) {
            return { valid: false, code: "BEGINNER_MALE_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Beginner male quota cannot exceed ${rules.beginnerGenderSplit.male.max} per team.` };
          }

          if (nextBeginnerMale === 4) {
            const teamsAtFour = Object.keys(State.teams).filter(code => {
              if (code === teamCode) return false;
              const count = State.players.filter(p => p.isSold && p.teamName === code && normalizeLevel(p.level) === "Beginner" && (p.gender || "Male").toLowerCase() === "male").length;
              return count >= 4;
            }).length;

            if (teamsAtFour >= rules.beginnerGenderSplit.maleFourPlayerTeams) {
              return { valid: false, code: "BEGINNER_MALE_TEAM_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Only ${rules.beginnerGenderSplit.maleFourPlayerTeams} teams can take 4 beginner male players.` };
            }
          }
        }

        if (nextGender === "female") {
          if (nextBeginnerFemale > rules.beginnerGenderSplit.female.max) {
            return { valid: false, code: "BEGINNER_FEMALE_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Beginner female quota cannot exceed ${rules.beginnerGenderSplit.female.max} per team.` };
          }

          if (nextBeginnerFemale === 4) {
            const teamsAtFour = Object.keys(State.teams).filter(code => {
              if (code === teamCode) return false;
              const count = State.players.filter(p => p.isSold && p.teamName === code && normalizeLevel(p.level) === "Beginner" && (p.gender || "Female").toLowerCase() === "female").length;
              return count >= 4;
            }).length;

            if (teamsAtFour >= rules.beginnerGenderSplit.femaleFourPlayerTeams) {
              return { valid: false, code: "BEGINNER_FEMALE_TEAM_LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: Only ${rules.beginnerGenderSplit.femaleFourPlayerTeams} teams can take 4 beginner female players.` };
            }
          }
        }
      }
    }

    const validationResult = teamValidator.validateTeam(teamCode, teamPlayers, player);
    if (!validationResult.valid) {
      return { valid: false, code: "LIMIT_REACHED", message: `${State.teams[teamCode].name || teamCode}: ${validationResult.overallReason}` };
    }

    const reserveBudgetResult = calculateReserveBudget(teamCode, player);
    if (reserveBudgetResult.error) {
      return { valid: false, code: "CONFIG_ERROR", message: reserveBudgetResult.errorMessage };
    }
    const { reserveBudget } = reserveBudgetResult;
    const remainingPurseAfterBid = remainingPurse - bidAmount;
    
    if (remainingPurseAfterBid < reserveBudget) {
      return { 
        valid: false, 
        code: "INSUFFICIENT_REMAINING_BUDGET", 
        message: `Cannot assign this player.\nRemaining purse after this bid is ₹${remainingPurseAfterBid.toFixed(2)}L, but ₹${reserveBudget.toFixed(2)}L is required to purchase all remaining mandatory players at base price.`
      };
    }
    
    return { valid: true, code: "SUCCESS", message: "Valid" };
  },
  
  validateAuctionCompletion() {
    const configService = new TournamentConfigService();
    const config = configService.getConfig();
    
    for (const teamCode of Object.keys(State.teams)) {
      const players = State.players.filter(p => p.teamName === teamCode && p.isSold);
      const teamName = State.teams[teamCode].name || teamCode;
      
      if (players.length < config.minPlayersPerTeam) {
        return { valid: false, message: `${teamName}: Minimum squad size of ${config.minPlayersPerTeam} not met.` };
      }

      const maxBudget = getTeamBudget(teamCode);
      const spent = players.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
      if (spent > maxBudget) {
        return { valid: false, message: `${teamName}: Team budget exceeded. Spent ${spent.toFixed(2)}L of ${maxBudget.toFixed(2)}L.` };
      }
    }
    
    return { valid: true };
  }
};

// ── SOUND ──────────────────────────────────────────────
const Sound = {
  ctx: null,
  init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
  tone(freq, type, dur, delay = 0) {
    if (State.config && State.config.soundEffectsEnabled === false) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.type = type; osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0.1, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.start(now + delay); osc.stop(now + delay + dur);
    } catch (e) { }
  },
  bid() { this.tone(600, "sine", 0.1); setTimeout(() => this.tone(880, "sine", 0.1), 80); },
  sold() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, "triangle", 0.2, i * 0.1)); },
  warn() { this.tone(380, "sawtooth", 0.15); },
  speak(text) {
    if (State.config && State.config.voiceAnnouncerEnabled === false) return;
    if (!window.speechSynthesis) return;
    try { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.rate = 1.15; window.speechSynthesis.speak(u); } catch (e) { }
  }
};

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("KPL_THEME", theme);

  const btnLight = document.getElementById("btn-theme-light");
  const btnDark = document.getElementById("btn-theme-dark");
  if (btnLight && btnDark) {
    btnLight.classList.toggle("on", theme === "light");
    btnDark.classList.toggle("on", theme === "dark");
  }
}

function showTournamentInfo() {
  const modal = document.getElementById("info-modal");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  if (!modal || !body) return;

  const isCricket = State.tournament === "cricket";
  title.textContent = isCricket ? "KPL Tournament Rules" : "SmashFest Tournament Rules";

  body.innerHTML = `
    <ul style="line-height: 1.6; padding-left: 20px; color: var(--text); display: flex; flex-direction: column; gap: 8px;">
      <li><strong>Total Purse:</strong> ₹1.2 Crore (120 Lakhs) per team.</li>
      <li><strong>Squad Size:</strong> Max 10 players.</li>
      <li><strong>Base Prices:</strong> Pro Tier: ₹8L, Intermediate Tier: ₹5L, Beginner Tier: ₹3L.</li>
      <li><strong>Bidding Increment:</strong> Bids increment by ₹0.5L below ₹20L, and ₹1.0L at or above ₹20L.</li>
      <li><strong>Captains:</strong> Every team must assign a Captain. Captains cost ₹20L and do not enter the auction pool.</li>
      <li><strong>Unsold Players:</strong> Unsold players can be returned to the pool at the end of the round or marked permanently unsold based on configuration.</li>
    </ul>
  `;

  modal.classList.remove("hidden");
}

function handleCaptainRosterUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const fileStatus = document.getElementById("file-status");
  if (fileStatus) fileStatus.textContent = file.name;

  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const wb = XLSX.read(evt.target.result, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
      if (!rows.length) { alert("No data found in file."); return; }

      const keys = Object.keys(rows[0]);
      const nameKey = keys.find(k => k.toLowerCase().includes("name"));
      const idKey = keys.find(k => k.toLowerCase().includes("id") || k.toLowerCase().includes("emp"));
      const levelKey = keys.find(k => k.toLowerCase().includes("level") || k.toLowerCase().includes("category"));
      const genderKey = keys.find(k => k.toLowerCase().includes("gender") || k.toLowerCase().includes("sex"));

      const isCaptainKey = keys.find(k => k.toLowerCase().includes("captain") || k.toLowerCase().includes("capt") || k.toLowerCase().includes("role"));
      const teamKey = keys.find(k => k.toLowerCase().includes("team") || k.toLowerCase().includes("side"));

      if (!nameKey) { alert("Column 'Name' not found in file."); return; }

      const basePrices = (State.config && State.config.basePrices) ? State.config.basePrices : AUCTION_LIMITS.basePrices;

      const parsedPlayers = [];

      rows.forEach((row, i) => {
        const rawName = String(row[nameKey] || "").trim();
        const rawLevel = String(row[levelKey] || "").toLowerCase();
        const empId = idKey ? String(row[idKey] || "").trim() : ("IMP" + (i + 1));

        let rawGender = "Male";
        if (genderKey && row[genderKey]) {
          const val = String(row[genderKey]).trim().toLowerCase();
          if (val.startsWith("f")) {
            rawGender = "Female";
          } else {
            rawGender = "Male";
          }
        }

        if (!rawName) return;

        let level = "Beginner";
        let price = basePrices.Beginner;
        if (rawLevel.includes("pro") || rawLevel.includes("advanced") || rawLevel.includes("expert")) {
          level = "Pro";
          price = basePrices.Pro;
        } else if (rawLevel.includes("inter") || rawLevel.includes("mid")) {
          level = "Intermediate";
          price = basePrices.Intermediate;
        }

        let isCaptain = false;
        let teamName = "";
        let isSold = false;
        let status = "unauctioned";
        let finalPrice = price;

        if (isCaptainKey && row[isCaptainKey]) {
          const val = String(row[isCaptainKey]).trim().toLowerCase();
          if (val.includes("yes") || val.includes("true") || val === "1" || val === "y" || val.includes("captain")) {
            isCaptain = true;
          }
        }
        if (teamKey && row[teamKey]) {
          const teamVal = String(row[teamKey]).trim().toUpperCase();
          const foundTeamCode = Object.keys(State.teams).find(code =>
            code === teamVal ||
            State.teams[code].name.toUpperCase() === teamVal ||
            teamVal.includes(code)
          );
          if (foundTeamCode) {
            teamName = foundTeamCode;
            if (isCaptain) {
              isSold = true;
              status = "sold";
              finalPrice = price;
            }
          }
        }

        parsedPlayers.push({
          id: Date.now() + i,
          playerId: empId,
          name: rawName,
          gender: rawGender,
          imageName: getPhoto(rawName, empId),
          price: finalPrice,
          basePrice: price,
          level: level,
          isSold: isSold,
          status: status,
          teamName: teamName,
          isRegistered: true,
          isCaptain: isCaptain
        });
      });

      if (parsedPlayers.length === 0) {
        alert("No valid players parsed from the roster file.");
        return;
      }

      State.players = parsedPlayers;
      assignLotteryNumbersAndSort();
      State.rounds = generateRounds(State.players);
      State.activeRoundIdx = 0;
      State.savePlayers();
      State.saveRounds();

      localStorage.setItem("KPL_CUSTOM_ROSTER_" + State.tournament.toUpperCase(), "true");

      alert(`Import Successful! ${parsedPlayers.length} players imported. Round category sequence and captain selectors have been updated.`);

      renderCaptainSetup();
      updateRoundBadge();

    } catch (err) {
      alert("Error parsing file: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

function exportToExcel() {
  const data = State.players.map(p => ({
    "Employee ID": p.playerId,
    "Name": p.name,
    "Category/Tier": p.level,
    "Base Price (Lakhs)": p.basePrice,
    "Status": p.isSold ? "SOLD" : (p.status.startsWith("unsold") ? "UNSOLD" : "AVAILABLE"),
    "Sold Price (Lakhs)": p.isSold ? p.price : "",
    "Team Name": p.isSold ? (State.teams[p.teamName]?.name || p.teamName) : "",
    "Lottery Number": p.lotteryNumber,
    "Is Captain": p.isCaptain ? "YES" : "NO",
    "Eligible for Auction": p.isRegistered ? "YES" : "NO"
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Auction Results");

  const filename = `${State.tournament === "cricket" ? "KPL" : "SmashFest"}_Auction_Results_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

function exportToCSV() {
  const data = State.players.map(p => ({
    "Employee ID": p.playerId,
    "Name": p.name,
    "Category/Tier": p.level,
    "Base Price (Lakhs)": p.basePrice,
    "Status": p.isSold ? "SOLD" : (p.status.startsWith("unsold") ? "UNSOLD" : "AVAILABLE"),
    "Sold Price (Lakhs)": p.isSold ? p.price : "",
    "Team Name": p.isSold ? (State.teams[p.teamName]?.name || p.teamName) : "",
    "Lottery Number": p.lotteryNumber,
    "Is Captain": p.isCaptain ? "YES" : "NO",
    "Eligible for Auction": p.isRegistered ? "YES" : "NO"
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const filename = `${State.tournament === "cricket" ? "KPL" : "SmashFest"}_Auction_Results_${new Date().toISOString().slice(0, 10)}.csv`;
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportAllTeams() {
  const workbook = XLSX.utils.book_new();
  Object.entries(State.teams).forEach(([code, cfg]) => {
    const players = State.players.filter(p => p.teamName === code && p.isSold);
    const data = players.map((p, idx) => ({
      "S.No": idx + 1,
      "Employee ID": p.playerId,
      "Name": p.name,
      "Category": p.level,
      "Gender": p.gender,
      "Price": p.isCaptain ? "Captain (20.0 L)" : `${p.price} L`
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, cfg.name.substring(0, 30));
  });
  const filename = `${State.tournament === "cricket" ? "KPL" : "SmashFest"}_All_Teams_Roster_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

function exportSingleTeam(code) {
  const cfg = State.teams[code];
  if (!cfg) return;
  const players = State.players.filter(p => p.teamName === code && p.isSold);
  const data = players.map((p, idx) => ({
    "S.No": idx + 1,
    "Employee ID": p.playerId,
    "Name": p.name,
    "Category": p.level,
    "Gender": p.gender,
    "Price": p.isCaptain ? "Captain (20.0 L)" : `${p.price} L`
  }));
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, cfg.name.substring(0, 30));
  const filename = `${cfg.name.replace(/\s+/g, "_")}_Roster_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

// ── STATE ──────────────────────────────────────────────

function assignLotteryNumbersAndSort() {
  const eligible = State.players.filter(p => p.isRegistered && !p.isCaptain);
  const categories = ["Pro", "Intermediate", "Beginner"];

  categories.forEach(cat => {
    const catPlayers = eligible.filter(p => p.level === cat);
    // Sort: basePrice DESC, name ASC
    catPlayers.sort((a, b) => {
      if (b.basePrice !== a.basePrice) return b.basePrice - a.basePrice;
      return (a.name || "").localeCompare(b.name || "");
    });
    // Assign category numbering restarting at 1
    catPlayers.forEach((p, idx) => {
      p.lotteryNumber = idx + 1;
    });
  });

  State.savePlayers();
}

const State = {
  tournament: null,   // "cricket" | "smashfest"
  view: "selection",
  players: [],
  teams: {},
  rounds: [],         // [{ number, category, status }]
  activeRoundIdx: 0,
  categoryOrder: [],
  selectedPlayer: null,
  selectedTeam: "",
  activeAdminModule: "registry",
  config: {},

  // keys
  playersKey() { return this.tournament === "cricket" ? "KPL_PLAYERS_CRICKET" : "KPL_PLAYERS_SMASHFEST"; },
  teamsKey() { return this.tournament === "cricket" ? "KPL_TEAMS_CRICKET" : "KPL_TEAMS_SMASHFEST"; },
  roundsKey() { return this.tournament === "cricket" ? "KPL_ROUNDS_CRICKET" : "KPL_ROUNDS_SMASHFEST"; },
  activeIdxKey() { return this.tournament === "cricket" ? "KPL_ACTIVEIDX_CRICKET" : "KPL_ACTIVEIDX_SMASHFEST"; },
  categoryOrderKey() { return this.tournament === "cricket" ? "KPL_CAT_ORDER_CRICKET" : "KPL_CAT_ORDER_SMASHFEST"; },
  configKey() { return this.tournament === "cricket" ? "KPL_CONFIG_CRICKET" : "KPL_CONFIG_SMASHFEST"; },

  initData() {
    const names = window.RAW_NAMES_OVERRIDE || RAW_NAMES;
    // Cricket
    const ck = "KPL_PLAYERS_CRICKET";
    const cs = localStorage.getItem(ck);
    let cp = null;
    try { cp = cs ? JSON.parse(cs) : null; } catch (e) { cp = null; }
    if (!cp || !Array.isArray(cp) || cp.length !== names.length || !cp[0] || !cp[0].lotteryNumber) {
      const list = names.map((item, i) => {
        const name = typeof item === "object" ? item.name : item;
        const gender = typeof item === "object" ? item.gender : "Male";
        const lv = getLevelInfo(i);
        const empId = "K" + (1000 + i);
        const realEmpId = findRealEmpId(name) || empId;
        return {
          id: i + 1, playerId: realEmpId, name, gender,
          imageName: getPhoto(name, realEmpId), price: lv.basePrice, basePrice: lv.basePrice,
          level: lv.level, isSold: false, status: "unauctioned",
          teamName: "", lotteryNumber: 0, isRegistered: true, isCaptain: false
        };
      });
      localStorage.setItem(ck, JSON.stringify(list));
      this.players = list;
      this.tournament = "cricket";
      assignLotteryNumbersAndSort();
    }

    // SmashFest
    const sk = "KPL_PLAYERS_SMASHFEST";
    const ss = localStorage.getItem(sk);
    let sp = null;
    try { sp = ss ? JSON.parse(ss) : null; } catch (e) { sp = null; }
    if (!sp || !Array.isArray(sp) || sp.length !== names.length || !sp[0] || !sp[0].lotteryNumber) {
      const list = names.map((item, i) => {
        const name = typeof item === "object" ? item.name : item;
        const gender = typeof item === "object" ? item.gender : "Male";
        const lv = getLevelInfo(i);
        const empId = "K" + (1000 + i);
        const realEmpId = findRealEmpId(name) || ("SF" + (2000 + i));
        return {
          id: i + 1000, playerId: realEmpId, name, gender,
          imageName: getPhoto(name, realEmpId), price: lv.basePrice, basePrice: lv.basePrice,
          level: lv.level, isSold: false, status: "unauctioned",
          teamName: "", lotteryNumber: 0, isRegistered: true, isCaptain: false
        };
      });
      localStorage.setItem(sk, JSON.stringify(list));
      this.players = list;
      this.tournament = "smashfest";
      assignLotteryNumbersAndSort();
    }
  },

  loadTournament(t) {
    this.tournament = t;
    localStorage.setItem("KPL_ACTIVE_TOURNAMENT", t);
    // Config
    const cfg = localStorage.getItem(this.configKey());
    const defaultConfig = window.DEFAULT_CONFIG_OVERRIDE || {
      timerDuration: 15,
      basePrices: { ...AUCTION_LIMITS.basePrices },
      categoryMaxBid: { ...AUCTION_LIMITS.categoryMaxBid },
      maxSquadSize: 10,
      maxBudget: AUCTION_LIMITS.teamBudget,
      autoAdvance: false,
      unsoldHandling: "return",
      soundEffectsEnabled: false,
      voiceAnnouncerEnabled: false,
      maxMalePerTeam: 7,
      maxFemalePerTeam: 3,
      MinPlayersPerTeam: 0,
      MaxPlayersPerTeam: 10,
      MinMalePlayers: 0,
      MaxMalePlayers: 7,
      MinFemalePlayers: 0,
      MaxFemalePlayers: 3,
      MinProPlayers: 0,
      MaxProPlayers: 10,
      MinIntermediatePlayers: 0,
      MaxIntermediatePlayers: 10,
      MinBeginnerPlayers: 0,
      MaxBeginnerPlayers: 10
    };
    let stored = null;
    if (cfg) {
      try { stored = JSON.parse(cfg); } catch (e) { stored = null; }
    }
    if (stored && typeof stored === 'object') {
      this.config = {
        ...stored,
        ...defaultConfig
      };
      if (stored.soundEffectsEnabled !== undefined) this.config.soundEffectsEnabled = stored.soundEffectsEnabled;
      if (stored.voiceAnnouncerEnabled !== undefined) this.config.voiceAnnouncerEnabled = stored.voiceAnnouncerEnabled;
    } else {
      this.config = { ...defaultConfig };
    }
    if (this.config.maxBudget && this.config.maxBudget < 10) {
      this.config.maxBudget *= 100;
    }
    localStorage.setItem(this.configKey(), JSON.stringify(this.config));

    // Teams
    const ts = localStorage.getItem(this.teamsKey());
    const defaultCricket = window.DEFAULT_CRICKET_TEAMS_OVERRIDE || DEFAULT_CRICKET_TEAMS;
    const defaultSmashfest = window.DEFAULT_SMASHFEST_TEAMS_OVERRIDE || DEFAULT_SMASHFEST_TEAMS;
    const activeDefaults = t === "cricket" ? defaultCricket : defaultSmashfest;
    let storedTeams = null;
    if (ts) {
      try { storedTeams = JSON.parse(ts); } catch (e) { storedTeams = null; }
    }
    if (storedTeams && typeof storedTeams === 'object') {
      const mergedTeams = {};
      Object.keys(activeDefaults).forEach(code => {
        mergedTeams[code] = {
          ...(storedTeams[code] || {}),
          ...activeDefaults[code]
        };
      });
      this.teams = mergedTeams;
    } else {
      this.teams = { ...activeDefaults };
    }
    Object.keys(this.teams).forEach(code => {
      if (this.teams[code].purse && this.teams[code].purse < 10) {
        this.teams[code].purse *= 100;
      }
    });
    this.saveTeams();

    // Players
    const ps = localStorage.getItem(this.playersKey());
    let parsedPlayers = [];
    try { parsedPlayers = ps ? JSON.parse(ps) : []; } catch (e) { parsedPlayers = []; }
    this.players = Array.isArray(parsedPlayers) ? parsedPlayers : [];

    // Sync player properties dynamically if changed in appsettings.json
    const names = window.RAW_NAMES_OVERRIDE || RAW_NAMES;
    const isCustomRoster = localStorage.getItem("KPL_CUSTOM_ROSTER_" + t.toUpperCase()) === "true";
    if (!isCustomRoster && this.players.length === names.length) {
      this.players.forEach((player, i) => {
        const item = names[i];
        const name = typeof item === "object" ? item.name : item;
        const gender = typeof item === "object" ? item.gender : "Male";
        const empId = "K" + (1000 + i);

        player.name = name;
        player.gender = gender;

        // Resolve and update to real Employee ID
        const explicitEmpId = player.playerId || player.empId;
        const realEmpId = explicitEmpId || findRealEmpId(name) || empId;
        player.playerId = realEmpId;
        player.imageName = getPhoto(name, realEmpId);

        const lv = getLevelInfo(i);
        player.level = lv.level;
        player.basePrice = lv.basePrice;
        if (!player.isSold && (player.status === "unauctioned" || player.status === "unsold" || player.status === "unsold_permanent")) {
          player.price = lv.basePrice;
        }
      });
      this.savePlayers();
    } else {
      // Even if lengths don't match (e.g. custom Excel imported roster), ALWAYS update player IDs and photos against the latest IMAGE_MAP
      this.players.forEach((player) => {
        const explicitEmpId = player.playerId || player.empId;
        const realEmpId = explicitEmpId || findRealEmpId(player.name);
        player.playerId = realEmpId;
        player.imageName = getPhoto(player.name, realEmpId);
      });
      this.savePlayers();
    }

    // Activity History
    const actKey = this.tournament + "_ACTIVITY_HISTORY";
    const storedAct = localStorage.getItem(actKey);
    let parsedAct = [];
    try { parsedAct = storedAct ? JSON.parse(storedAct) : []; } catch (e) { parsedAct = []; }
    this.activityHistory = Array.isArray(parsedAct) ? parsedAct : [];

    // Auto-populate from already sold players if history is empty
    if (this.activityHistory.length === 0 && this.players && this.players.length > 0) {
      const soldPlayers = this.players.filter(p => p.isSold && p.teamName);
      soldPlayers.forEach(p => {
        this.activityHistory.push({
          teamCode: p.teamName,
          playerName: p.name,
          price: p.price,
          timestamp: "Active Session"
        });
      });
    }

    // Category Order
    const co = localStorage.getItem(this.categoryOrderKey());
    this.categoryOrder = co ? JSON.parse(co) : ["Pro", "Intermediate", "Beginner"];
    // Rounds
    const rs = localStorage.getItem(this.roundsKey());
    this.rounds = rs ? JSON.parse(rs) : [];
    if (!this.rounds.length && this.players.length) this.rounds = generateRounds(this.players);
    const ai = localStorage.getItem(this.activeIdxKey());
    this.activeRoundIdx = ai !== null ? parseInt(ai) : 0;
  },

  savePlayers() { localStorage.setItem(this.playersKey(), JSON.stringify(this.players)); },
  saveTeams() { localStorage.setItem(this.teamsKey(), JSON.stringify(this.teams)); },
  saveActivityHistory() {
    const actKey = this.tournament + "_ACTIVITY_HISTORY";
    localStorage.setItem(actKey, JSON.stringify(this.activityHistory));
  },
  saveRounds() {
    localStorage.setItem(this.roundsKey(), JSON.stringify(this.rounds));
    localStorage.setItem(this.activeIdxKey(), this.activeRoundIdx);
    updateRoundBadge();
  }
};

// ── ROUND MANAGEMENT ──────────────────────────────────
function generateRounds(players) {
  // Find unique categories present in eligible players
  const cats = new Set(players.filter(p => p && p.isRegistered && !p.isCaptain && p.level).map(p => p.level));
  // Priority: Pro > Intermediate > Beginner
  const priority = ["Pro", "Intermediate", "Beginner"];
  let orderedCats = priority.filter(c => cats.has(c));
  // Append any other found categories
  cats.forEach(c => {
    if (c && !orderedCats.includes(c)) orderedCats.push(c);
  });
  const rounds = orderedCats.map((cat, i) => ({
    number: i + 1,
    category: cat,
    status: i === 0 ? "active" : "locked"
  }));
  return rounds;
}

function getActiveRound() {
  return State.rounds[State.activeRoundIdx] || null;
}

function getRoundStats(round) {
  const all = State.players.filter(p => p.isRegistered && !p.isCaptain && p.level === round.category);
  const sold = all.filter(p => p.isSold);
  const unsold = all.filter(p => p.status === "unsold");
  const remaining = all.filter(p => p.status === "unauctioned");
  const done = sold.length + unsold.length;
  const pct = all.length > 0 ? Math.round((done / all.length) * 100) : 0;
  return { total: all.length, sold: sold.length, unsold: unsold.length, remaining: remaining.length, pct };
}

function updateRoundBadge() {
  const round = getActiveRound();
  const label = round ? `ROUND ${round.number} — ${round.category.toUpperCase()}` : "ALL ROUNDS COMPLETE";
  const badgeEl = document.getElementById("round-badge");
  if (badgeEl) badgeEl.textContent = label;
}

function checkRoundCompletion() {
  const round = getActiveRound();
  if (!round) return;
  const stats = getRoundStats(round);
  if (stats.remaining > 0) return; // still players to auction
  if (stats.total === 0) return;

  // Mark current round complete
  State.rounds[State.activeRoundIdx].status = "completed";
  const nextIdx = State.activeRoundIdx + 1;

  if (nextIdx < State.rounds.length) {
    State.rounds[nextIdx].status = "active";
    State.activeRoundIdx = nextIdx;
    State.saveRounds();
    const nextRound = State.rounds[nextIdx];
    setTimeout(() => {
      showRoundCompleteToast(round.category, nextRound);
    }, 800);
  } else {
    State.saveRounds();
    setTimeout(() => showAllRoundsCompleteToast(), 800);
  }
}

function showRoundCompleteToast(completedCat, nextRound) {
  const msg = `✅ ${completedCat.toUpperCase()} ROUND COMPLETE!\n\n` +
    `🔓 Round ${nextRound.number} — ${nextRound.category.toUpperCase()} is now active.\n` +
    `Go back to the Player Pool to start the next round.`;
  alert(msg);
  renderAdmin();
  updateRoundBadge();
}

function showAllRoundsCompleteToast() {
  alert("🏆 ALL ROUNDS COMPLETE!\nThe auction is finished. Check the Leaderboard for final results.");
  updateRoundBadge();
}

function switchView(id) {
  State.view = id;
  stopTimer();

  if (id === "welcome") {
    renderWelcomeOverview();
  }

  if (id === "selection") {
    localStorage.removeItem("KPL_ACTIVE_TOURNAMENT");
    localStorage.removeItem("KPL_ACTIVE_VIEW");
    localStorage.removeItem("KPL_ACTIVE_PLAYER_ID");
  } else {
    localStorage.setItem("KPL_ACTIVE_VIEW", id);
  }

  if (id !== "detail") {
    localStorage.removeItem("KPL_ACTIVE_PLAYER_ID");
  }

  // Hide all views
  document.querySelectorAll(".view").forEach(v => { v.classList.add("hidden"); v.classList.remove("active"); });

  const target = document.getElementById("view-" + id);
  if (target) { target.classList.remove("hidden"); target.classList.add("active"); }

  // Nav bar
  const nav = document.getElementById("nav-bar");
  if (id === "selection") {
    nav.classList.add("hidden");
    document.getElementById("app").className = "app";
  } else {
    nav.classList.remove("hidden");
    document.getElementById("app").className = "app theme-" + State.tournament;
  }

  // Tab highlights
  document.querySelectorAll(".tab-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.view === id);
  });

  updateRoundBadge();

  // Per-view render
  if (id === "welcome") renderWelcome();
  if (id === "dashboard") renderDashboard();
  if (id === "teams") renderTeamCards();
  if (id === "admin") renderAdmin();
}

// ── WELCOME ───────────────────────────────────────────
function renderWelcome() {
  const isCricket = State.tournament === "cricket";
  document.getElementById("welcome-title").textContent = isCricket ? "KPL AUCTION" : "SMASHFEST";
  document.getElementById("welcome-subtitle").textContent = isCricket ? "🏏 PREMIER CRICKET LEAGUE 🏏" : "🏸 CHAMPIONSHIP AUCTION 🏸";

  const artLeft = document.getElementById("welcome-hero-art-left");
  const artRight = document.getElementById("welcome-hero-art-right");
  if (artLeft) artLeft.src = isCricket ? "images/image.png" : "images/smashing logo.PNG";
  if (artRight) artRight.src = isCricket ? "images/image.png" : "images/smashing logo.PNG";

  // Render dynamic live activity panel
  renderWelcomeActivity();
}

// ── CAPTAIN SETUP ─────────────────────────────────────
function renderRoundOrderSetup() {
  const listEl = document.getElementById("round-order-list");
  if (!listEl) return;
  listEl.innerHTML = "";

  // Get unique categories currently in the player pool (registered, non-captains)
  const cats = [...new Set(State.players.filter(p => p && p.isRegistered && !p.isCaptain && p.level).map(p => p.level))].filter(Boolean);
  if (!cats.length) {
    listEl.innerHTML = `<div class="admin-round-empty">No player categories found. Please upload a roster file first.</div>`;
    return;
  }

  // Ensure categoryOrder contains these categories
  let ordered = State.categoryOrder.filter(c => c && cats.includes(c));
  cats.forEach(c => {
    if (c && !ordered.includes(c)) ordered.push(c);
  });
  State.categoryOrder = ordered;
  localStorage.setItem(State.categoryOrderKey(), JSON.stringify(State.categoryOrder));

  // Render each category with Up/Down buttons
  State.categoryOrder.forEach((cat, idx) => {
    if (!cat) return;
    const row = document.createElement("div");
    row.className = "round-order-item";

    const isFirst = idx === 0;
    const isLast = idx === State.categoryOrder.length - 1;

    row.innerHTML = `
      <div class="roi-drag-handle">☰</div>
      <div class="roi-round-num">Round ${idx + 1}</div>
      <div class="roi-cat-badge level-${cat.toLowerCase()}">${cat.toUpperCase()}</div>
      <div class="roi-controls">
        <button type="button" class="roi-btn move-up" ${isFirst ? "disabled" : ""} title="Move Up">▲</button>
        <button type="button" class="roi-btn move-down" ${isLast ? "disabled" : ""} title="Move Down">▼</button>
      </div>
    `;

    // Add button listeners
    row.querySelector(".move-up")?.addEventListener("click", () => {
      if (idx > 0) {
        const temp = State.categoryOrder[idx];
        State.categoryOrder[idx] = State.categoryOrder[idx - 1];
        State.categoryOrder[idx - 1] = temp;
        localStorage.setItem(State.categoryOrderKey(), JSON.stringify(State.categoryOrder));
        renderRoundOrderSetup();
      }
    });

    row.querySelector(".move-down")?.addEventListener("click", () => {
      if (idx < State.categoryOrder.length - 1) {
        const temp = State.categoryOrder[idx];
        State.categoryOrder[idx] = State.categoryOrder[idx + 1];
        State.categoryOrder[idx + 1] = temp;
        localStorage.setItem(State.categoryOrderKey(), JSON.stringify(State.categoryOrder));
        renderRoundOrderSetup();
      }
    });

    listEl.appendChild(row);
  });
}

function renderCaptainSetup() {
  renderRoundOrderSetup();

  // Update roster count display
  const rosterCountEl = document.getElementById("roster-count-display");
  if (rosterCountEl) {
    const regCount = State.players.filter(p => p && p.isRegistered).length;
    rosterCountEl.textContent = `${regCount} Players Found`;
    const statusVal = document.querySelector(".roster-status-value");
    if (statusVal && regCount > 0) statusVal.textContent = "Ready to import";
  }

  const container = document.getElementById("captain-selectors");
  container.innerHTML = "";
  const sorted = [...State.players]
    .filter(p => p && p.isRegistered && p.name)
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  Object.entries(State.teams).forEach(([code, cfg]) => {
    const teamColor = cfg.color || "#00dcff";
    const selectedCaptain = State.players.find(p => p.teamName === code && p.isCaptain);
    const selectedVC = State.players.find(p => p.teamName === code && p.isViceCaptain);

    // Build captain options
    const captainOpts = sorted
      .filter(p => !p.isSold || p.id === selectedCaptain?.id)
      .map(p => `<option value="${p.id}" ${p.id === selectedCaptain?.id ? "selected" : ""}>${p.name} (${p.empId || p.id})</option>`)
      .join("");

    // Build vice-captain options
    const vcOpts = sorted
      .filter(p => !p.isSold || p.id === selectedVC?.id)
      .map(p => `<option value="${p.id}" ${p.id === selectedVC?.id ? "selected" : ""}>${p.name} (${p.empId || p.id})</option>`)
      .join("");

    const captainName = selectedCaptain ? selectedCaptain.name : "";
    const captainId = selectedCaptain ? (selectedCaptain.empId || `EMP${selectedCaptain.id}`) : "";
    const captainInitial = captainName ? captainName.charAt(0).toUpperCase() : "?";

    const vcName = selectedVC ? selectedVC.name : "";
    const vcId = selectedVC ? (selectedVC.empId || `EMP${selectedVC.id}`) : "";
    const vcInitial = vcName ? vcName.charAt(0).toUpperCase() : "?";

    const bothAssigned = selectedCaptain && selectedVC;
    const statusHTML = bothAssigned
      ? `<div class="neon-assign-status assigned">✓ Captain & Vice-Captain Assigned</div>`
      : `<div class="neon-assign-status not-assigned">✗ Not Assigned</div>`;

    const card = document.createElement("div");
    card.className = "neon-team-card";
    card.style.setProperty("--team-glow-color", teamColor);
    card.style.borderColor = `${teamColor}30`;
    card.innerHTML = `
      <div class="neon-team-card-header">
        <span class="neon-team-emoji">${cfg.emoji}</span>
        <div>
          <div class="neon-team-code" style="color: ${teamColor};">${code}</div>
          <div class="neon-team-name">${cfg.name}</div>
        </div>
      </div>

      <div class="neon-role-block">
        <div class="neon-role-label captain-label">CAPTAIN</div>
        <div class="neon-select-row">
          <div class="neon-avatar" data-role="captain-avatar">${captainInitial}</div>
          <div class="neon-select-info">
            <div class="neon-player-name" data-role="captain-name">${captainName || "—"}</div>
            <div class="neon-player-id" data-role="captain-id">${captainId}</div>
          </div>
          <select class="neon-captain-select" data-team="${code}" data-role="captain">
            <option value="">-- Choose Captain --</option>
            ${captainOpts}
          </select>
        </div>
      </div>

      <div class="neon-role-block">
        <div class="neon-role-label vc-label">VICE-CAPTAIN</div>
        <div class="neon-select-row">
          <div class="neon-avatar" data-role="vc-avatar">${vcInitial}</div>
          <div class="neon-select-info">
            <div class="neon-player-name" data-role="vc-name">${vcName || "—"}</div>
            <div class="neon-player-id" data-role="vc-id">${vcId}</div>
          </div>
          <select class="neon-captain-select" data-team="${code}" data-role="vice-captain">
            <option value="">-- Choose Vice-Captain --</option>
            ${vcOpts}
          </select>
        </div>
      </div>

      ${statusHTML}
    `;

    // Wire up change listeners for live updates
    const captainSelect = card.querySelector('[data-role="captain"]');
    const vcSelect = card.querySelector('[data-role="vice-captain"]');

    captainSelect.addEventListener("change", () => {
      const player = State.players.find(p => p.id === parseInt(captainSelect.value));
      card.querySelector('[data-role="captain-avatar"]').textContent = player ? player.name.charAt(0).toUpperCase() : "?";
      card.querySelector('[data-role="captain-name"]').textContent = player ? player.name : "—";
      card.querySelector('[data-role="captain-id"]').textContent = player ? (player.empId || `EMP${player.id}`) : "";
      updateCardStatus(card, captainSelect, vcSelect);
    });

    vcSelect.addEventListener("change", () => {
      const player = State.players.find(p => p.id === parseInt(vcSelect.value));
      card.querySelector('[data-role="vc-avatar"]').textContent = player ? player.name.charAt(0).toUpperCase() : "?";
      card.querySelector('[data-role="vc-name"]').textContent = player ? player.name : "—";
      card.querySelector('[data-role="vc-id"]').textContent = player ? (player.empId || `EMP${player.id}`) : "";
      updateCardStatus(card, captainSelect, vcSelect);
    });

    container.appendChild(card);
  });
}

function updateCardStatus(card, captainSel, vcSel) {
  const statusEl = card.querySelector(".neon-assign-status");
  if (captainSel.value && vcSel.value) {
    statusEl.className = "neon-assign-status assigned";
    statusEl.innerHTML = "✓ Captain & Vice-Captain Assigned";
  } else {
    statusEl.className = "neon-assign-status not-assigned";
    statusEl.innerHTML = "✗ Not Assigned";
  }
}
function launchAuction() {
  const captainSelects = document.querySelectorAll('.neon-captain-select[data-role="captain"]');
  const vcSelects = document.querySelectorAll('.neon-captain-select[data-role="vice-captain"]');
  const allIds = new Set();
  const captainMap = {};
  const vcMap = {};
  let ok = true;

  // Validate captains
  captainSelects.forEach(s => {
    if (!s.value) { ok = false; return; }
    if (allIds.has(s.value)) { ok = false; alert(`Player already assigned to another role! Each player can only fill one role.`); return; }
    allIds.add(s.value);
    captainMap[s.dataset.team] = parseInt(s.value);
  });

  // Validate vice-captains
  vcSelects.forEach(s => {
    if (!s.value) { ok = false; return; }
    if (allIds.has(s.value)) { ok = false; alert(`Player already assigned to another role! Each player can only fill one role.`); return; }
    allIds.add(s.value);
    vcMap[s.dataset.team] = parseInt(s.value);
  });

  if (!ok) { alert("Please assign a unique captain AND vice-captain for every team!"); return; }
  if (allIds.size < Object.keys(State.teams).length * 2) { alert("Each team must have a unique captain and vice-captain!"); return; }

  State.players.forEach(p => {
    p.isCaptain = false;
    p.isViceCaptain = false;
    for (const [team, cid] of Object.entries(captainMap)) {
      if (p.id === cid) { p.isCaptain = true; p.isSold = true; p.status = "sold"; p.teamName = team; p.price = p.basePrice || 0; }
    }
    for (const [team, vcid] of Object.entries(vcMap)) {
      if (p.id === vcid) { p.isViceCaptain = true; p.isSold = true; p.status = "sold"; p.teamName = team; p.price = p.basePrice || 0; }
    }
  });

  // Assign/refresh lottery numbers for remaining registered players category-by-category in custom categoryOrder sequence!
  assignLotteryNumbersAndSort();

  // Save players
  State.savePlayers();

  // Generate rounds and set active to index 0
  State.rounds = generateRounds(State.players);
  State.activeRoundIdx = 0;
  State.saveRounds();

  renderPool();
  switchView("pool");
}

// ── PLAYER POOL ───────────────────────────────────────
function renderPool() {
  renderRoundHeader();
  const grid = document.getElementById("pool-grid");
  grid.innerHTML = "";

  const activeRound = getActiveRound();
  const filter = (document.querySelector(".filter-btn.active") || {}).dataset?.filter || "all";

  // Base list: current round's category only (registered)
  let list = State.players.filter(p => p.isRegistered);
  if (activeRound) list = list.filter(p => p.level === activeRound.category);

  // Sort: basePrice desc, name asc (as per business rule)
  list.sort((a, b) => {
    if (b.basePrice !== a.basePrice) return b.basePrice - a.basePrice;
    return (a.name || "").localeCompare(b.name || "");
  });

  // Status filter
  if (filter === "available") list = list.filter(p => !p.isSold && p.status !== "unsold" && p.status !== "unsold_permanent");
  else if (filter === "sold") list = list.filter(p => p.isSold);
  else if (filter === "unsold") list = list.filter(p => p.status === "unsold" || p.status === "unsold_permanent");

  if (!activeRound && filter === "all") {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:rgba(255,255,255,0.3);font-size:16px;font-weight:600;">🏆 All auction rounds are complete!</div>';
    return;
  }

  if (list.length === 0) {
    const msg = filter === "all" ? "No players in this round." : `No ${filter} players in this round.`;
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:rgba(255,255,255,0.3);font-size:16px;font-weight:600;">${msg}</div>`;
    return;
  }

  list.forEach(player => {
    const card = document.createElement("div");
    const tier = (player.level || "beginner").toLowerCase();

    // Captains, Vice Captains, Sold players, Unsold players, and already revealed players are fully shown.
    // Unrevealed available players are shown as mystery cards.
    const isSpecial = player.isCaptain || player.isViceCaptain || player.isSold || player.status === "sold" || player.status === "unsold" || player.status === "unsold_permanent" || player.isRevealed;

    if (!isSpecial) {
      card.className = `player-card mystery-card tier-${tier}`;
      card.innerHTML = `
        <div class="mystery-q">?</div>
        <div class="mystery-num">#${player.lotteryNumber}</div>
        <div class="mystery-tap">TAP TO REVEAL</div>
      `;
    } else {
      let statusBadge = "badge-avail";
      let statusText = "AVAILABLE";
      if (player.isSold) {
        statusBadge = "badge-sold";
        statusText = "SOLD";
      } else if (player.status === "unsold" || player.status === "unsold_permanent") {
        statusBadge = "badge-unsold";
        statusText = "UNSOLD";
      }

      const tierBadgeClass = { beginner: "tier-beginner-badge", intermediate: "tier-intermediate-badge", pro: "tier-pro-badge" }[tier] || "tier-beginner-badge";
      card.className = `player-card revealed-card tier-${tier}`;
      card.innerHTML = `
        <img class="card-player-img" src="images/${player.imageName || "default.png"}" alt="${teamTreeEscape(player.name)}" onerror="this.src='images/default.png'">
        <div class="card-player-footer">
          <div class="card-player-name">${teamTreeEscape(player.name)}</div>
          <div class="card-lot-num">#${player.lotteryNumber}</div>
          <div class="card-meta-row">
            <span class="card-tier-badge ${tierBadgeClass}">${(player.level || "BEGINNER").toUpperCase()}</span>
            <span class="card-status-badge ${statusBadge}">${statusText}</span>
          </div>
          ${player.isCaptain ? '<span class="captain-badge">CAPTAIN</span>' : ""}
          ${player.isViceCaptain ? '<span class="captain-badge" style="background:#00dcff;color:#000;">VICE CAPTAIN</span>' : ""}
        </div>`;
    }

    card.addEventListener("click", () => {
      if (!player.isRevealed && !player.isCaptain && !player.isViceCaptain && !player.isSold && player.status !== "unsold" && player.status !== "unsold_permanent") {
        player.isRevealed = true;
        State.savePlayers();
      }
      openDetail(player);
    });
    grid.appendChild(card);
  });
}
function ensureRoundTabs() {
  const order = (State.categoryOrder && State.categoryOrder.length ? State.categoryOrder : ROUND_PRIORITY).filter(Boolean);
  const currentCategory = State.rounds[State.activeRoundIdx]?.category || order[0];
  const byCategory = new Map(State.rounds.map(round => [round.category, round]));
  State.rounds = order.map((category, idx) => {
    const existing = byCategory.get(category) || { category };
    return {
      ...existing,
      number: idx + 1,
      category,
      status: category === currentCategory ? "active" : (idx < order.indexOf(currentCategory) ? "completed" : "locked")
    };
  });
  State.activeRoundIdx = Math.max(0, State.rounds.findIndex(round => round.category === currentCategory));
  State.saveRounds();
}
function renderRoundHeader() {
  ensureRoundTabs();
  let header = document.getElementById("pool-round-header");
  if (!header) {
    header = document.createElement("div");
    header.id = "pool-round-header";
    const poolView = document.getElementById("view-pool");
    poolView.insertBefore(header, poolView.firstChild);
  }

  if (!State.rounds.length) { header.innerHTML = ""; return; }

  const roundPills = State.rounds.map((r, i) => {
    const stats = getRoundStats(r);
    const isActive = i === State.activeRoundIdx;
    const statusClass = r.status === "completed" ? "rp-done" : isActive ? "rp-active" : "rp-locked";
    const statusIcon = r.status === "completed" ? "✓" : isActive ? "●" : "🔒";
    return `<div class="round-pill ${statusClass}" data-idx="${i}">
      <span class="rp-icon">${statusIcon}</span>
      <div class="rp-info">
        <span class="rp-label">Round ${r.number}</span>
        <span class="rp-cat">${r.category.toUpperCase()}</span>
      </div>
      <div class="rp-stats">
        <span class="rp-stat">${stats.sold} sold</span>
        <span class="rp-sep">·</span>
        <span class="rp-stat">${stats.unsold} unsold</span>
        <span class="rp-sep">·</span>
        <span class="rp-remain">${stats.remaining} remaining</span>
      </div>
      <div class="rp-progress"><div class="rp-fill" style="width:${stats.pct}%"></div></div>
    </div>`;
  }).join("");

  const activeRound = getActiveRound();
  const activeStats = activeRound ? getRoundStats(activeRound) : null;

  header.innerHTML = `
    <div class="pool-round-header">
      <div class="round-pills-row">${roundPills}</div>
      ${activeRound ? `<div class="active-round-banner">
        <span class="arb-label">ACTIVE ROUND</span>
        <span class="arb-name">Round ${activeRound.number} — ${activeRound.category.toUpperCase()}</span>
        <span class="arb-stats">${activeStats.remaining} remaining &nbsp;·&nbsp; ${activeStats.pct}% done</span>
      </div>` : `<div class="active-round-banner complete-banner">🏆 All Rounds Complete!</div>`}
    </div>`;

  header.querySelectorAll(".round-pill").forEach(pill => {
    pill.style.cursor = "pointer";
    pill.addEventListener("click", () => {
      const idx = parseInt(pill.dataset.idx);
      if (!isNaN(idx)) {
        State.activeRoundIdx = idx;
        State.rounds.forEach((r, roundI) => {
          if (roundI === idx) {
            r.status = "active";
          } else if (roundI < idx) {
            r.status = "completed";
          } else {
            r.status = "locked";
          }
        });
        State.saveRounds();
        renderPool();
      }
    });
  });
}

// ── AUCTION TIMER ─────────────────────────────────────
let timerInterval = null;
let timerCount = 15;
let timerPhase = "bidding";
let timerRunning = false;

function startTimer() {
  timerRunning = true;
  document.getElementById("btn-timer").textContent = "⏸ Pause";
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!timerRunning) return;
    timerCount--;
    updateTimerUI();
    if (timerCount <= 0) advanceTimerPhase();
  }, 1000);
}

function stopTimer() {
  timerRunning = false;
  const btn = document.getElementById("btn-timer");
  if (btn) btn.textContent = "▶ Resume";
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function resetTimer(sec = null, phase = "bidding") {
  const duration = sec !== null ? sec : (State.config.timerDuration || 15);
  timerCount = duration; timerPhase = phase; updateTimerUI();
}

function updateTimerUI() {
  const fill = document.getElementById("timer-fill");
  const numEl = document.getElementById("timer-num");
  const phaseEl = document.getElementById("timer-phase");
  if (!fill || !numEl || !phaseEl) return;

  const duration = State.config.timerDuration || 15;
  numEl.textContent = timerCount;
  fill.style.width = ((timerCount / duration) * 100) + "%";
  numEl.classList.toggle("pulse", timerCount <= 4);

  const phaseMap = {
    bidding: { label: "BIDDING", color: "#00dcff" },
    once: { label: "GOING ONCE", color: "#ff8c00" },
    twice: { label: "GOING TWICE", color: "#ffd700" },
    sold: { label: "SOLD!", color: "#00ff87" }
  };
  const info = phaseMap[timerPhase] || phaseMap.bidding;
  phaseEl.textContent = info.label;
  phaseEl.style.color = info.color;
  fill.style.backgroundColor = info.color;
}

function advanceTimerPhase() {
  const player = State.selectedPlayer;
  if (!player) return;

  const duration = State.config.timerDuration || 15;
  if (timerPhase === "bidding") {
    timerPhase = "once"; timerCount = duration; Sound.warn();
    Sound.speak("Going once" + (State.selectedTeam ? ` at \u20B9${player.price.toFixed(1)} Lakhs to ${State.teams[State.selectedTeam].name}!` : ` — no bids yet.`));
    updateTimerUI();
  } else if (timerPhase === "once") {
    timerPhase = "twice"; timerCount = duration; Sound.warn();
    Sound.speak("Going twice" + (State.selectedTeam ? ` at \u20B9${player.price.toFixed(1)} Lakhs!` : " — no bids yet."));
    updateTimerUI();
  } else if (timerPhase === "twice") {
    stopTimer();
    if (State.selectedTeam) doSell();
    else doUnsold();
  }
}

// ── PLAYER DETAIL ─────────────────────────────────────
function openDetail(player) {
  State.selectedPlayer = player;
  State.selectedTeam = player.teamName || "";
  localStorage.setItem("KPL_ACTIVE_PLAYER_ID", player.id);

  if (player.status === "unsold" || player.status === "unsold_permanent") {
    player.status = "unauctioned";
    player.isSold = false;
    player.price = player.basePrice;
    State.selectedTeam = "";
    State.savePlayers();
  }

  // Reveal
  document.getElementById("player-name").textContent = player.name;
  document.getElementById("player-role").textContent = (player.level || "Beginner").toUpperCase() + " PLAYER";
  document.getElementById("player-level").textContent = (player.level || "Beginner").toUpperCase();
  document.getElementById("player-id-badge").textContent = "ID: " + player.playerId + " \u2022 LOTTERY #" + player.lotteryNumber;
  document.getElementById("player-ovr").textContent = { Beginner: 65, Intermediate: 78, Pro: 92 }[player.level] || 70;

  // Holographic Right Panel Floating Card details
  document.getElementById("player-display-name").textContent = player.name;
  document.getElementById("player-lottery-badge").textContent = "LOTTERY #" + (player.lotteryNumber || 1);

  // Holographic Left Panel Details
  document.getElementById("player-gender").textContent = player.gender || "Male";
  document.getElementById("player-emp-id").textContent = player.playerId || "";
  document.getElementById("player-base-price").textContent = "₹ " + (player.basePrice || player.price || 2.0).toFixed(2) + " Lakhs";

  // Deterministic Stats computation based on playerId/id hash
  const hashString = String(player.playerId || player.id || player.name || '');
  let charSum = 0;
  for (let i = 0; i < hashString.length; i++) {
    charSum += hashString.charCodeAt(i);
  }
  const levelOVR = { Beginner: 65, Intermediate: 78, Pro: 92 }[player.level] || 70;
  const stat1 = Math.min(99, Math.max(30, levelOVR - 4 + (charSum % 9)));
  const stat2 = Math.min(99, Math.max(30, levelOVR - 4 + ((charSum + 7) % 9)));

  const isCricket = State.tournament === "cricket";
  const label1 = isCricket ? "BATTING" : "SMASH";
  const label2 = isCricket ? "BOWLING" : "DEFENSE";

  const el1 = document.getElementById("stat-name-1");
  if (el1) {
    el1.textContent = label1;
    document.getElementById("stat-val-1").textContent = stat1 + "%";
    document.getElementById("stat-bar-1").style.width = stat1 + "%";
  }

  const el2 = document.getElementById("stat-name-2");
  if (el2) {
    el2.textContent = label2;
    document.getElementById("stat-val-2").textContent = stat2 + "%";
    document.getElementById("stat-bar-2").style.width = stat2 + "%";
  }

  const img = document.getElementById("player-img");
  img.src = "images/" + player.imageName;
  img.onerror = () => { img.src = "images/default.png"; };

  // Reset flip
  const flipCard = document.getElementById("flip-card");
  flipCard.classList.remove("flipped");

  // Reset stamp
  const stamp = document.getElementById("sold-stamp");
  stamp.classList.add("hidden");
  const circle = stamp.querySelector(".stamp-circle");
  circle.className = "stamp-circle";

  // Sell/unsold buttons
  const canAct = !player.isSold && player.status !== "unsold";
  const btnSell = document.getElementById("btn-sell");
  const btnUnsold = document.getElementById("btn-unsold");
  btnSell.disabled = !canAct;
  btnUnsold.disabled = !canAct;
  btnSell.textContent = player.isSold ? "SOLD" : "SELL";
  btnUnsold.textContent = player.status === "unsold" ? "UNSOLD" : "UNSOLD";

  // Ticket emoji
  document.getElementById("ticket-emoji").textContent = State.tournament === "cricket" ? "🏏" : "🏸";

  // Team bid buttons
  renderBidButtons();
  updateTicket();
  updateBidButtonStyles();

  // Timer reset
  resetTimer(15, "bidding");

  switchView("detail");

  // Flip animation
  setTimeout(() => {
    flipCard.classList.add("flipped");

    if (player.isSold) {
      setTimeout(() => showStamp("SOLD", player.teamName), 400);
      stopTimer();
    } else if (player.status === "unsold") {
      setTimeout(() => showStampUnsold(), 400);
      stopTimer();
    } else {
      setTimeout(() => startTimer(), 500);
      Sound.speak("Now auctioning " + player.name + ", level " + player.level + ", base price " + player.price + " Lakhs.");
    }
  }, 200);
}

function renderBidButtons() {
  const row = document.getElementById("team-bid-row");
  row.innerHTML = "";
  Object.entries(State.teams).forEach(([code, cfg]) => {
    const btn = document.createElement("button");
    btn.className = "team-bid-btn";
    btn.dataset.team = code;
    btn.style.borderColor = `rgba(${hexToRgb(cfg.color)}, 0.4)`;
    btn.style.setProperty("--team-color", cfg.color || "var(--accent)");
    btn.innerHTML = `<span class="team-bid-emblem">${getTeamTreeIcon(code)}</span><span class="team-bid-copy"><strong>${code}</strong><small>${cfg.name || "Team"}</small></span>`;
    btn.addEventListener("click", () => placeBid(code));
    row.appendChild(btn);
  });
}

function placeBid(team) {
  const player = State.selectedPlayer;
  if (!player || player.isSold || player.status === "unsold") return;

  if (State.selectedTeam === team) {
    return; // Prevent consecutive bids from the same team
  }

  const isFirstBid = !State.selectedTeam;
  const nextPrice = isFirstBid ? player.price : (player.price + (player.price >= 20 ? 1.0 : 0.5));

  const validationResult = AuctionValidator.validateAll(team, nextPrice);
  if (!validationResult.valid) {
    alert(validationResult.message);
    return;
  }

  State.selectedTeam = team;
  player.price = nextPrice;

  Sound.bid();
  Sound.speak(team + " bids " + player.price.toFixed(1) + " Lakhs.");

  resetTimer(State.config.timerDuration || 15, "bidding");
  startTimer();

  State.savePlayers();
  updateBidButtonStyles();
  updateTicket();
}


function adjustBidAmount(step) {
  const player = State.selectedPlayer;
  if (!player || player.isSold || player.status === "unsold") return;

  const basePrice = player.basePrice || getLevelBasePrice(player.level);
  const nextPrice = Math.round((player.price + step) * 100) / 100;
  if (nextPrice < basePrice) return;

  if (State.selectedTeam) {
    const validationResult = AuctionValidator.validateAll(State.selectedTeam, nextPrice);
    if (!validationResult.valid) {
      alert(validationResult.message);
      return;
    }
  }

  player.price = nextPrice;
  State.savePlayers();
  updateTicket();
}
function updateTicket() {
  const player = State.selectedPlayer;
  if (!player) return;
  document.getElementById("ticket-amount").textContent = "\u20B9 " + player.price.toFixed(2) + " Lakhs";

  const teamNameEl = document.getElementById("ticket-team-name");
  const historyEl = document.getElementById("bid-history-list");
  const activeCode = player.isSold ? player.teamName : State.selectedTeam;
  const activeTeam = activeCode ? State.teams[activeCode] : null;

  if (player.isSold) document.getElementById("ticket-team").textContent = player.teamName;
  else if (player.status === "unsold") document.getElementById("ticket-team").textContent = "UNSOLD PLAYER";
  else document.getElementById("ticket-team").textContent = activeCode || "NO BIDS YET";

  if (teamNameEl) {
    if (activeTeam) teamNameEl.textContent = activeTeam.name || activeCode;
    else if (player.status === "unsold") teamNameEl.textContent = "No winning bid";
    else teamNameEl.textContent = "Select a team below";
  }

  if (historyEl) {
    if (activeTeam) {
      historyEl.innerHTML = `<div class="bid-history-row"><strong>\u20B9${player.price.toFixed(2)}L</strong><span>${activeTeam.emoji || ''} ${activeTeam.name || activeCode}</span><em>Current</em></div>`;
    } else {
      historyEl.innerHTML = '<div class="bid-history-empty">No bids yet</div>';
    }
  }
}

function updateBidButtonStyles() {
  const player = State.selectedPlayer;
  document.querySelectorAll(".team-bid-btn").forEach(btn => {
    const code = btn.dataset.team;
    const cfg = State.teams[code];
    if (!cfg) return;
    const isSelected = code === State.selectedTeam;
    if (isSelected) {
      btn.classList.add("selected");
      btn.style.background = cfg.color;
      btn.style.color = "#000";
      btn.style.borderColor = cfg.color;
      btn.style.boxShadow = `0 0 16px rgba(${hexToRgb(cfg.color)}, 0.5)`;
    } else {
      btn.classList.remove("selected");
      btn.style.background = "";
      btn.style.color = "";
      btn.style.borderColor = `rgba(${hexToRgb(cfg.color)}, 0.4)`;
      btn.style.boxShadow = "";
    }
    btn.style.pointerEvents = (player && (player.isSold || player.status === "unsold")) ? "none" : "auto";
  });
  document.querySelectorAll("[data-step]").forEach(btn => {
    btn.disabled = !!(player && (player.isSold || player.status === "unsold"));
  });
}

function showStamp(text, team) {
  const overlay = document.getElementById("sold-stamp");
  overlay.classList.remove("hidden");
  const circle = overlay.querySelector(".stamp-circle");
  circle.className = "stamp-circle";

  if (text === "SOLD" && team && State.teams[team]) {
    const tCfg = State.teams[team];
    document.getElementById("stamp-text").textContent = tCfg.emoji + " " + team;
    document.getElementById("stamp-team").textContent = tCfg.name || "";
  } else {
    document.getElementById("stamp-text").textContent = text;
    document.getElementById("stamp-team").textContent = team || "";
  }

  setTimeout(() => circle.classList.add("slammed"), 50);
}

function showStampUnsold() {
  showStamp("UNSOLD", "");
  document.getElementById("sold-stamp").querySelector(".stamp-circle").classList.add("unsold-stamp");
}

function doSell() {
  const player = State.selectedPlayer;
  const team = State.selectedTeam;
  if (!player || !team || player.isSold) return;

  const validationResult = AuctionValidator.validateAll(team, player.price);
  if (!validationResult.valid) {
    alert(validationResult.message);
    return;
  }

    stopTimer();
    player.isSold = true; player.status = "sold"; player.teamName = team;
    State.savePlayers();

    // Log purchase in activity history
    const now = new Date();
    const timestampStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const activityItem = {
      teamCode: team,
      playerName: player.name,
      price: player.price,
      timestamp: timestampStr
    };
    if (!State.activityHistory) State.activityHistory = [];
    State.activityHistory.unshift(activityItem);
    State.saveActivityHistory();

    Sound.sold();
    Sound.speak("Sold! " + player.name + " purchased by " + State.teams[team].name + " for " + player.price.toFixed(2) + " Lakhs.");

    document.getElementById("btn-sell").textContent = "SOLD";
    document.getElementById("btn-sell").disabled = true;
    document.getElementById("btn-unsold").disabled = true;
    updateTicket();
    setTimeout(() => showStamp("SOLD", team), 100);

    // Check if current round is now complete
    setTimeout(() => checkRoundCompletion(), 600);

    // Always navigate back to live pool section
    setTimeout(() => {
      if (State.view !== "detail") return;
      renderPool();
      switchView("pool");
    }, 800);
}

function doUnsold() {
  const player = State.selectedPlayer;
  if (!player || player.isSold) return;

  stopTimer();
  player.isSold = false;
  player.status = State.config.unsoldHandling === "permanent" ? "unsold_permanent" : "unsold";
  player.teamName = "";
  State.savePlayers();

  Sound.warn();
  Sound.speak(player.name + " is unsold.");

  document.getElementById("btn-sell").disabled = true;
  document.getElementById("btn-unsold").disabled = true;
  updateTicket();
  setTimeout(() => showStampUnsold(), 100);

  // Check if current round is now complete
  setTimeout(() => checkRoundCompletion(), 600);

  // Always navigate back to live pool section
  setTimeout(() => {
    if (State.view !== "detail") return;
    renderPool();
    switchView("pool");
  }, 800);
}

// ── DASHBOARD ─────────────────────────────────────────
function getTeamSummary() {
  return Object.entries(State.teams).map(([code, cfg]) => {
    const players = State.players.filter(p => p.teamName === code && p.isSold);
    const spent = players.reduce((s, p) => s + p.price, 0);
    const purse = cfg.purse || AUCTION_LIMITS.teamBudget;
    const remaining = Math.max(0, purse - spent);
    return { code, cfg, players, spent, remaining, purse };
  });
}

function renderDashboard() {
  const summary = getTeamSummary();

  // 1. Stats Calculations
  const totalSpent = summary.reduce((s, t) => s + t.spent, 0);
  const totalSold = summary.reduce((s, t) => s + t.players.length, 0);
  const totalPurse = summary.reduce((s, t) => s + t.purse, 0);
  const remainingBudget = Math.max(0, totalPurse - totalSpent);

  const avgSpendPlayerVal = totalSold > 0 ? (totalSpent / totalSold) : 0;
  const budgetUtilizedPct = totalPurse > 0 ? Math.round((totalSpent / totalPurse) * 100) : 0;

  // 2. Bind top KPIs row
  const totalBudgetEl = document.getElementById("stat-total-budget");
  if (totalBudgetEl) totalBudgetEl.textContent = formatPurse(totalPurse);

  const utilEl = document.getElementById("stat-util");
  if (utilEl) utilEl.textContent = formatPurse(totalSpent);

  const utilDonut = document.getElementById("stat-util-donut");
  if (utilDonut) {
    utilDonut.style.setProperty("--pct", `${budgetUtilizedPct}%`);
    document.getElementById("stat-util-text").textContent = `${budgetUtilizedPct}%`;
  }

  const avgEl = document.getElementById("stat-avg");
  if (avgEl) avgEl.textContent = `₹ ${avgSpendPlayerVal.toFixed(2)} L`;

  const soldPlayersEl = document.getElementById("stat-sold-players");
  if (soldPlayersEl) soldPlayersEl.textContent = totalSold;

  // 3. Render Team Summary Table
  const tbody = document.getElementById("dashboard-tbody");
  tbody.innerHTML = "";
  summary.forEach(t => {
    const pct = Math.min(100, (t.spent / t.purse) * 100).toFixed(0);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="team-summary-badge" style="background:${t.cfg.color}15; border:1px solid ${t.cfg.color}40; color:${t.cfg.color}; display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:8px; font-size:18px;">
            ${t.cfg.emoji}
          </span>
          <div>
            <strong style="color:${t.cfg.color}; font-size:14px; font-weight:800;">${t.code}</strong><br>
            <small style="color:rgba(255,255,255,0.4); font-size:11px;">${t.cfg.name}</small>
          </div>
        </div>
      </td>
      <td style="text-align:center; font-weight:700;">${t.players.length} / ${teamValidator.validateTeam(t.code, t.players).maxAllowed}</td>
      <td class="color-gold" style="font-weight:700;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span>${formatPurse(t.spent)}</span>
          <div class="budget-bar-wrap" style="height:4px; border-radius:2px; background:rgba(255,255,255,0.06); overflow:hidden; width:120px;">
            <div class="budget-bar-fill" style="height:100%; width:${pct}%; background:${t.cfg.color}; border-radius:2px; transition:width 0.6s ease;"></div>
          </div>
        </div>
      </td>
      <td class="color-green" style="font-weight:700;">${formatPurse(t.remaining)}</td>
      <td style="text-align:center; vertical-align:middle; display:flex; justify-content:center; align-items:center; padding-top: 14px;">
        <div class="purse-used-circle" style="--team-color:${t.cfg.color}; --pct:${pct}%;">
          <span>${pct}%</span>
        </div>
      </td>`;
    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => { loadTeamTree(t.code); switchView("teams"); });
    tbody.appendChild(tr);
  });

  // 4. Render Budget Utilization Donut Diagram
  const donutWheel = document.getElementById("db-donut-wheel");
  const donutWheelVal = document.getElementById("db-donut-wheel-val");
  const donutLegend = document.getElementById("db-donut-legend");
  if (donutWheel && donutWheelVal && donutLegend) {
    donutWheelVal.textContent = formatPurse(totalSpent);

    // Calculate conic gradients sectors
    let accumPercent = 0;
    const conicSlices = [];
    summary.forEach(t => {
      const slicePct = totalSpent > 0 ? (t.spent / totalSpent) * 100 : 0;
      if (slicePct > 0) {
        conicSlices.push(`${t.cfg.color} ${accumPercent}% ${(accumPercent + slicePct)}%`);
        accumPercent += slicePct;
      }
    });

    if (conicSlices.length > 0) {
      donutWheel.style.backgroundImage = `conic-gradient(${conicSlices.join(", ")})`;
    } else {
      donutWheel.style.backgroundImage = `conic-gradient(rgba(255,255,255,0.08) 0% 100%)`;
    }

    // Legend
    donutLegend.innerHTML = summary.map(t => {
      const slicePct = totalSpent > 0 ? Math.round((t.spent / totalSpent) * 100) : 0;
      return `
        <div class="db-donut-legend-item">
          <span class="dot" style="background:${t.cfg.color};"></span>
          <span class="lbl">${t.cfg.name}</span>
          <span class="spent">${formatPurse(t.spent)}</span>
          <span class="pct">${slicePct}%</span>
        </div>
      `;
    }).join("");
  }

  // 5. Render Spend Comparison Area Curve Graph
  const graphSvg = document.getElementById("db-graph-svg");
  const graphArea = document.getElementById("db-graph-area");
  const graphLine = document.getElementById("db-graph-line");
  const graphValues = document.getElementById("db-graph-values");
  const graphXAxis = document.getElementById("db-graph-x-axis");

  if (graphSvg && graphArea && graphLine && graphValues && graphXAxis) {
    const maxVal = 10; // y-axis limit is 10 Cr (1000 Lakhs)
    const width = 400;
    const height = 130;

    const points = [];
    const pad = 20; // horizontal padding offset inside 400px svg width
    const step = (width - pad * 2) / Math.max(1, (summary.length - 1));

    summary.forEach((t, idx) => {
      const x = pad + idx * step;
      const spentLakhs = t.spent;
      const spentCr = spentLakhs / 100;
      const y = height - (Math.min(maxVal, spentCr) / maxVal) * height;
      points.push({ x, y, teamCode: t.code, color: t.cfg.color, val: spentCr });
    });

    if (points.length > 0) {
      // Build lines path
      let linePath = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        linePath += ` L ${points[i].x} ${points[i].y}`;
      }
      graphLine.setAttribute("d", linePath);

      // Build filled area path
      const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
      graphArea.setAttribute("d", areaPath);

      // Float labels and ticks
      graphValues.innerHTML = points.map(p => `
        <span class="db-graph-float-val" style="left:${(p.x / width) * 100}%; top:${((p.y - 12) / height) * 100}%; color:${p.color};">
          ${p.val.toFixed(2)} Cr
        </span>
      `).join("");

      graphXAxis.innerHTML = points.map(p => `
        <span class="db-graph-x-tick" style="left:${(p.x / width) * 100}%;">
          <span class="badge" style="border-color:${p.color}40; color:${p.color};">${p.teamCode}</span>
        </span>
      `).join("");
    }
  }

  // 6. Bind Tournament Overview block
  const totalRegistered = State.players.filter(p => p.isRegistered).length;
  const totalUnsold = State.players.filter(p => p.status === "unsold" && p.isRegistered).length;

  const b1 = document.getElementById("db-over-total"); if (b1) b1.textContent = totalRegistered;
  const b2 = document.getElementById("db-over-teams"); if (b2) b2.textContent = summary.length;
  const b3 = document.getElementById("db-over-sold"); if (b3) b3.textContent = totalSold;
  const b4 = document.getElementById("db-over-unsold"); if (b4) b4.textContent = totalUnsold;
  const b5 = document.getElementById("db-over-spent"); if (b5) b5.textContent = formatPurse(totalSpent);
  const b6 = document.getElementById("db-over-remaining"); if (b6) b6.textContent = formatPurse(remainingBudget);
  const b7 = document.getElementById("db-over-avg-team"); if (b7) b7.textContent = formatPurse(summary.length > 0 ? (totalSpent / summary.length) : 0);
  const b8 = document.getElementById("db-over-avg-player"); if (b8) b8.textContent = `₹ ${avgSpendPlayerVal.toFixed(2)} L`;

  // 7. Render Unsold Players Grid
  const unsoldGrid = document.getElementById("unsold-grid");
  unsoldGrid.innerHTML = "";
  const unsold = State.players.filter(p => p.status === "unsold" && p.isRegistered);
  if (unsold.length === 0) {
    unsoldGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:rgba(255,255,255,0.35); font-size:13px; padding:24px;">No unsold players yet in this tournament.</div>';
  } else {
    unsold.forEach(p => {
      const c = document.createElement("div");
      c.className = "db-unsold-card-wrapper";
      c.innerHTML = `
        <div class="db-unsold-card">
          <div class="db-unsold-avatar-wrap">
            <img src="images/${p.imageName || 'default.png'}" onerror="this.src='images/default.png'" alt="${p.name}">
            <span class="db-unsold-ovr-badge">${p.lotteryNumber || ''}</span>
          </div>
          <strong class="name">${p.name}</strong>
          <span class="level">${p.level}</span>
          <div class="meta">
            <span>Base Price</span>
            <strong>₹ ${p.basePrice.toFixed(2)} L</strong>
          </div>
        </div>
      `;
      unsoldGrid.appendChild(c);
    });
  }
}

// ── TEAM TREES ────────────────────────────────────────
let activeTeamTreeCode = "";

function teamTreeEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[ch]));
}

function getTeamTreePlayers(code) {
  return State.players.filter(p => p.teamName === code && p.isSold);
}

function getTeamTreeIcon(code) {
  const icons = {
    RK: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 6 5 12h10l5-12-6 5-4-7-4 7-6-5Z"/><path d="M5 21h14"/></svg>',
    RB: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 16.5c-1.2 1.2-1.8 3-1.5 4.5 1.5.3 3.3-.3 4.5-1.5"/><path d="M9 15 4 10l6-1 5-5c2-2 4.5-2.5 6-1-1.5 1.5-1 4-3 6l-5 5-1 6-5-5Z"/><path d="m14 6 4 4"/></svg>',
    SS: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2Z"/></svg>',
    SH: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>'
  };
  return icons[code] || '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 7v6c0 4.4 3.4 7.4 8 9 4.6-1.6 8-4.6 8-9V7l-8-4Z"/></svg>';
}

class TournamentConfigService {
  constructor() {
    this.config = {
      totalTeams: 0,
      totalPlayers: 0,
      minPlayersPerTeam: 0,
      maxPlayersPerTeam: 0,
      male: { min: 0, max: 0 },
      female: { min: 0, max: 0 },
      categories: {
        Advanced: { min: 0, max: 0 },
        Intermediate: { min: 0, max: 0 },
        Beginner: { min: 0, max: 0 }
      }
    };
  }

  loadConfig() {
    const activePlayers = State.players.length; 
    const activeTeams = Object.keys(State.teams).length || 1;

    this.config.totalPlayers = activePlayers;
    this.config.totalTeams = activeTeams;
    
    this.config.minPlayersPerTeam = Math.floor(activePlayers / activeTeams);
    this.config.maxPlayersPerTeam = Math.ceil(activePlayers / activeTeams);

    const totalMale = State.players.filter(p => (p.gender || "Male").toLowerCase().startsWith("m")).length;
    const totalFemale = State.players.filter(p => (p.gender || "Male").toLowerCase().startsWith("f")).length;

    this.config.male.min = Math.floor(totalMale / activeTeams);
    this.config.male.max = Math.ceil(totalMale / activeTeams);
    
    this.config.female.min = Math.floor(totalFemale / activeTeams);
    this.config.female.max = Math.ceil(totalFemale / activeTeams);

    const totalPro = State.players.filter(p => p.level === "Pro").length;
    const totalInter = State.players.filter(p => p.level === "Intermediate").length;
    const totalBeginner = State.players.filter(p => p.level === "Beginner").length;

    this.config.categories.Advanced.min = Math.floor(totalPro / activeTeams);
    this.config.categories.Advanced.max = Math.ceil(totalPro / activeTeams);
    this.config.categories.Intermediate.min = Math.floor(totalInter / activeTeams);
    this.config.categories.Intermediate.max = Math.ceil(totalInter / activeTeams);
    this.config.categories.Beginner.min = Math.floor(totalBeginner / activeTeams);
    this.config.categories.Beginner.max = Math.ceil(totalBeginner / activeTeams);
  }

  getConfig() {
    this.loadConfig();
    return this.config;
  }
}

class TournamentValidator {
  constructor(configService) {
    this.configService = configService;
  }

  calculateDistribution() {
    const config = this.configService.getConfig();
    const totalPlayers = config.totalPlayers;
    const totalTeams = config.totalTeams;
    
    if (totalTeams === 0) return { maxLargeTeams: 0, baseSize: 0, largeSize: 0, totalTeams: 0 };

    const baseSize = Math.floor(totalPlayers / totalTeams);
    const remainder = totalPlayers % totalTeams;
    
    const largeSize = baseSize + 1;
    const maxLargeTeams = remainder;

    return {
      baseSize,
      largeSize,
      maxLargeTeams,
      totalTeams
    };
  }
  
  getGlobalValidationState() {
    const distribution = this.calculateDistribution();
    
    let largeTeamsCount = 0;
    const teamSizes = {};
    
    for (const teamCode of Object.keys(State.teams)) {
      const players = getTeamTreePlayers(teamCode);
      teamSizes[teamCode] = players.length;
      if (players.length >= distribution.largeSize && distribution.largeSize > distribution.baseSize) {
        largeTeamsCount++;
      }
    }

    return {
      distribution,
      largeTeamsCount,
      teamSizes
    };
  }
}

class ValidationResult {
  constructor(valid, reason = "", dynamicLimit = null) {
    this.valid = valid;
    this.reason = reason;
    this.dynamicLimit = dynamicLimit;
  }
}

class ValidationMessageService {
  static getMessage(result) {
    if (result.valid) return "Valid";
    return result.reason;
  }
}

class TeamValidator {
  constructor(tournamentValidator, configService) {
    this.tournamentValidator = tournamentValidator;
    this.configService = configService;
  }

  validateTeam(teamCode, currentPlayers, potentialNewPlayer = null) {
    const config = this.configService.getConfig();
    const globalState = this.tournamentValidator.getGlobalValidationState();
    const dist = globalState.distribution;
    
    const players = [...currentPlayers];
    if (potentialNewPlayer) {
      players.push(potentialNewPlayer);
    }
    
    const size = players.length;
    
    let maxAllowedForThisTeam = dist.baseSize;
    const isCurrentlyLarge = currentPlayers.length >= dist.largeSize;
    if (dist.largeSize > dist.baseSize) {
       if (isCurrentlyLarge || globalState.largeTeamsCount < dist.maxLargeTeams) {
         maxAllowedForThisTeam = dist.largeSize;
       }
    }

    if (config.maxPlayersPerTeam && maxAllowedForThisTeam > config.maxPlayersPerTeam) {
      maxAllowedForThisTeam = config.maxPlayersPerTeam;
    }

    let teamSizeValid = true;
    let teamSizeReason = "";
    if (size > maxAllowedForThisTeam) {
      teamSizeValid = false;
      if (maxAllowedForThisTeam === dist.baseSize && dist.largeSize > dist.baseSize) {
        teamSizeReason = `Only ${dist.maxLargeTeams} teams can have ${dist.largeSize} players. This team can only have ${maxAllowedForThisTeam} players.`;
      } else {
        teamSizeReason = `Team has reached its maximum allowed players (${maxAllowedForThisTeam}).`;
      }
    }

    const maleCount = players.filter(p => (p.gender || "").toLowerCase() === "male").length;
    const femaleCount = players.filter(p => (p.gender || "").toLowerCase() === "female").length;
    const advCount = players.filter(p => normalizeLevel(p.level) === "Pro" || normalizeLevel(p.level) === "Advanced").length;
    const intCount = players.filter(p => normalizeLevel(p.level) === "Intermediate").length;
    const begCount = players.filter(p => normalizeLevel(p.level) === "Beginner").length;

    const maleValid = true;
    const femaleValid = true;
    const advValid = true;
    const intValid = true;
    const begValid = true;

    return {
      valid: teamSizeValid,
      overallReason: teamSizeReason,
      teamSize: new ValidationResult(teamSizeValid, teamSizeReason, maxAllowedForThisTeam),
      male: new ValidationResult(maleValid, "", config.male.max),
      female: new ValidationResult(femaleValid, "", config.female.max),
      advanced: new ValidationResult(advValid, "", config.categories.Advanced.max),
      intermediate: new ValidationResult(intValid, "", config.categories.Intermediate.max),
      beginner: new ValidationResult(begValid, "", config.categories.Beginner.max),
      counts: { maleCount, femaleCount, proCount: advCount, intermediateCount: intCount, beginnerCount: begCount, totalCount: size },
      maxAllowed: maxAllowedForThisTeam
    };
  }
}

const tournamentConfigService = new TournamentConfigService();
const tournamentValidator = new TournamentValidator(tournamentConfigService);
const teamValidator = new TeamValidator(tournamentValidator, tournamentConfigService);

function getTeamValidation(players, teamCode) {
  if (!teamCode && players.length > 0) {
    teamCode = players[0].teamName;
  }
  const result = teamValidator.validateTeam(teamCode || "UNKNOWN", players);
  const effectiveMax = result.maxAllowed;
  const teamComplete = result.teamSize.valid && players.length >= effectiveMax;

  return {
    teamSize: { valid: teamComplete, min: 0, max: effectiveMax },
    genderBalance: true,
    levelBalance: true,
    counts: result.counts
  };
}

function normalizeLevel(level) {
  const value = String(level || "Beginner").trim().toLowerCase();
  if (value === "pro" || value === "advanced" || value === "advance" || value === "expert") return "Pro";
  if (value === "intermediate" || value === "mid") return "Intermediate";
  return "Beginner";
}

function renderTeamCards(preferredCode = activeTeamTreeCode) {
  const grid = document.getElementById("team-cards-grid");

  const treeView = document.getElementById("team-tree-view");
  grid.innerHTML = "";
  treeView.classList.remove("hidden");

  const teamEntries = Object.entries(State.teams);
  if (teamEntries.length === 0) {
    grid.innerHTML = '<div class="tree-empty-state">No teams configured yet.</div>';
    document.getElementById("tree-players").innerHTML = '<div class="tree-empty-state">Create teams in Admin Console to build a hierarchy.</div>';
    return;
  }

  const firstCode = teamEntries[0][0];
  const selectedCode = State.teams[preferredCode] ? preferredCode : firstCode;
  activeTeamTreeCode = selectedCode;

  teamEntries.forEach(([code, cfg]) => {
    const players = getTeamTreePlayers(code);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "team-selector-card" + (code === selectedCode ? " active" : "");
    card.dataset.teamCode = code;
    card.style.setProperty("--team-color", cfg.color || "var(--accent)");
    card.innerHTML = `
      <span class="team-selector-icon">${getTeamTreeIcon(code)}</span>
      <span class="team-selector-meta">
        <span class="team-selector-code">${teamTreeEscape(code)}</span>
        <strong>${teamTreeEscape(cfg.name || "Team")}</strong>
        <em style="margin-top:2px; font-size:11px; opacity:0.8;">${players.length} / ${teamValidator.validateTeam(code, players).maxAllowed} Players</em>
      </span>`;
    card.addEventListener("click", () => loadTeamTree(code));
    grid.appendChild(card);
  });

  loadTeamTree(selectedCode);
}

function loadTeamTree(code) {
  const cfg = State.teams[code];
  if (!cfg) return;

  activeTeamTreeCode = code;
  const btnExportSingle = document.getElementById("btn-export-single-team");
  if (btnExportSingle) btnExportSingle.dataset.code = code;

  document.querySelectorAll(".team-selector-card").forEach(card => {
    card.classList.toggle("active", card.dataset.teamCode === code);
  });

  const players = getTeamTreePlayers(code);
  const captain = players.find(p => p.isCaptain) || players[0] || null;
  const roster = captain ? players.filter(p => p.id !== captain.id) : players;
  const branches = ["Pro", "Intermediate", "Beginner"].map(level => [level, roster.filter(p => normalizeLevel(p.level) === level)]);
  const validation = getTeamValidation(players);

  document.getElementById("tree-heading").textContent = cfg.name || code;
  document.getElementById("tree-team-status").textContent = `${players.length} Players`;
  renderTeamHierarchy(code, cfg, captain, branches);
  renderTeamInsights(cfg, captain, players, validation);
  requestAnimationFrame(drawTreeConnectors);
}

function renderTeamHierarchy(code, cfg, captain, branches) {
  const container = document.getElementById("tree-players");
  const captainNode = captain ? renderCaptainNode(captain, cfg) : `
    <div class="tree-node tree-captain-node empty" data-node="captain" style="--node-color:${cfg.color || "var(--gold)"}">
      <div class="captain-avatar">${getTeamTreeIcon(code)}</div>
      <strong>No Captain</strong>
      <span>Assign a captain to begin the hierarchy</span>
    </div>`;

  container.innerHTML = `
    <div class="team-tree-org">
      <svg class="tree-connector-svg" aria-hidden="true"></svg>
      <div class="tree-captain-row">${captainNode}</div>
      <div class="tree-branches-row">${branches.map(([level, list]) => renderLevelBranch(level, list)).join("")}</div>
    </div>`;

  container.querySelectorAll("[data-player-id]").forEach(node => {
    node.addEventListener("click", () => {
      const playerId = node.dataset.playerId;
      const player = State.players.find(p => String(p.id) === playerId);
      if (player) openDetail(player);
    });
  });
}

function renderCaptainNode(player, cfg) {
  return `
    <button class="tree-node tree-captain-node" type="button" data-node="captain" data-player-id="${teamTreeEscape(player.id)}" style="--node-color:${cfg.color || "var(--gold)"}">
      <span class="captain-avatar">
        <img src="images/${teamTreeEscape(player.imageName || 'default.png')}" alt="${teamTreeEscape(player.name)}" onerror="this.src='images/default.png'">
        <span class="captain-crown">👑</span>
      </span>
      <strong>${teamTreeEscape(player.name)}</strong>
      <span>${teamTreeEscape(player.playerId || "Captain")}</span>
      <em>Captain</em>
    </button>`;
}

function renderLevelBranch(level, players) {
  const branchData = {
    Pro: { className: "pro", label: "Pro Players", color: "var(--accent)", icon: "🏆" },
    Intermediate: { className: "intermediate", label: "Intermediate Players", color: "var(--pink)", icon: "★" },
    Beginner: { className: "beginner", label: "Beginner Players", color: "var(--green)", icon: "♟" }
  }[level];
  const playerMarkup = players.length
    ? players.map(player => renderTreePlayer(player)).join("")
    : '<div class="tree-no-players">No Players Assigned</div>';

  return `
    <section class="tree-level-branch ${branchData.className}" data-node="branch" style="--branch-color:${branchData.color}">
      <div class="tree-level-header">
        <span>${branchData.icon}</span>
        <strong>${branchData.label}</strong>
        <em>${players.length} / ${getLevelTargetCount(level)}</em>
      </div>
      <div class="tree-player-list">
        ${playerMarkup}
      </div>
    </section>`;
}

function renderTreePlayer(player) {
  const gender = String(player.gender || "").toLowerCase();
  const genderSymbol = gender === "female" ? "&#9792;" : "&#9794;";
  return `
    <button class="tree-node tree-player-card" type="button" data-node="player" data-player-id="${teamTreeEscape(player.id)}">
      <img class="tree-player-img" src="images/${teamTreeEscape(player.imageName || "default.png")}" onerror="this.src='images/default.png'" alt="">
      <span class="tree-player-info">
        <strong class="tree-player-name">${teamTreeEscape(player.name)}</strong>
        <small>${teamTreeEscape(player.playerId || "")}</small>
      </span>
      <span class="tree-gender-icon ${gender === "female" ? "female" : "male"}">${genderSymbol}</span>
    </button>`;
}

function getLevelTargetCount(level) {
  const keyMap = {
    Pro: "MaxProPlayers",
    Intermediate: "MaxIntermediatePlayers",
    Beginner: "MaxBeginnerPlayers"
  };
  return Number(State.config?.[keyMap[level]]) || 0;
}

function renderTeamInsights(cfg, captain, players, validation) {
  const counts = validation.counts;
  const result = teamValidator.validateTeam(null, players);
  const maxSquadSize = result.maxAllowed;
  const total = players.length || 0;
  const proPct = total ? Math.round((counts.proCount / total) * 100) : 0;
  const intermediatePct = total ? Math.round((counts.intermediateCount / total) * 100) : 0;
  const beginnerPct = total ? Math.max(0, 100 - proPct - intermediatePct) : 0;
  const donutStyle = `--pro:${proPct}%; --intermediate:${proPct + intermediatePct}%;`;

  document.getElementById("team-summary-content").innerHTML = `
    ${renderSummaryRow("Total Players", total)}
    ${renderSummaryRow("Male Players", counts.maleCount)}
    ${renderSummaryRow("Female Players", counts.femaleCount)}
    ${renderSummaryRow("Team Completion", `${total}/${maxSquadSize}`)}
    ${renderSummaryRow("Captain", captain ? captain.name : "Not Assigned")}`;

  document.getElementById("level-distribution-content").innerHTML = `
    <div class="donut-wrap">
      <div class="level-donut" style="${donutStyle}"><span>${total}<small>Total</small></span></div>
      <div class="level-legend">
        ${renderLegendRow("Pro", counts.proCount, proPct, "pro")}
        ${renderLegendRow("Intermediate", counts.intermediateCount, intermediatePct, "intermediate")}
        ${renderLegendRow("Beginner", counts.beginnerCount, beginnerPct, "beginner")}
      </div>
    </div>`;

  document.getElementById("validation-status-content").innerHTML = `
    ${renderValidationRow("Team Size Validation", validation.teamSize.valid)}
    ${renderValidationRow("Gender Balance Validation", validation.genderBalance)}
    ${renderValidationRow("Level Balance Validation", validation.levelBalance)}`;
}

function renderSummaryRow(label, value) {
  return `<div class="summary-row"><span>${teamTreeEscape(label)}</span><strong>${teamTreeEscape(value)}</strong></div>`;
}

function renderLegendRow(label, count, pct, className) {
  return `<div class="legend-row"><span class="legend-dot ${className}"></span><span>${label}</span><strong>${count} (${pct}%)</strong></div>`;
}

function renderValidationRow(label, valid) {
  return `<div class="validation-row ${valid ? "valid" : "invalid"}"><span>${label}</span><strong>${valid ? "&#10003; Valid" : "&#10007; Invalid"}</strong></div>`;
}

function drawTreeConnectors() {
  const org = document.querySelector(".team-tree-org");
  const svg = org?.querySelector(".tree-connector-svg");
  const captain = org?.querySelector('[data-node="captain"]');
  if (!org || !svg || !captain) return;

  const orgRect = org.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${orgRect.width} ${orgRect.height}`);
  svg.setAttribute("width", orgRect.width);
  svg.setAttribute("height", orgRect.height);
  svg.innerHTML = "";

  const captainRect = captain.getBoundingClientRect();
  const startX = captainRect.left - orgRect.left + captainRect.width / 2;
  const startY = captainRect.bottom - orgRect.top;
  const headers = [...org.querySelectorAll(".tree-level-header")];
  if (!headers.length) return;

  const headerRects = headers.map(header => header.getBoundingClientRect());
  const branchY = Math.min(...headerRects.map(rect => rect.top - orgRect.top));
  const elbowY = startY + Math.max(30, (branchY - startY) / 2);
  const firstX = headerRects[0].left - orgRect.left + headerRects[0].width / 2;
  const lastRect = headerRects[headerRects.length - 1];
  const lastX = lastRect.left - orgRect.left + lastRect.width / 2;

  addConnectorPath(svg, `M ${startX} ${startY} V ${elbowY}`, "rgba(255,255,255,0.55)", true);
  addConnectorPath(svg, `M ${firstX} ${elbowY} H ${lastX}`, "rgba(255,255,255,0.55)", true);

  headers.forEach(header => {
    const branch = header.closest('[data-node="branch"]');
    const headerRect = header.getBoundingClientRect();
    const branchX = headerRect.left - orgRect.left + headerRect.width / 2;
    const color = getComputedStyle(branch).getPropertyValue("--branch-color").trim() || "#00dcff";
    addConnectorPath(svg, `M ${branchX} ${elbowY} V ${headerRect.top - orgRect.top}`, color, true);

    branch.querySelectorAll('[data-node="player"]').forEach(player => {
      const playerRect = player.getBoundingClientRect();
      const x1 = headerRect.left - orgRect.left + 13;
      const y1 = headerRect.bottom - orgRect.top;
      const y2 = playerRect.top - orgRect.top + playerRect.height / 2;
      const x2 = playerRect.left - orgRect.left;
      addConnectorPath(svg, `M ${x1} ${y1} V ${y2} H ${x2}`, color, false);
    });
  });
}

function addConnectorPath(svg, d, color, major) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", major ? "2.4" : "1.6");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("opacity", major ? "0.9" : "0.65");
  svg.appendChild(path);
}

window.addEventListener("resize", () => {
  if (State.view === "teams") requestAnimationFrame(drawTreeConnectors);
});

// ADMIN MODULAR COMMAND CENTER
let registrySearch = "";
let registryCategory = "all";
let registryStatus = "all";
let registryEligibility = "all";
let registryPage = 1;
const registryPageSize = 10;
let tempImportPlayers = null;

function renderAdmin() {
  const activeModule = State.activeAdminModule || "registry";
  switchAdminModule(activeModule);
}

function switchAdminModule(moduleName) {
  State.activeAdminModule = moduleName;
  localStorage.setItem("KPL_ACTIVE_ADMIN_MODULE", moduleName);

  // Update sidebar active buttons
  document.querySelectorAll(".admin-sidebar-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.module === moduleName);
  });

  // Hide all panels, show the selected one
  document.querySelectorAll(".admin-module-panel").forEach(panel => {
    panel.classList.add("hidden");
  });

  const targetPanel = document.getElementById("module-" + moduleName);
  if (targetPanel) {
    targetPanel.classList.remove("hidden");
  }

  // Trigger specific rendering functions
  if (moduleName === "registry") renderRegistryTable();
  else if (moduleName === "teams") renderTeamsList();
  else if (moduleName === "captains") renderAdminCaptains();
  else if (moduleName === "rounds") renderRoundsPanel();
  else if (moduleName === "import") renderImportModule();
  else if (moduleName === "config") renderConfigModule();
  else if (moduleName === "settings") renderSettingsModule();
}

// ── MODULE 1: PLAYER REGISTRY ──
function renderRegistryTable() {
  const tbody = document.getElementById("registry-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const search = registrySearch.toLowerCase();
  let filtered = State.players.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.playerId.toLowerCase().includes(search)
  );

  if (registryCategory !== "all") {
    filtered = filtered.filter(p => p.level === registryCategory);
  }

  if (registryStatus !== "all") {
    if (registryStatus === "available") {
      filtered = filtered.filter(p => !p.isSold && p.status !== "unsold");
    } else if (registryStatus === "sold") {
      filtered = filtered.filter(p => p.isSold);
    } else if (registryStatus === "unsold") {
      filtered = filtered.filter(p => p.status === "unsold" || p.status === "unsold_permanent");
    }
  }

  if (registryEligibility !== "all") {
    if (registryEligibility === "eligible") {
      filtered = filtered.filter(p => p.isRegistered);
    } else if (registryEligibility === "ineligible") {
      filtered = filtered.filter(p => !p.isRegistered);
    }
  }

  // Sort: basePrice DESC, name ASC (by default or keep current state order)
  filtered.sort((a, b) => {
    if (b.basePrice !== a.basePrice) return b.basePrice - a.basePrice;
    return (a.name || "").localeCompare(b.name || "");
  });

  const totalPlayers = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalPlayers / registryPageSize));

  if (registryPage > totalPages) registryPage = totalPages;
  if (registryPage < 1) registryPage = 1;

  const startIdx = (registryPage - 1) * registryPageSize;
  const endIdx = startIdx + registryPageSize;
  const pagePlayers = filtered.slice(startIdx, endIdx);

  // Update pagination UI
  const prevBtn = document.getElementById("reg-prev-btn");
  const nextBtn = document.getElementById("reg-next-btn");
  const pageInfo = document.getElementById("reg-page-info");

  if (prevBtn) prevBtn.disabled = registryPage === 1;
  if (nextBtn) nextBtn.disabled = registryPage === totalPages;
  if (pageInfo) pageInfo.textContent = `Page ${registryPage} of ${totalPages} (${totalPlayers} total)`;

  if (pagePlayers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: rgba(255,255,255,0.3)">No players found matching current filters.</td></tr>`;
    return;
  }

  pagePlayers.forEach(p => {
    const tr = document.createElement("tr");

    // Status label
    let statusText = "Available";
    if (p.isCaptain) statusText = `Captain (${p.teamName})`;
    else if (p.isSold) statusText = `Sold (${p.teamName} - ₹${p.price}L)`;
    else if (p.status === "unsold") statusText = "Unsold (Returned)";
    else if (p.status === "unsold_permanent") statusText = "Unsold (Permanent)";

    // Captain eligibility logic
    const isCaptEligible = p.isRegistered && !p.isCaptain && !p.isSold;
    const captEligibleText = isCaptEligible
      ? `<span style="color:var(--green)">Yes</span>`
      : `<span style="color:rgba(255,255,255,0.3)">No</span>`;

    tr.innerHTML = `
      <td>${p.playerId}</td>
      <td><strong>${p.name}</strong></td>
      <td><span class="gender-badge gender-${(p.gender || "Male").toLowerCase()}" style="font-size:10px; padding:2px 6px; border-radius:4px; font-weight:600;">${(p.gender || "Male").toUpperCase()}</span></td>
      <td><span class="level-badge level-${(p.level || "Beginner").toLowerCase()}" style="font-size:10px; padding:2px 6px; border-radius:4px;">${(p.level || "Beginner").toUpperCase()}</span></td>
      <td>₹${p.basePrice}L</td>
      <td>
        <div class="form-check" style="justify-content:center;">
          <input type="checkbox" class="inline-eligibility-chk" data-id="${p.id}" ${p.isRegistered ? "checked" : ""}>
        </div>
      </td>
      <td>${captEligibleText}</td>
      <td><span style="color: ${p.isSold ? "var(--green)" : p.status.startsWith("unsold") ? "var(--danger)" : "var(--accent)"}">${statusText}</span></td>
    `;
    tbody.appendChild(tr);
  });

  // Attach checkbox listeners
  tbody.querySelectorAll(".inline-eligibility-chk").forEach(chk => {
    chk.addEventListener("change", e => {
      const pid = parseInt(e.target.dataset.id);
      const player = State.players.find(p => p.id === pid);
      if (player) {
        player.isRegistered = e.target.checked;
        assignLotteryNumbersAndSort(); // recalculates numbers
        State.rounds = generateRounds(State.players);
        State.saveRounds();
        updateRoundBadge();
        renderRegistryTable();
      }
    });
  });
}

function addPlayer(e) {
  e.preventDefault();
  const name = document.getElementById("inp-player-name").value.trim();
  const level = document.getElementById("inp-player-level").value;
  const price = parseFloat(document.getElementById("inp-player-price").value);
  const empId = document.getElementById("inp-player-empid").value.trim();
  const registered = document.getElementById("inp-player-reg").checked;
  const gender = document.getElementById("inp-player-gender")?.value || "Male";
  if (!name || !empId || isNaN(price)) { alert("Please fill all required fields."); return; }
  const categoryLimit = getCategoryBidLimit(level);
  if (price > categoryLimit) { alert(`${level} base price cannot exceed ₹${categoryLimit.toFixed(1)}L.`); return; }
  if (State.players.find(p => p.playerId === empId)) { alert("Player ID " + empId + " already exists!"); return; }

  const newId = Date.now();
  State.players.push({
    id: newId, playerId: empId, name, gender,
    imageName: getPhoto(name, empId), price, basePrice: price, level,
    isSold: false, status: "unauctioned", teamName: "",
    lotteryNumber: 0, isRegistered: registered, isCaptain: false
  });

  assignLotteryNumbersAndSort(); // sorts and assigns numbering
  State.rounds = generateRounds(State.players);
  State.saveRounds();

  document.getElementById("form-add-player").reset();
  const basePrices = (State.config && State.config.basePrices) ? State.config.basePrices : AUCTION_LIMITS.basePrices;
  document.getElementById("inp-player-price").value = basePrices[document.getElementById("inp-player-level").value] || AUCTION_LIMITS.basePrices.Beginner;

  renderRegistryTable();
  updateRoundBadge();
  alert("Player " + name + " added and rounds regenerated!");
}

// ── MODULE 2: TEAM MANAGEMENT ──
function renderTeamsList() {
  const grid = document.getElementById("teams-list-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const teams = Object.entries(State.teams);
  if (teams.length === 0) {
    grid.innerHTML = `<div style="text-align:center; padding: 30px; color: rgba(255,255,255,0.3)">No teams created yet. Add a team using the form.</div>`;
    return;
  }

  teams.forEach(([code, cfg]) => {
    const players = State.players.filter(p => p.teamName === code && p.isSold);
    const spent = players.reduce((sum, p) => sum + p.price, 0);
    const maxBudget = cfg.purse !== undefined ? cfg.purse : (State.config.maxBudget || AUCTION_LIMITS.teamBudget);
    const remaining = Math.max(0, maxBudget - spent);


    const card = document.createElement("div");
    card.className = "team-admin-card";
    card.style.borderLeftColor = cfg.color;
    card.innerHTML = `
      <div class="team-admin-info">
        <div class="team-admin-logo" style="box-shadow: 0 0 10px rgba(${hexToRgb(cfg.color)}, 0.2)">${cfg.emoji}</div>
        <div class="team-admin-details">
          <span class="team-admin-name">${cfg.name} (<span style="color:${cfg.color}">${code}</span>)</span>
          <span class="team-admin-meta">Purse: ${formatPurse(spent)} / ${formatPurse(maxBudget)} (${formatPurse(remaining)} left) &bull; Squad: ${players.length}/${teamValidator.validateTeam(code, players).maxAllowed}</span>
        </div>
      </div>
      <div class="team-admin-actions">
        <button class="team-action-btn-edit" data-code="${code}">EDIT</button>
        <button class="team-action-btn-del" data-code="${code}">DELETE</button>
      </div>
    `;

    // Edit button click
    card.querySelector(".team-action-btn-edit").addEventListener("click", () => {
      document.getElementById("inp-team-edit-mode").value = code;
      document.getElementById("inp-team-name").value = cfg.name;
      document.getElementById("inp-team-code").value = code;
      document.getElementById("inp-team-code").readOnly = true; // Code cannot be modified when editing
      document.getElementById("inp-team-color").value = cfg.color;
      document.getElementById("inp-team-emoji").value = cfg.emoji;
      document.getElementById("inp-team-purse").value = maxBudget;

      document.getElementById("team-form-title").textContent = "📝 Edit Team: " + code;
      document.getElementById("btn-team-submit").textContent = "SAVE CHANGES";
      document.getElementById("btn-team-cancel").classList.remove("hidden");
    });

    // Delete button click
    card.querySelector(".team-action-btn-del").addEventListener("click", () => {
      if (confirm(`Delete team "${cfg.name}" (${code})? All drafted players will be returned to the available pool.`)) {
        // Cleanup players in this team
        State.players.forEach(p => {
          if (p.teamName === code) {
            p.teamName = "";
            p.isSold = false;
            p.isCaptain = false;
            p.status = "unauctioned";
            p.price = p.basePrice;
          }
        });
        delete State.teams[code];
        State.saveTeams();
        assignLotteryNumbersAndSort(); // recalculates numbers
        State.rounds = generateRounds(State.players);
        State.saveRounds();
        updateRoundBadge();
        renderTeamsList();
      }
    });

    grid.appendChild(card);
  });
}

function addTeam(e) {
  e.preventDefault();
  const name = document.getElementById("inp-team-name").value.trim();
  const code = document.getElementById("inp-team-code").value.trim().toUpperCase();
  const color = document.getElementById("inp-team-color").value;
  const emoji = document.getElementById("inp-team-emoji").value.trim();
  const purse = parseFloat(document.getElementById("inp-team-purse").value);
  const editMode = document.getElementById("inp-team-edit-mode").value;

  if (!name || !code || !emoji || isNaN(purse)) { alert("Please fill all fields."); return; }

  if (editMode) {
    // Edit mode
    State.teams[editMode] = { name, emoji, color, purse };
    State.saveTeams();

    // Reset Form
    document.getElementById("inp-team-edit-mode").value = "";
    document.getElementById("inp-team-code").readOnly = false;
    document.getElementById("team-form-title").textContent = "➕ Create New Team";
    document.getElementById("btn-team-submit").textContent = "ADD TEAM";
    document.getElementById("btn-team-cancel").classList.add("hidden");
    document.getElementById("form-add-team").reset();

    renderTeamsList();
    alert("Team configuration updated!");
  } else {
    // Add mode
    if (State.teams[code]) { alert("Team code " + code + " already exists!"); return; }
    State.teams[code] = { name, emoji, color, purse };
    State.saveTeams();
    document.getElementById("form-add-team").reset();

    assignLotteryNumbersAndSort(); // recalculates numbers
    State.rounds = generateRounds(State.players);
    State.saveRounds();
    updateRoundBadge();

    renderTeamsList();
    alert("Team " + name + " (" + code + ") added successfully!");
  }
}

// ── MODULE 3: CAPTAIN ASSIGNMENT ──
function renderAdminCaptains() {
  const container = document.getElementById("admin-captain-selectors");
  if (!container) return;
  container.innerHTML = "";

  const eligiblePlayers = State.players.filter(p => p.isRegistered && !p.isCaptain && !p.isSold);
  eligiblePlayers.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  Object.entries(State.teams).forEach(([code, cfg]) => {
    const captain = State.players.find(p => p.teamName === code && p.isCaptain);
    const card = document.createElement("div");
    card.className = "captain-card";
    card.style.borderLeftColor = cfg.color;

    if (captain) {
      card.innerHTML = `
        <div class="captain-card-head">
          <span class="captain-emoji">${cfg.emoji}</span>
          <div class="captain-info">
            <span class="captain-code" style="color:${cfg.color}">${code}</span>
            <span class="captain-name-text">${cfg.name}</span>
          </div>
        </div>
        <div style="margin-top:10px; display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02); padding: 8px 12px; border-radius:6px; border: 1px solid rgba(255,255,255,0.04);">
          <span style="font-size:12.5px; font-weight:700;">👑 ${captain.name}</span>
          <span class="level-badge level-${(captain.level || "Beginner").toLowerCase()}" style="font-size:9px; padding:2px 6px;">${(captain.level || "Beginner").toUpperCase()}</span>
        </div>
        <div class="captain-row-actions">
          <button class="captain-btn-remove" data-team="${code}">REMOVE</button>
          <button class="captain-btn-replace" data-team="${code}">REPLACE</button>
        </div>
        <div class="replace-dropdown-container hidden" style="margin-top:10px;">
          <select class="admin-select replace-captain-select" style="width:100%;">
            <option value="">-- Choose New Captain --</option>
            ${eligiblePlayers.map(p => `<option value="${p.id}">${p.name} (${p.level})</option>`).join("")}
          </select>
          <div style="display:flex; gap:8px; margin-top:8px;">
            <button class="captain-btn-assign btn-confirm-replace" data-team="${code}" style="padding:6px 12px; font-size:10px;">CONFIRM</button>
            <button class="captain-btn-replace btn-cancel-replace" style="padding:6px 12px; font-size:10px;">CANCEL</button>
          </div>
        </div>
      `;

      // Remove Captain click
      card.querySelector(".captain-btn-remove").addEventListener("click", () => {
        if (confirm(`Remove ${captain.name} as Captain of ${cfg.name}?`)) {
          captain.isCaptain = false;
          captain.isSold = false;
          captain.status = "unauctioned";
          captain.teamName = "";
          captain.price = captain.basePrice;

          assignLotteryNumbersAndSort();
          State.rounds = generateRounds(State.players);
          State.saveRounds();
          updateRoundBadge();
          renderAdminCaptains();
        }
      });

      // Replace Captain click
      const replaceBtn = card.querySelector(".captain-btn-replace");
      const replaceContainer = card.querySelector(".replace-dropdown-container");
      replaceBtn.addEventListener("click", () => {
        replaceContainer.classList.toggle("hidden");
      });

      card.querySelector(".btn-cancel-replace").addEventListener("click", () => {
        replaceContainer.classList.add("hidden");
      });

      card.querySelector(".btn-confirm-replace").addEventListener("click", e => {
        const select = card.querySelector(".replace-captain-select");
        const val = select.value;
        if (!val) { alert("Please select a replacement player."); return; }

        // Remove old captain
        captain.isCaptain = false;
        captain.isSold = false;
        captain.status = "unauctioned";
        captain.teamName = "";
        captain.price = captain.basePrice;

        // Assign new captain
        const newCapId = parseInt(val);
        const newCaptain = State.players.find(p => p.id === newCapId);
        if (newCaptain) {
          newCaptain.isCaptain = true;
          newCaptain.isSold = true;
          newCaptain.status = "sold";
          newCaptain.teamName = code;
          newCaptain.price = newCaptain.basePrice || 0;
        }

        assignLotteryNumbersAndSort();
        State.rounds = generateRounds(State.players);
        State.saveRounds();
        updateRoundBadge();
        renderAdminCaptains();
      });

    } else {
      // Selector for new captain
      card.innerHTML = `
        <div class="captain-card-head">
          <span class="captain-emoji">${cfg.emoji}</span>
          <div class="captain-info">
            <span class="captain-code" style="color:${cfg.color}">${code}</span>
            <span class="captain-name-text">${cfg.name}</span>
          </div>
        </div>
        <div style="margin-top:10px; color:rgba(255,255,255,0.3); font-size:12px; font-weight:600; text-align:center; padding:6px; border:1px dashed rgba(255,255,255,0.06); border-radius:6px;">No Captain Assigned</div>
        <div class="captain-row-actions">
          <select class="admin-select captain-select-dropdown" style="flex:1;">
            <option value="">-- Choose Captain --</option>
            ${eligiblePlayers.map(p => `<option value="${p.id}">${p.name} (${p.level})</option>`).join("")}
          </select>
          <button class="captain-btn-assign btn-assign-captain" data-team="${code}">ASSIGN</button>
        </div>
      `;

      card.querySelector(".btn-assign-captain").addEventListener("click", () => {
        const select = card.querySelector(".captain-select-dropdown");
        const val = select.value;
        if (!val) { alert("Please select a player to assign as captain."); return; }

        const capId = parseInt(val);
        const player = State.players.find(p => p.id === capId);
        if (player) {
          player.isCaptain = true;
          player.isSold = true;
          player.status = "sold";
          player.teamName = code;
          player.price = player.basePrice || 0;

          assignLotteryNumbersAndSort();
          State.rounds = generateRounds(State.players);
          State.saveRounds();
          updateRoundBadge();
          renderAdminCaptains();
        }
      });
    }

    container.appendChild(card);
  });
}

// ── MODULE 4: ROUND MANAGEMENT ──
function renderRoundsPanel() {
  const statusPanel = document.getElementById("round-status-panel");
  const listPanel = document.getElementById("rounds-panel");
  if (!listPanel) return;

  const activeRound = getActiveRound();

  // Render status panel
  if (statusPanel) {
    if (!activeRound) {
      statusPanel.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 20px; color:rgba(255,255,255,0.3); font-weight:600;">🏆 All rounds completed! Check the Leaderboard.</div>`;
    } else {
      const stats = getRoundStats(activeRound);
      const totalRounds = State.rounds.length;

      statusPanel.innerHTML = `
        <div class="rsp-card">
          <span class="rsp-lbl">Current Round</span>
          <span class="rsp-val highlight">Round ${activeRound.number} of ${totalRounds}</span>
        </div>
        <div class="rsp-card">
          <span class="rsp-lbl">Category Tier</span>
          <span class="rsp-val highlight">${activeRound.category.toUpperCase()}</span>
        </div>
        <div class="rsp-card">
          <span class="rsp-lbl">Total Players</span>
          <span class="rsp-val">${stats.total}</span>
        </div>
        <div class="rsp-card">
          <span class="rsp-lbl">Drafted / Sold</span>
          <span class="rsp-val green">${stats.sold}</span>
        </div>
        <div class="rsp-card">
          <span class="rsp-lbl">Unsold</span>
          <span class="rsp-val pink">${stats.unsold}</span>
        </div>
        <div class="rsp-card">
          <span class="rsp-lbl">Remaining Pool</span>
          <span class="rsp-val highlight">${stats.remaining}</span>
        </div>
        
        <div class="rsp-progress-bar">
          <div class="rsp-progress-track">
            <div class="rsp-progress-fill" style="width: ${stats.pct}%;"></div>
          </div>
          <div class="rsp-progress-lbl">
            <span>Round Completion</span>
            <span>${stats.pct}% (${stats.sold + stats.unsold} / ${stats.total} players)</span>
          </div>
        </div>
      `;
    }
  }

  // Render rounds list
  if (!State.rounds.length) {
    listPanel.innerHTML = `<div class="admin-round-empty">No rounds generated yet. Upload a player roster to auto-generate rounds.</div>`;
    return;
  }

  const roundRows = State.rounds.map((r, i) => {
    const stats = getRoundStats(r);
    const isActive = i === State.activeRoundIdx;
    const cls = r.status === "completed" ? "arl-done" : isActive ? "arl-active" : "arl-locked";
    const icon = r.status === "completed" ? "✓" : isActive ? "▶" : "🔒";
    return `<div class="admin-round-row ${cls}" style="margin-bottom:10px;">
      <div class="arl-head">
        <span class="arl-icon">${icon}</span>
        <div class="arl-titles">
          <span class="arl-round">Round ${r.number}</span>
          <span class="arl-cat">${r.category.toUpperCase()}</span>
        </div>
        <span class="arl-status-tag" style="font-size:9px; padding:2px 6px; border-radius:4px; font-weight:800; background:rgba(255,255,255,0.05);">${r.status.toUpperCase()}</span>
      </div>
      <div class="arl-stats" style="margin-top:10px; display:flex; gap:12px; font-size:11px; color:var(--text2);">
        <div class="arl-stat"><span class="arl-lbl">Total:</span> <span class="arl-val" style="color:var(--text); font-weight:700;">${stats.total}</span></div>
        <div class="arl-stat"><span class="arl-lbl">Sold:</span> <span class="arl-val" style="color:var(--green); font-weight:700;">${stats.sold}</span></div>
        <div class="arl-stat"><span class="arl-lbl">Unsold:</span> <span class="arl-val" style="color:var(--danger); font-weight:700;">${stats.unsold}</span></div>
        <div class="arl-stat"><span class="arl-lbl">Remain:</span> <span class="arl-val" style="color:var(--accent); font-weight:700;">${stats.remaining}</span></div>
        <div class="arl-stat"><span class="arl-lbl">Done:</span> <span class="arl-val" style="color:var(--text); font-weight:700;">${stats.pct}%</span></div>
      </div>
      <div class="arl-progress" style="margin-top:8px; height:3px; background:rgba(255,255,255,0.05); border-radius:1.5px; overflow:hidden;">
        <div class="arl-fill" style="width:${stats.pct}%; height:100%; background:${isActive ? "var(--accent)" : r.status === "completed" ? "var(--green)" : "rgba(255,255,255,0.1)"}"></div>
      </div>
    </div>`;
  }).join("");

  listPanel.innerHTML = `
    <div class="admin-rounds-list">${roundRows}</div>
    <div class="round-actions" style="margin-top:20px; display:flex; gap:12px;">
      <button id="btn-advance-round" class="advance-btn">ADVANCE TO NEXT ROUND</button>
      <button id="btn-regenerate-rounds" class="advance-btn" style="background:rgba(255,77,109,0.06); border-color:rgba(255,77,109,0.2); color:var(--danger)">REGENERATE ROUNDS</button>
    </div>
    <p class="admin-hint" style="margin-top:10px;">Manually advancing completes the current round, returning unsold players back to the pool to be auctioned in subsequent rounds, and activates the next category round.</p>
  `;

  // Attach button listeners
  const advBtn = document.getElementById("btn-advance-round");
  if (advBtn) advBtn.addEventListener("click", advanceRound);

  const regenBtn = document.getElementById("btn-regenerate-rounds");
  if (regenBtn) {
    regenBtn.addEventListener("click", () => {
      if (confirm("Regenerate all rounds from current eligible players? This will reset the active round state.")) {
        State.rounds = generateRounds(State.players);
        State.activeRoundIdx = 0;
        State.saveRounds();
        updateRoundBadge();
        renderRoundsPanel();
      }
    });
  }
}

function advanceRound() {
  const round = getActiveRound();
  if (!round) { alert("No active round to advance from."); return; }
  if (!confirm(`Advance from Round ${round.number} (${round.category})? Unsold players in this round will return to the pool in the next round.`)) return;

  // Mark current round complete
  State.rounds[State.activeRoundIdx].status = "completed";

  // Re-queue unsold players of this category
  const unsoldInRound = State.players.filter(p => p.level === round.category && p.status === "unsold" && !p.isCaptain);
  unsoldInRound.forEach(p => { p.status = "unauctioned"; p.isSold = false; p.teamName = ""; p.price = p.basePrice; });

  const nextIdx = State.activeRoundIdx + 1;
  if (nextIdx < State.rounds.length) {
    State.rounds[nextIdx].status = "active";
    State.activeRoundIdx = nextIdx;
    State.savePlayers();
    State.saveRounds();
    const nr = State.rounds[nextIdx];
    alert(`Round ${round.number} (${round.category}) complete!\n\nRound ${nr.number} — ${nr.category.toUpperCase()} is now active.`);
  } else {
    State.savePlayers();
    State.saveRounds();
    alert("All rounds complete! 🏆");
  }
  renderRoundsPanel();
  updateRoundBadge();
}

// ── MODULE 5: IMPORT ROSTER ──
function renderImportModule() {
  const fileStatus = document.getElementById("admin-file-status");
  const previewSection = document.getElementById("import-preview-section");

  // reset file input
  const fileInput = document.getElementById("admin-roster-file");
  if (fileInput) fileInput.value = "";

  if (fileStatus) fileStatus.textContent = "No file chosen";
  if (previewSection) previewSection.classList.add("hidden");
  tempImportPlayers = null;
}

function handleRosterUpload(e) {
  const file = e.target ? e.target.files[0] : e;
  if (!file) return;
  const fileStatus = document.getElementById("admin-file-status");
  if (fileStatus) fileStatus.textContent = file.name;

  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const wb = XLSX.read(evt.target.result, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
      if (!rows.length) { alert("No data found in file."); return; }

      const keys = Object.keys(rows[0]);
      const nameKey = keys.find(k => k.toLowerCase().includes("name"));
      const idKey = keys.find(k => k.toLowerCase().includes("id") || k.toLowerCase().includes("emp"));
      const levelKey = keys.find(k => k.toLowerCase().includes("level") || k.toLowerCase().includes("category"));
      const genderKey = keys.find(k => k.toLowerCase().includes("gender") || k.toLowerCase().includes("sex"));
      const isCaptainKey = keys.find(k => k.toLowerCase().includes("captain") || k.toLowerCase().includes("capt") || k.toLowerCase().includes("role"));
      const teamKey = keys.find(k => k.toLowerCase().includes("team") || k.toLowerCase().includes("side"));

      if (!nameKey) { alert("Column 'Name' not found in file."); return; }

      const basePrices = (State.config && State.config.basePrices) ? State.config.basePrices : AUCTION_LIMITS.basePrices;

      const parsedPlayers = [];
      const warnings = [];
      const excelIds = new Set();

      const namesList = window.RAW_NAMES_OVERRIDE || RAW_NAMES;

      rows.forEach((row, i) => {
        const rawName = String(row[nameKey] || "").trim();
        const rawLevel = String(row[levelKey] || "").toLowerCase();
        const empId = idKey ? String(row[idKey] || "").trim() : ("IMP" + (i + 1));

        if (!rawName) {
          warnings.push(`Row ${i + 2}: Player Name is empty — row skipped.`);
          return;
        }

        if (!empId) {
          warnings.push(`Row ${i + 2} (${rawName}): Employee ID is missing.`);
        }

        // Duplicate checks
        if (excelIds.has(empId)) {
          warnings.push(`Excel Duplicate: ID "${empId}" is declared multiple times in the uploaded file.`);
        } else {
          excelIds.add(empId);
        }

        const dbDup = State.players.find(p => p.playerId === empId);
        if (dbDup) {
          warnings.push(`Database Conflict: ID "${empId}" (${rawName}) already exists in the active registry.`);
        }

        let level = "Beginner";
        let price = basePrices.Beginner;
        if (rawLevel.includes("pro") || rawLevel.includes("advance") || rawLevel.includes("expert")) {
          level = "Pro";
          price = basePrices.Pro;
        } else if (rawLevel.includes("inter") || rawLevel.includes("mid")) {
          level = "Intermediate";
          price = basePrices.Intermediate;
        } else if (rawLevel !== "" && !rawLevel.includes("begin")) {
          warnings.push(`Row ${i + 2} (${rawName}): Unrecognized level "${row[levelKey]}" — defaulted to Beginner.`);
        }

        let gender = "Male";
        if (genderKey) {
          const rawGender = String(row[genderKey] || "").trim().toLowerCase();
          if (rawGender.startsWith("f")) gender = "Female";
          else if (rawGender.startsWith("m")) gender = "Male";
        } else {
          const matched = namesList.find(n => (typeof n === "object" ? n.name : n).toLowerCase() === rawName.toLowerCase());
          if (matched && typeof matched === "object" && matched.gender) {
            gender = matched.gender;
          }
        }

        let isCaptain = false;
        let isViceCaptain = false;
        let teamName = "";
        let isSold = false;
        let status = "unauctioned";
        let finalPrice = price;

        if (isCaptainKey && row[isCaptainKey]) {
          const val = String(row[isCaptainKey]).trim().toLowerCase();
          if (val === "vice captain" || val === "vice-captain" || val === "vc") {
            isViceCaptain = true;
          } else if (val.includes("yes") || val.includes("true") || val === "1" || val === "y" || val.includes("captain")) {
            isCaptain = true;
          }
        }
        if (teamKey && row[teamKey]) {
          const teamVal = String(row[teamKey]).trim().toUpperCase();
          const foundTeamCode = Object.keys(State.teams).find(code =>
            code === teamVal ||
            State.teams[code].name.toUpperCase() === teamVal ||
            teamVal.includes(code)
          );
          if (foundTeamCode) {
            teamName = foundTeamCode;
            if (isCaptain || isViceCaptain) {
              isSold = true;
              status = "sold";
              finalPrice = price; // Same base price for captain and vice captain when allocated
            }
          }
        }

        parsedPlayers.push({
          id: Date.now() + i,
          playerId: empId,
          name: rawName,
          gender: gender,
          imageName: getPhoto(rawName, empId),
          price: finalPrice,
          basePrice: price,
          level: level,
          isSold: isSold,
          status: status,
          teamName: teamName,
          lotteryNumber: 0,
          isRegistered: true,
          isCaptain: isCaptain,
          isViceCaptain: isViceCaptain,
          isRevealed: isCaptain || isViceCaptain // Captains & VC are revealed immediately
        });
      });

      if (parsedPlayers.length === 0) {
        alert("No valid players parsed from the roster file.");
        return;
      }

      tempImportPlayers = parsedPlayers;

      // Update Preview Screen UI
      document.getElementById("import-total-players").textContent = parsedPlayers.length;
      document.getElementById("import-pro-players").textContent = parsedPlayers.filter(p => p.level === "Pro").length;
      document.getElementById("import-inter-players").textContent = parsedPlayers.filter(p => p.level === "Intermediate").length;
      document.getElementById("import-begin-players").textContent = parsedPlayers.filter(p => p.level === "Beginner").length;

      // Warnings Box
      const warningsBox = document.getElementById("import-warnings-box");
      const warningsList = document.getElementById("import-warnings-list");
      if (warnings.length > 0) {
        warningsBox.classList.remove("hidden");
        warningsList.innerHTML = warnings.map(w => `<li>${w}</li>`).join("");
      } else {
        warningsBox.classList.add("hidden");
        warningsList.innerHTML = "";
      }

      // Preview Table (first 15 rows)
      const previewTbody = document.getElementById("import-preview-tbody");
      previewTbody.innerHTML = parsedPlayers.slice(0, 15).map(p => `
        <tr>
          <td>${p.playerId}</td>
          <td><strong>${p.name}</strong></td>
          <td><span class="level-badge level-${(p.level || "Beginner").toLowerCase()}" style="font-size:10px; padding:2px 6px;">${(p.level || "Beginner").toUpperCase()}</span></td>
          <td>\u20B9${p.basePrice}L</td>
        </tr>
      `).join("");

      if (parsedPlayers.length > 15) {
        previewTbody.innerHTML += `<tr><td colspan="4" style="text-align:center; color:rgba(255,255,255,0.4); font-size:11px;">... and ${parsedPlayers.length - 15} more players ...</td></tr>`;
      }

      // Show the preview card
      document.getElementById("import-preview-section").classList.remove("hidden");

    } catch (err) {
      alert("Error parsing file: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

function confirmImport() {
  if (!tempImportPlayers || tempImportPlayers.length === 0) return;

  State.players = tempImportPlayers;
  assignLotteryNumbersAndSort(); // sorts and restarts lottery number per category

  State.rounds = generateRounds(State.players);
  State.activeRoundIdx = 0;

  State.savePlayers();
  State.saveRounds();

  localStorage.setItem("KPL_CUSTOM_ROSTER_" + State.tournament.toUpperCase(), "true");

  alert(`Import Successful! ${tempImportPlayers.length} players imported and sequence rounds generated.\nLottery numbering restarted per category.`);

  tempImportPlayers = null;
  renderImportModule();
  updateRoundBadge();
  switchAdminModule("registry");
}

// ── MODULE 6: AUCTION CONFIGURATION ──
function renderConfigModule() {
  if (!State.config) return;
  document.getElementById("cfg-timer-duration").value = State.config.timerDuration || 15;
  document.getElementById("cfg-max-budget").value = State.config.maxBudget || AUCTION_LIMITS.teamBudget;
  
  // Calculate dynamic validation values based on current active players and teams
  const configService = new TournamentConfigService();
  const dynamicConfig = configService.getConfig();
  document.getElementById("cfg-min-squad").value = dynamicConfig.minPlayersPerTeam;
  document.getElementById("cfg-max-squad").value = dynamicConfig.maxPlayersPerTeam;
  document.getElementById("cfg-min-male").value = dynamicConfig.male.min;
  document.getElementById("cfg-max-male").value = dynamicConfig.male.max;
  document.getElementById("cfg-min-female").value = dynamicConfig.female.min;
  document.getElementById("cfg-max-female").value = dynamicConfig.female.max;

  document.getElementById("cfg-unsold-handling").value = State.config.unsoldHandling || "return";
  document.getElementById("cfg-base-pro").value = State.config.basePrices ? State.config.basePrices.Pro : 12;
  document.getElementById("cfg-base-inter").value = State.config.basePrices ? State.config.basePrices.Intermediate : 7;
  document.getElementById("cfg-base-begin").value = State.config.basePrices ? State.config.basePrices.Beginner : AUCTION_LIMITS.basePrices.Beginner;
  document.getElementById("cfg-auto-advance").checked = !!State.config.autoAdvance;
}

function saveAuctionConfig(e) {
  e.preventDefault();
  if (!State.config) State.config = {};

  State.config.timerDuration = parseInt(document.getElementById("cfg-timer-duration").value);
  State.config.maxBudget = parseFloat(document.getElementById("cfg-max-budget").value);
  State.config.unsoldHandling = document.getElementById("cfg-unsold-handling").value;

  State.config.basePrices = {
    Pro: parseFloat(document.getElementById("cfg-base-pro").value),
    Intermediate: parseFloat(document.getElementById("cfg-base-inter").value),
    Beginner: parseFloat(document.getElementById("cfg-base-begin").value)
  };

  State.config.autoAdvance = document.getElementById("cfg-auto-advance").checked;

  localStorage.setItem(State.configKey(), JSON.stringify(State.config));
  alert("Auction Configuration saved successfully!");
  renderConfigModule();
}

// ── MODULE 7: SETTINGS ──
function renderSettingsModule() {
  const currentTheme = localStorage.getItem("KPL_THEME") || "dark";
  document.getElementById("set-theme-dark").classList.toggle("active", currentTheme === "dark");
  document.getElementById("set-theme-light").classList.toggle("active", currentTheme === "light");

  document.getElementById("set-sound-effects").checked = State.config.soundEffectsEnabled !== false;
  document.getElementById("set-voice-announcer").checked = State.config.voiceAnnouncerEnabled !== false;
}

// ── INITIALIZATION ──s
async function init() {
  try {
    try {
      const response = await fetch("appsettings.json");
      const settings = await response.json();

      if (settings.Dashboard) {
        window.DASHBOARD_CONFIG = settings.Dashboard;
      }
      if (settings.RAW_NAMES) {
        window.RAW_NAMES_OVERRIDE = settings.RAW_NAMES;
      }
      if (settings.DEFAULT_CRICKET_TEAMS) {
        window.DEFAULT_CRICKET_TEAMS_OVERRIDE = settings.DEFAULT_CRICKET_TEAMS;
      }
      if (settings.DEFAULT_SMASHFEST_TEAMS) {
        window.DEFAULT_SMASHFEST_TEAMS_OVERRIDE = settings.DEFAULT_SMASHFEST_TEAMS;
      }
      if (settings.DEFAULT_CONFIG) {
        window.DEFAULT_CONFIG_OVERRIDE = settings.DEFAULT_CONFIG;
      }
      if (settings.IMAGE_MAP) {
        window.IMAGE_MAP_OVERRIDE = settings.IMAGE_MAP;
      }
    } catch (err) {
      console.warn("Failed to load appsettings.json, using built-in defaults:", err);
    }

    State.initData();

    // Apply saved theme
    setTheme(localStorage.getItem("KPL_THEME") || "dark");

    // ── Tournament selection ──
    const cricketCard = document.getElementById("card-cricket");
    // if (cricketCard) {
    const handleCricketClick = () => {
      console.log("Cricket card clicked");
      State.loadTournament("cricket");
      switchView("welcome");
    };
    cricketCard.addEventListener("click", handleCricketClick);
    cricketCard.querySelector(".sel-enter-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      handleCricketClick();
    });
    // }

    const smashCard = document.getElementById("card-smashfest");
    if (smashCard) {
      const handleSmashClick = () => {
        console.log("Smashfest card clicked");
        State.loadTournament("smashfest");
        switchView("welcome");
      };
      smashCard.addEventListener("click", handleSmashClick);
      smashCard.querySelector(".sel-enter-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        handleSmashClick();
      });
    }

    // ── Enter key jump ──
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (State.view === "selection") {
          e.preventDefault();
          State.loadTournament(State.tournament || "cricket");
          switchView("welcome");
        } else if (State.view === "welcome") {
          e.preventDefault();
          document.getElementById("btn-enter-auction")?.click();
        }
      }
    });

    // ── Welcome screen ──
    document.getElementById("btn-enter-auction").addEventListener("click", () => {

      if (!State || !State.players) {
        alert("Tournament not loaded.");
        return;
      }

      const hasCaptains = State.players.some(player => player.isCaptain);

      if (hasCaptains) {

        renderPool();
        switchView("pool");

      } else {

        renderCaptainSetup();
        switchView("captain");

      }

    });
    document.getElementById("btn-tournament-info").addEventListener("click", showTournamentInfo);
    document.getElementById("btn-welcome-view-all")?.addEventListener("click", () => {
      renderPool();
      switchView("pool");
    });
    // btn-view-all removed - using welcome activity panel view all button instead

    // ── Nav back ──
    document.getElementById("btn-back").addEventListener("click", () => {
      const v = State.view;
      if (v === "welcome") switchView("selection");
      else if (v === "captain") switchView("welcome");
      else if (v === "pool") switchView("welcome");
      else if (v === "detail") { renderPool(); switchView("pool"); }
      else { renderPool(); switchView("pool"); }
    });

    // ── Tab buttons ──
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const v = btn.dataset.view;
        if (v === "pool") { renderPool(); switchView("pool"); }
        else if (v === "dashboard") { renderDashboard(); switchView("dashboard"); }
        else if (v === "teams") { renderTeamCards(); switchView("teams"); }
        else if (v === "admin") { renderAdmin(); switchView("admin"); }
      });
    });

    // ── Captain setup launch ──
    document.getElementById("btn-launch").addEventListener("click", launchAuction);

    // ── Auction detail ──
    document.getElementById("btn-sell").addEventListener("click", doSell);
    document.getElementById("btn-unsold").addEventListener("click", doUnsold);
    document.querySelectorAll("[data-step]").forEach(btn => {
      btn.addEventListener("click", () => adjustBidAmount(parseFloat(btn.dataset.step || "0")));
    });
    document.getElementById("btn-timer").addEventListener("click", () => {
      if (timerRunning) stopTimer(); else startTimer();
    });

    // ── Pool filters ──
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderPool();
      });
    });

    // ── ADMIN MODULE SIDEBAR NAV ──
    document.querySelectorAll(".admin-sidebar-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        switchAdminModule(btn.dataset.module);
      });
    });

    // ── REGISTRY MODULE EVENTS ──
    document.getElementById("btn-toggle-add-player-form").addEventListener("click", e => {
      const panel = document.getElementById("panel-add-player-manual");
      panel.classList.toggle("hidden");
      if (panel.classList.contains("hidden")) {
        e.target.textContent = "＋ ADD PLAYER MANUALLY";
      } else {
        e.target.textContent = "－ CLOSE MANUAL FORM";
      }
    });

    document.getElementById("form-add-player").addEventListener("submit", addPlayer);
    document.getElementById("inp-player-level").addEventListener("change", e => {
      const prices = (State.config && State.config.basePrices) ? State.config.basePrices : AUCTION_LIMITS.basePrices;
      document.getElementById("inp-player-price").value = prices[e.target.value] || AUCTION_LIMITS.basePrices.Beginner;
    });

    // Filters and Search
    document.getElementById("registry-search").addEventListener("input", e => {
      registrySearch = e.target.value;
      registryPage = 1;
      renderRegistryTable();
    });

    document.getElementById("filter-category").addEventListener("change", e => {
      registryCategory = e.target.value;
      registryPage = 1;
      renderRegistryTable();
    });

    document.getElementById("filter-status").addEventListener("change", e => {
      registryStatus = e.target.value;
      registryPage = 1;
      renderRegistryTable();
    });

    document.getElementById("filter-eligible").addEventListener("change", e => {
      registryEligibility = e.target.value;
      registryPage = 1;
      renderRegistryTable();
    });

    // Pagination buttons
    document.getElementById("reg-prev-btn").addEventListener("click", () => {
      if (registryPage > 1) {
        registryPage--;
        renderRegistryTable();
      }
    });

    document.getElementById("reg-next-btn").addEventListener("click", () => {
      registryPage++;
      renderRegistryTable();
    });

    // ── TEAM MANAGEMENT MODULE EVENTS ──
    document.getElementById("form-add-team").addEventListener("submit", addTeam);

    document.getElementById("btn-team-cancel").addEventListener("click", () => {
      document.getElementById("inp-team-edit-mode").value = "";
      document.getElementById("inp-team-code").readOnly = false;
      document.getElementById("team-form-title").textContent = "➕ Create New Team";
      document.getElementById("btn-team-submit").textContent = "ADD TEAM";
      document.getElementById("btn-team-cancel").classList.add("hidden");
      document.getElementById("form-add-team").reset();
    });

    // ── IMPORT MODULE EVENTS ──
    const dropZone = document.getElementById("import-drop-zone");
    const fileInput = document.getElementById("admin-roster-file");
    const selectBtn = document.getElementById("btn-trigger-file");

    if (selectBtn && fileInput) {
      selectBtn.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", handleRosterUpload);
    }

    const rosterFile = document.getElementById("roster-file");
    if (rosterFile) {
      rosterFile.addEventListener("change", handleCaptainRosterUpload);
    }

    if (dropZone) {
      dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
      });

      dropZone.addEventListener("drop", e => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
          handleRosterUpload(e.dataTransfer.files[0]);
        }
      });
    }

    document.getElementById("btn-confirm-import").addEventListener("click", confirmImport);
    document.getElementById("btn-cancel-import").addEventListener("click", renderImportModule);

    // ── AUCTION CONFIG EVENTS ──
    document.getElementById("form-auction-config").addEventListener("submit", saveAuctionConfig);

    // ── SETTINGS Preferencse Theme ──
    document.getElementById("set-theme-dark").addEventListener("click", () => {
      setTheme("dark");
      renderSettingsModule();
    });

    document.getElementById("set-theme-light").addEventListener("click", () => {
      setTheme("light");
      renderSettingsModule();
    });

    document.getElementById("set-sound-effects").addEventListener("change", e => {
      State.config.soundEffectsEnabled = e.target.checked;
      localStorage.setItem(State.configKey(), JSON.stringify(State.config));
    });

    document.getElementById("set-voice-announcer").addEventListener("change", e => {
      State.config.voiceAnnouncerEnabled = e.target.checked;
      localStorage.setItem(State.configKey(), JSON.stringify(State.config));
    });

    // ── Reset all ──
    document.getElementById("btn-reset-all").addEventListener("click", e => {
      e.stopPropagation();
      if (confirm("Reset ALL auction data? This cannot be undone.")) { localStorage.clear(); location.reload(); }
    });

    // ── Modal close ──
    document.getElementById("btn-close-modal").addEventListener("click", () => {
      document.getElementById("info-modal").classList.add("hidden");
    });
    document.getElementById("info-modal").addEventListener("click", e => {
      if (e.target === document.getElementById("info-modal")) {
        document.getElementById("info-modal").classList.add("hidden");
      }
    });

    // ── Theme buttons in sidebar ──
    document.getElementById("btn-theme-light").addEventListener("click", () => {
      setTheme("light");
      renderSettingsModule();
    });
    document.getElementById("btn-theme-dark").addEventListener("click", () => {
      setTheme("dark");
      renderSettingsModule();
    });

    // ── Admin dropdown ──
    const wrap = document.getElementById("admin-menu-wrap");
    const ddBtn = document.getElementById("admin-menu-btn");
    const dd = document.getElementById("admin-dropdown");

    ddBtn.addEventListener("click", e => {
      e.stopPropagation();
      const open = !dd.classList.contains("hidden");
      dd.classList.toggle("hidden", open);
      wrap.classList.toggle("open", !open);
    });
    document.addEventListener("click", () => { if (dd) dd.classList.add("hidden"); if (wrap) wrap.classList.remove("open"); });

    document.getElementById("drop-pool").addEventListener("click", () => { renderPool(); switchView("pool"); });
    document.getElementById("drop-admin").addEventListener("click", () => { renderAdmin(); switchView("admin"); });
    document.getElementById("drop-reset").addEventListener("click", () => {
      if (confirm("Reset all auction data?")) { localStorage.clear(); location.reload(); }
    });

    // ── Team tree back button ──
    document.getElementById("btn-close-tree")?.addEventListener("click", () => renderTeamCards());

    // (btn-back handler already registered above with comprehensive navigation logic)

    // ── Restore saved state ──
    const savedTournament = localStorage.getItem("KPL_ACTIVE_TOURNAMENT");
    const savedView = localStorage.getItem("KPL_ACTIVE_VIEW");
    const savedAdminModule = localStorage.getItem("KPL_ACTIVE_ADMIN_MODULE");
    // ── EXPORT BUTTONS EVENTS ──
    document.getElementById("btn-export-excel")?.addEventListener("click", exportToExcel);
    document.getElementById("btn-export-csv")?.addEventListener("click", exportToCSV);
    document.getElementById("btn-admin-export-excel")?.addEventListener("click", exportToExcel);
    document.getElementById("btn-admin-export-csv")?.addEventListener("click", exportToCSV);
    document.getElementById("btn-export-all-teams")?.addEventListener("click", exportAllTeams);
    document.getElementById("btn-export-single-team")?.addEventListener("click", (e) => {
      const code = e.currentTarget.dataset.code;
      if (code) {
        exportSingleTeam(code);
      }
    });

    if (savedTournament) {
      State.loadTournament(savedTournament);
      if (savedAdminModule) {
        State.activeAdminModule = savedAdminModule;
      }
      if (savedView && savedView !== "selection") {
        if (savedView === "detail") {
          const savedPlayerId = localStorage.getItem("KPL_ACTIVE_PLAYER_ID");
          const player = State.players.find(p => p.id === parseInt(savedPlayerId) || p.playerId === savedPlayerId);
          if (player) {
            openDetail(player);
          } else {
            renderPool();
            switchView("pool");
          }
        } else if (savedView === "captain") {
          renderCaptainSetup();
          switchView("captain");
        } else if (savedView === "pool") {
          renderPool();
          switchView("pool");
        } else {
          switchView(savedView);
        }
      } else {
        switchView("welcome");
      }
    } else {
      switchView("selection");
    }
  } catch (globalInitError) {
    console.error("Initialization failed:", globalInitError);
    if (window.onerror) {
      window.onerror(globalInitError.message, "app.js", 3155, 0, globalInitError);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ── WELCOME SCREEN OVERVIEW DASHBOARD ──
class DashboardStatCard {
  constructor({ title, value, subValue, icon, glowColor, tooltip }) {
    this.title = title;
    this.value = value;
    this.subValue = subValue;
    this.icon = icon;
    this.glowColor = glowColor;
    this.tooltip = tooltip;
  }

  render() {
    const borderStyle = `--glow-color: ${this.glowColor}; --kpi-border-color: ${this.glowColor}40; --kpi-glow: inset 0 0 12px ${this.glowColor}10, 0 4px 20px rgba(0,0,0,0.3); --kpi-border-hover: ${this.glowColor}80; --kpi-glow-hover: inset 0 0 18px ${this.glowColor}20, 0 12px 30px rgba(0, 0, 0, 0.5);`;
    const iconStyle = `color: ${this.glowColor};`;
    const labelStyle = `color: ${this.glowColor};`;

    return `
      <div class="kpi-card" style="${borderStyle}" title="${this.tooltip || ''}">
        <div class="kpi-card-glow"></div>
        <div class="kpi-icon" style="${iconStyle}">${this.icon}</div>
        <div class="kpi-info">
          <div class="kpi-lbl" style="${labelStyle}">${this.title}</div>
          <div class="kpi-val">${this.value}</div>
          <div class="kpi-sub-val">${this.subValue}</div>
        </div>
      </div>
    `;
  }
}

function renderWelcomeOverview() {
  const container = document.getElementById("welcome-overview");
  if (!container) return;

  const config = window.DASHBOARD_CONFIG || {
    ShowAuctionOverview: true,
    ShowCompletionPercentage: true,
    ShowTotalPurse: true,
    ShowRemainingPlayers: true
  };

  if (config.ShowAuctionOverview === false) {
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");
  container.innerHTML = "";

  const activeRound = State.rounds[State.activeRoundIdx] || null;

  let currentRoundVal = "COMPLETED";
  let roundSubVal = "All Rounds Complete";
  if (activeRound) {
    currentRoundVal = `Round ${activeRound.number}`;
    roundSubVal = activeRound.category.charAt(0).toUpperCase() + activeRound.category.slice(1).toLowerCase();
  }

  const totalTeams = Object.keys(State.teams).length;
  const totalPlayersList = State.players.filter(p => p.isRegistered);
  const soldPlayersCount = totalPlayersList.filter(p => p.status === "sold").length;
  const remainingOverall = totalPlayersList.length - soldPlayersCount;

  // Calculate sum of all team budgets
  const totalPurse = Object.values(State.teams).reduce((sum, t) => sum + (t.purse || State.config.maxBudget || AUCTION_LIMITS.teamBudget), 0);
  const completionPercentage = totalPlayersList.length > 0 ? Math.round((soldPlayersCount / totalPlayersList.length) * 100) : 0;

  const cards = [];

  // Card 1: Current Round
  cards.push(new DashboardStatCard({
    title: "CURRENT ROUND",
    value: `<span style="color: #00dcff;">${currentRoundVal}</span>`,
    subValue: roundSubVal,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    glowColor: "#00dcff",
    tooltip: "The active bidding round category"
  }));

  // Card 2: Teams
  cards.push(new DashboardStatCard({
    title: "TOTAL TEAMS",
    value: totalTeams,
    subValue: "Registered",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    glowColor: "#9b51e0",
    tooltip: "Total registered teams in this tournament"
  }));

  // Card 3: Players Sold
  cards.push(new DashboardStatCard({
    title: "PLAYERS SOLD",
    value: soldPlayersCount,
    subValue: "So Far",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    glowColor: "#00ff87",
    tooltip: "Total players successfully auctioned"
  }));

  // Card 4: Players Remaining
  if (config.ShowRemainingPlayers !== false) {
    cards.push(new DashboardStatCard({
      title: "PLAYERS LEFT",
      value: remainingOverall,
      subValue: "Remaining",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      glowColor: "#ffc107",
      tooltip: "Registered players left to be auctioned"
    }));
  }

  // Card 5: Total Purse
  if (config.ShowTotalPurse !== false) {
    cards.push(new DashboardStatCard({
      title: "TOTAL BUDGET",
      value: formatPurse(totalPurse),
      subValue: "Total Purse",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>`,
      glowColor: "#ec008c",
      tooltip: "Combined starting budget of all teams"
    }));
  }

  // Card 6: Auction Completion
  if (config.ShowCompletionPercentage !== false) {
    cards.push(new DashboardStatCard({
      title: "COMPLETION",
      value: `${completionPercentage}%`,
      subValue: "Auction Progress",
      icon: `<svg viewBox="0 0 36 36" style="width:36px;height:36px;"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-width="3" /><path stroke-dasharray="${completionPercentage}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" /></svg>`,
      glowColor: "#3b82f6",
      tooltip: "Percentage of registered players sold"
    }));
  }

  container.innerHTML = cards.map(c => c.render()).join("");
}

function formatPriceBadge(lakhs) {
  return "₹" + lakhs.toFixed(1) + "L";
}

function renderWelcomeActivity() {
  const panel = document.getElementById("welcome-activity-panel");
  const listEl = document.getElementById("welcome-activity-list");
  if (!panel || !listEl) return;

  const history = State.activityHistory || [];
  panel.classList.remove("hidden");
  listEl.innerHTML = "";

  const recent = history.slice(0, 4);
  if (recent.length === 0) {
    listEl.innerHTML = `<div style="text-align: center; padding: 24px; color: rgba(255, 255, 255, 0.25); font-size: 13.5px; font-weight: 600;">No activity logged yet. Bids will appear here in real-time.</div>`;
    return;
  }

  recent.forEach(item => {
    const team = State.teams[item.teamCode] || { name: item.teamCode, color: "#fff" };
    const row = document.createElement("div");
    row.className = "lap-row";

    const teamBadgeColor = team.color || "#00dcff";

    row.innerHTML = `
      <span class="lap-team-badge" style="background-color: ${teamBadgeColor};">${item.teamCode}</span>
      <span class="lap-text">${item.teamCode} bought <strong>${item.playerName}</strong></span>
      <span class="lap-price-badge" style="color: ${teamBadgeColor}; border-color: ${teamBadgeColor}40; background: ${teamBadgeColor}10;">${formatPriceBadge(item.price)}</span>
      <span class="lap-time">${item.timestamp}</span>
    `;
    listEl.appendChild(row);
  });
}
