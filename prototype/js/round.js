// MacroHack Grey Box Prototype — Round State
// Tracks one round's running totals as food is drafted. Training draft
// (step 3) and week-chaining (step 4) will extend this module.

function randleSplit(carbEnergy, fatEnergy) {
  const greater = Math.max(carbEnergy, fatEnergy);
  const lesser = Math.min(carbEnergy, fatEnergy);
  const r = greater === 0 ? 1 : lesser / greater;
  const usableLesser = lesser * (0.5 + 0.5 * r);
  const suppressed = lesser - usableLesser;

  if (carbEnergy >= fatEnergy) {
    return { usableCarb: carbEnergy, usableFat: usableLesser, suppressedCarb: 0, suppressedFat: suppressed };
  } else {
    return { usableCarb: usableLesser, usableFat: fatEnergy, suppressedCarb: suppressed, suppressedFat: 0 };
  }
}

class RoundState {
  constructor(roundNumber, engine, reserve, foodPool, trainingPool) {
    this.roundNumber = roundNumber;
    this.engine = engine;
    this.reserve = reserve;
    this.demand = demandForRound(roundNumber);
    this.threshold = proteinThreshold(engine);

    // Pools are shared arrays owned by the caller; we splice from them.
    this.foodPool = foodPool;
    this.trainingPool = trainingPool;

    this.week = 1;
    this.protein = 0;
    this.carbEnergyEarned = 0;
    this.fatEnergyEarned = 0;
    this.carbEnergySpent = 0;
    this.fatEnergySpent = 0;
    this.trainingScore = 0;

    this.playedFood = [];
    this.playedTraining = [];
  }

  // --- Food draft -----------------------------------------------------

  drawFoodChoices() {
    return drawFromPool(this.foodPool, CONST.DRAFT_SIZE);
  }

  playFoodCard(card, offeredChoices) {
    this.protein += card.p;
    const e = foodCardEnergy(card);
    this.carbEnergyEarned += e.carbEnergy;
    this.fatEnergyEarned += e.fatEnergy;
    this.playedFood.push(card);
    depleteChoices(this.foodPool, offeredChoices);
  }

  // Current Randle state, recomputed from running earned/spent totals —
  // per v3 §6, suppression can only lock energy still held.
  energyState() {
    const heldCarb = this.carbEnergyEarned - this.carbEnergySpent;
    const heldFat = this.fatEnergyEarned - this.fatEnergySpent;
    const split = randleSplit(heldCarb, heldFat);
    return {
      heldCarb, heldFat,
      usableCarb: split.usableCarb,
      usableFat: split.usableFat,
      suppressedCarb: split.suppressedCarb,
      suppressedFat: split.suppressedFat,
    };
  }

  proteinMet() {
    return this.protein >= this.threshold;
  }

  // --- Training draft ---------------------------------------------------

  drawTrainingChoices() {
    return drawFromPool(this.trainingPool, CONST.DRAFT_SIZE);
  }

  // Which color a card's cost draws from right now. "Either" cards draw
  // from whichever color has more USABLE energy — the color least likely
  // to still be sitting in the suppressed bucket.
  resolveFuelColor(card) {
    if (card.fuel !== "either") return card.fuel;
    const es = this.energyState();
    return es.usableCarb >= es.usableFat ? "carb" : "fat";
  }

  // Usable energy available for a given color, before any spend.
  usableEnergyFor(color) {
    const es = this.energyState();
    return color === "carb" ? es.usableCarb : es.usableFat;
  }

  // How many Sets of this card are affordable given currently usable
  // energy in its resolved color (not counting cap).
  maxAffordableSets(card) {
    const color = this.resolveFuelColor(card);
    const usable = this.usableEnergyFor(color);
    const byEnergy = Math.floor(usable / card.cost);
    const byCap = card.maxSets === null ? Infinity : card.maxSets;
    return Math.max(0, Math.min(byEnergy, byCap));
  }

  // Total Output for playing `card` at `sets` Sets, applying the diminish
  // curve per Set. Returns { output, energyCost } without mutating state,
  // so the UI can preview before commit.
  previewSets(card, sets) {
    let output = 0;
    for (let i = 1; i <= sets; i++) {
      output += card.output * setDiminishMultiplier(i);
    }
    return { output, energyCost: card.cost * sets };
  }

  // Commit: spend energy (from the resolved color, or split across both
  // if a color runs short mid-purchase — shouldn't happen given
  // maxAffordableSets, but guarded), add Output to Training Score.
  playTrainingCard(card, sets, offeredChoices) {
    const color = this.resolveFuelColor(card);
    const { output, energyCost } = this.previewSets(card, sets);

    if (color === "carb") this.carbEnergySpent += energyCost;
    else this.fatEnergySpent += energyCost;

    this.trainingScore += output;
    this.playedTraining.push({ card, sets, output, energyCost, color });
    depleteChoices(this.trainingPool, offeredChoices);
  }

  // --- Recomp -------------------------------------------------------------
  // Applies v3 §13's pipeline and §9/§6's end-of-round body updates.
  // Pure calculation — does not mutate `this`, so the UI can render a
  // preview before the player confirms and advances to the next round.
  resolveRecomp() {
    const roundOutput = this.trainingScore * engineMultiplier(this.engine) * CONST.EFFICIENCY;
    const passed = roundOutput >= this.demand;

    // v3 §6: "At Recomp, all unspent energy routes to Reserve — suppressed
    // or not." Unspent = earned - spent, full held amount, regardless of
    // what Randle had suppressed.
    const unspentCarb = this.carbEnergyEarned - this.carbEnergySpent;
    const unspentFat = this.fatEnergyEarned - this.fatEnergySpent;
    const unspentTotal = unspentCarb + unspentFat;
    const reserveGain = unspentTotal / CONST.RESERVE_CONVERSION_DIV;
    const newReserve = this.reserve + reserveGain;

    // v3 §6: protein threshold gates Engine growth; decays only if also
    // in deficit (prototype proxy: unspent energy below a floor — see
    // Prototype-Cards.md §1, marked invented).
    const proteinMet = this.proteinMet();
    let engineDelta = 0;
    if (proteinMet) {
      engineDelta = CONST.ENGINE_GROWTH;
    } else if (unspentTotal < CONST.ENGINE_DECAY_UNSPENT_FLOOR) {
      engineDelta = -CONST.ENGINE_DECAY;
    }
    const newEngine = Math.max(0, this.engine + engineDelta);

    return {
      trainingScore: this.trainingScore,
      engineMultiplier: engineMultiplier(this.engine),
      efficiency: CONST.EFFICIENCY,
      roundOutput,
      demand: this.demand,
      passed,
      margin: roundOutput - this.demand,
      unspentCarb, unspentFat, unspentTotal,
      reserveGain,
      newReserve,
      proteinMet,
      engineDelta,
      newEngine,
    };
  }
}

// Draw n random cards from pool without removing them yet (removal happens
// on play, via depleteChoices — the other two offered cards deplete too).
function drawFromPool(pool, n) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, pool.length));
}

function depleteChoices(pool, offeredChoices) {
  offeredChoices.forEach(card => {
    const idx = pool.findIndex(c => c.id === card.id);
    if (idx !== -1) pool.splice(idx, 1);
  });
}

if (typeof module !== "undefined" && module.exports) {
  Object.assign(module.exports, { RoundState, randleSplit, drawFromPool, depleteChoices });
}
