// MacroHack Grey Box Prototype — Data Layer
// Values transcribed from MacroHack-Prototype-Cards.md. Do not hand-tune here;
// change the source doc first, then mirror the change here.

const CONST = {
  CARB_ENERGY_PER_G: 4,
  FAT_ENERGY_PER_G: 9,
  PROTEIN_THRESHOLD_BASE: 12,
  PROTEIN_THRESHOLD_ENGINE_COEF: 0.25,
  ENGINE_MULT_BASE: 0.7,
  ENGINE_MULT_ENGINE_DIV: 100,
  EFFICIENCY: 1.0, // frozen for prototype — see Prototype GDD §3
  DEMAND_BASE: 100,
  DEMAND_GROWTH: 1.25,
  ROUNDS: 3,
  WEEKS_PER_ROUND: 5,
  DRAFT_SIZE: 3,

  START_ENGINE: 20,
  ENGINE_GROWTH: 10,
  ENGINE_DECAY: 5,
  ENGINE_DECAY_UNSPENT_FLOOR: 10, // decay only if unspent energy < this

  START_RESERVE: 25,
  RESERVE_CONVERSION_DIV: 10, // Reserve += unspent energy / 10

  // Set diminish multiplier by set index (1-based). Sets 1-5 from v3 §8;
  // 6+ extrapolated with a 30% floor (prototype-only, see Cards doc §1).
  SET_DIMINISH: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3],
};

function demandForRound(n) {
  // n is 1-indexed
  return Math.round(CONST.DEMAND_BASE * Math.pow(CONST.DEMAND_GROWTH, n - 1));
}

function proteinThreshold(engine) {
  return CONST.PROTEIN_THRESHOLD_BASE + engine * CONST.PROTEIN_THRESHOLD_ENGINE_COEF;
}

function engineMultiplier(engine) {
  return CONST.ENGINE_MULT_BASE + engine / CONST.ENGINE_MULT_ENGINE_DIV;
}

function setDiminishMultiplier(setIndex) {
  // setIndex is 1-based
  const table = CONST.SET_DIMINISH;
  return table[Math.min(setIndex, table.length) - 1];
}

// --- Food cards -------------------------------------------------------
// id, name, protein, carbs, fat (grams). Energy is derived, not stored,
// so a constant change propagates without re-editing every card.
const FOOD_CARDS = [
  { id: "f01", name: "Chicken & Potatoes",   p: 6, c: 5, f: 0 },
  { id: "f02", name: "Cottage Cheese",       p: 6, c: 2, f: 1 },
  { id: "f03", name: "Steak & Rice",         p: 5, c: 4, f: 1 },
  { id: "f04", name: "Salmon Fillet",        p: 5, c: 0, f: 4 },
  { id: "f05", name: "Whey Shake",           p: 5, c: 1, f: 0 },
  { id: "f06", name: "Bacon & Eggs",         p: 5, c: 0, f: 5 },
  { id: "f07", name: "Sweet Potato & Tuna",  p: 5, c: 6, f: 0 },
  { id: "f08", name: "Greek Yogurt & Berries", p: 4, c: 3, f: 1 },
  { id: "f09", name: "Eggs & Avocado",       p: 4, c: 1, f: 4 },
  { id: "f10", name: "Protein Bar",          p: 4, c: 4, f: 2 },
  { id: "f11", name: "Nut Butter Toast",     p: 3, c: 4, f: 3 },
  { id: "f12", name: "Cheese Board",         p: 3, c: 1, f: 5 },
  { id: "f13", name: "Pasta Plate",          p: 2, c: 7, f: 1 },
  { id: "f14", name: "Oats & Banana",        p: 2, c: 6, f: 1 },
  { id: "f15", name: "Instant Noodles",      p: 2, c: 6, f: 3 },
  { id: "f16", name: "White Rice Bowl",      p: 1, c: 8, f: 0 },
  { id: "f17", name: "Sourdough & Jam",      p: 1, c: 6, f: 0 },
  { id: "f18", name: "Fries",                p: 1, c: 7, f: 4 },
  { id: "f19", name: "Side Salad",           p: 1, c: 2, f: 1 },
  { id: "f20", name: "Olive Oil & Greens",   p: 0, c: 1, f: 5 },
];

function foodCardEnergy(card) {
  const carbEnergy = card.c * CONST.CARB_ENERGY_PER_G;
  const fatEnergy = card.f * CONST.FAT_ENERGY_PER_G;
  return { carbEnergy, fatEnergy, total: carbEnergy + fatEnergy };
}

// --- Training cards -----------------------------------------------------
// fuel: "carb" | "fat" | "either". maxSets: null means uncapped (AMRAP).
const TRAINING_CARDS = [
  { id: "t01", name: "Deadlift",          modality: "Strength",     fuel: "carb",  cost: 16, output: 26, maxSets: 2 },
  { id: "t02", name: "Back Squat",        modality: "Strength",     fuel: "carb",  cost: 14, output: 22, maxSets: 3 },
  { id: "t03", name: "Bench Press",       modality: "Strength",     fuel: "carb",  cost: 10, output: 15, maxSets: 3 },
  { id: "t04", name: "Overhead Press",    modality: "Strength",     fuel: "carb",  cost: 9,  output: 13, maxSets: 3 },
  { id: "t05", name: "Sprint Intervals",  modality: "Conditioning", fuel: "carb",  cost: 7,  output: 9,  maxSets: 4 },
  { id: "t06", name: "Leg Press Drop",    modality: "Hypertrophy",  fuel: "carb",  cost: 8,  output: 10, maxSets: 5 },
  { id: "t07", name: "Curl Superset",     modality: "Hypertrophy",  fuel: "carb",  cost: 5,  output: 6,  maxSets: 6 },
  { id: "t08", name: "Machine Circuit",   modality: "Hypertrophy",  fuel: "carb",  cost: 7,  output: 8,  maxSets: 5 },
  { id: "t09", name: "Boulder Session",   modality: "Climbing",     fuel: "fat",   cost: 4,  output: 5,  maxSets: 8 },
  { id: "t10", name: "Hill Repeats",      modality: "Endurance",    fuel: "fat",   cost: 8,  output: 10, maxSets: 5 },
  { id: "t11", name: "Long Ride",         modality: "Endurance",    fuel: "fat",   cost: 9,  output: 11, maxSets: 5 },
  { id: "t12", name: "Zone 2 Run",        modality: "Endurance",    fuel: "fat",   cost: 6,  output: 7,  maxSets: 6 },
  { id: "t13", name: "Steady Swim",       modality: "Endurance",    fuel: "fat",   cost: 7,  output: 8,  maxSets: 6 },
  { id: "t14", name: "Kettlebell Complex",modality: "Conditioning", fuel: "either",cost: 8,  output: 10, maxSets: 4 },
  { id: "t15", name: "Rowing Intervals",  modality: "Conditioning", fuel: "either",cost: 9,  output: 11, maxSets: 4 },
  { id: "t16", name: "Pickup Game",       modality: "Sport",        fuel: "either",cost: 8,  output: 9,  maxSets: 4 },
  { id: "t17", name: "Circuit Rounds",    modality: "Conditioning", fuel: "either",cost: 7,  output: 8,  maxSets: 5 },
  { id: "t18", name: "Burpee AMRAP",      modality: "Conditioning", fuel: "either",cost: 6,  output: 7,  maxSets: null },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CONST, FOOD_CARDS, TRAINING_CARDS,
    demandForRound, proteinThreshold, engineMultiplier,
    setDiminishMultiplier, foodCardEnergy,
  };
}
