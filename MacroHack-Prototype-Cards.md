# MACROHACK — Prototype Card Content

*Companion to MacroHack-Prototype-GDD.md. This is the tuned data set for the 3-round grey-box build — 20 food cards, 18 training cards, and the constants they're balanced against.*

**Everything here is tuned as one system.** The food macro values, the training energy costs, the protein threshold and the Demand curve were solved together. Changing one number in isolation will break the difficulty curve — the worked checks in §5 are what to re-run if you do.

---

## 1. Tuning Constants

Values v3 states, and values v3 leaves open that had to be pinned to make the prototype run. Invented values are marked ⚠ — they are prototype-only guesses, not design decisions inherited from v3.

| Constant | Value | Source |
|---|---|---|
| Carb Energy | `4 × Carbs` | v3 §6 |
| Fat Energy | `9 × Fat` | v3 §6 |
| Protein threshold | `T = 12 + (Engine × 0.25)` | v3 §6 |
| Engine Multiplier | `0.7 + (Engine / 100)` | v3 §9 |
| Demand | `100 × 1.25^(n-1)` → 100 / 125 / 156 | v3 §12 |
| Randle | `usable lesser = lesser × (0.5 + 0.5r)` | v3 §6 |
| Efficiency | **frozen at 1.0** | Prototype GDD §3 |
| Set diminish, sets 1–5 | 100 / 90 / 80 / 70 / 60% | v3 §8 |
| ⚠ Set diminish, sets 6+ | 50 / 40 / 30%, **floor 30%** | v3 stops at set 5. Needed for high-cap Endurance cards. |
| ⚠ Starting Engine | 20 | v3 never states a start value |
| ⚠ Engine growth | **+10** per round the threshold is cleared | v3 never states a rate |
| ⚠ Engine decay | **−5** if threshold missed *and* unspent energy < 10 | Prototype proxy for v3's "decays if also in deficit" |
| ⚠ Starting Reserve | 25 | v3 never states a start value |
| ⚠ Reserve conversion | `Reserve += unspent energy / 10` at Recomp | v3 says energy routes to Reserve, never at what rate |
| ⚠ Food pool | 20 cards | See §4 — 15 exhausts exactly |
| ⚠ Training pool | 18 cards | Same |

### Derived difficulty targets

Engine climbs 20 → 30 → 40 across the three rounds, so the multiplier climbs 0.90 → 1.00 → 1.10 and the protein threshold climbs with it. Round 3 lands on Engine 40 / ×1.10 deliberately — that's the exact figure v3 §13's worked baseline uses.

| Round | Demand | Engine | Multiplier | Protein threshold | **Training Score needed** |
|---|---|---|---|---|---|
| 1 | 100 | 20 | ×0.90 | 17 | **112** |
| 2 | 125 | 30 | ×1.00 | 19.5 | **125** |
| 3 | 156 | 40 | ×1.10 | 22 | **142** |

Note the shape: the player's multiplier grows 22% across the run while Demand grows 56%. The gap is what has to be closed by drafting and Set allocation getting better — which is the skill the playtest is measuring.

---

## 2. Food Cards (20)

Free to play. All three drawn cards deplete, per v3 §4/§7. No Meals (unlock/lock riders) in the prototype — these are pure macro payloads.

| # | Card | P | C | F | Carb E | Fat E | Total E | Lean |
|---|---|---|---|---|---|---|---|---|
| 1 | **Chicken & Potatoes** | 6 | 5 | 0 | 20 | 0 | 20 | Protein / carb |
| 2 | **Cottage Cheese** | 6 | 2 | 1 | 8 | 9 | 17 | Protein |
| 3 | **Steak & Rice** | 5 | 4 | 1 | 16 | 9 | 25 | Protein / carb |
| 4 | **Salmon Fillet** | 5 | 0 | 4 | 0 | 36 | 36 | Protein / fat |
| 5 | **Whey Shake** | 5 | 1 | 0 | 4 | 0 | 4 | Pure protein |
| 6 | **Bacon & Eggs** | 5 | 0 | 5 | 0 | 45 | 45 | Protein / fat |
| 7 | **Sweet Potato & Tuna** | 5 | 6 | 0 | 24 | 0 | 24 | Protein / carb |
| 8 | **Greek Yogurt & Berries** | 4 | 3 | 1 | 12 | 9 | 21 | Balanced |
| 9 | **Eggs & Avocado** | 4 | 1 | 4 | 4 | 36 | 40 | Protein / fat |
| 10 | **Protein Bar** | 4 | 4 | 2 | 16 | 18 | 34 | Balanced |
| 11 | **Nut Butter Toast** | 3 | 4 | 3 | 16 | 27 | 43 | Balanced |
| 12 | **Cheese Board** | 3 | 1 | 5 | 4 | 45 | 49 | Fat |
| 13 | **Pasta Plate** | 2 | 7 | 1 | 28 | 9 | 37 | Carb |
| 14 | **Oats & Banana** | 2 | 6 | 1 | 24 | 9 | 33 | Carb |
| 15 | **Instant Noodles** | 2 | 6 | 3 | 24 | 27 | 51 | Carb / fat |
| 16 | **White Rice Bowl** | 1 | 8 | 0 | 32 | 0 | 32 | Pure carb |
| 17 | **Sourdough & Jam** | 1 | 6 | 0 | 24 | 0 | 24 | Pure carb |
| 18 | **Fries** | 1 | 7 | 4 | 28 | 36 | 64 | Carb / fat |
| 19 | **Side Salad** | 1 | 2 | 1 | 8 | 9 | 17 | Weak |
| 20 | **Olive Oil & Greens** | 0 | 1 | 5 | 4 | 45 | 49 | Pure fat |

**The pool's central trap, by construction.** The five highest-energy cards — Fries (64), Instant Noodles (51), Cheese Board (49), Olive Oil & Greens (49), Bacon & Eggs (45) — total 258 energy but only **11 protein against a threshold of 17.** Greedy max-energy drafting fails the protein cliff. That is v3 §6's "take the card with the biggest numbers becomes actively wrong," made literal in the data.

**The protein cards are deliberately energy-poor.** Whey Shake (5P, 4 energy) and Cottage Cheese (6P, 17 energy) are the two cleanest threshold-clearers and among the worst fuel cards in the deck. Every round forces the player to spend draft picks on cards that don't fuel training.

---

## 3. Training Cards (18)

Cost a specific energy color. Output is per-Set; Sets retrigger at the diminishing rate. Set caps are printed per card, per v3 §8.

| # | Card | Modality | Fuel | Cost | Output | Max Sets | Out/Energy |
|---|---|---|---|---|---|---|---|
| 1 | **Deadlift** | Strength | Carb | 16 | 26 | 2 | 1.63 |
| 2 | **Back Squat** | Strength | Carb | 14 | 22 | 3 | 1.57 |
| 3 | **Bench Press** | Strength | Carb | 10 | 15 | 3 | 1.50 |
| 4 | **Overhead Press** | Strength | Carb | 9 | 13 | 3 | 1.44 |
| 5 | **Sprint Intervals** | Conditioning | Carb | 7 | 9 | 4 | 1.29 |
| 6 | **Leg Press Drop** | Hypertrophy | Carb | 8 | 10 | 5 | 1.25 |
| 7 | **Curl Superset** | Hypertrophy | Carb | 5 | 6 | 6 | 1.20 |
| 8 | **Machine Circuit** | Hypertrophy | Carb | 7 | 8 | 5 | 1.14 |
| 9 | **Boulder Session** | Climbing | Fat | 4 | 5 | 8 | 1.25 |
| 10 | **Hill Repeats** | Endurance | Fat | 8 | 10 | 5 | 1.25 |
| 11 | **Long Ride** | Endurance | Fat | 9 | 11 | 5 | 1.22 |
| 12 | **Zone 2 Run** | Endurance | Fat | 6 | 7 | 6 | 1.17 |
| 13 | **Steady Swim** | Endurance | Fat | 7 | 8 | 6 | 1.14 |
| 14 | **Kettlebell Complex** | Conditioning | Either | 8 | 10 | 4 | 1.25 |
| 15 | **Rowing Intervals** | Conditioning | Either | 9 | 11 | 4 | 1.22 |
| 16 | **Pickup Game** | Sport | Either | 8 | 9 | 4 | 1.13 |
| 17 | **Circuit Rounds** | Conditioning | Either | 7 | 8 | 5 | 1.14 |
| 18 | **Burpee AMRAP** | Conditioning | Either | 6 | 7 | **uncapped** | 1.17 |

### The carb/fat trade, stated

Carb-cost cards convert energy to Output better (1.14–1.63) than fat-cost cards (1.14–1.25). Fat cards are compensated on the food side: fat yields `9×` per gram against carbs' `4×`, so a 5F card produces 45 energy where an 8C card produces 32. **Fat is abundant and converts poorly; carbs are scarce and convert well.** That is directionally honest to the underlying physiology and it's the prototype's answer to v3 Open Question 5 — provisional, and exactly the thing the playtest should measure.

The second lever is Set caps. Strength prints Max 2–3, so a single Strength card can only absorb 32–42 energy no matter how much you have. With five training picks per round, you cannot dump a large carb pool into Strength alone.

**Burpee AMRAP is the energy dump valve.** Uncapped, auto-resolving, poor rate once the diminish floor bites (~0.68 effective at 10 sets). It exists so a player who over-ate has somewhere to put it, at a bad price.

---

## 4. Why the pools are 20 and 18, not 15 and 15

The Prototype GDD said "roughly 15 food / 15 training." **That number is wrong, and it's worth stating why.**

Draft-with-depletion shows 3 cards per pick and depletes all 3. Five picks per round = **15 cards seen and consumed.** A 15-card pool is therefore exhausted *exactly* at week 5 — the player sees every card in the deck every round, and by week 3 knows with certainty what remains.

That kills the specific tension v3 §6 asks for: *"gambling that a bigger card surfaces before the pool depletes."* There is no gamble if the pool is fully known.

At 20 food cards, 15 surface and **5 never do** — so the +6P card genuinely might not come. At 18 training cards, 3 stay buried. Pools refill between rounds, so each round re-rolls which cards hide.

---

## 5. Worked Checks

Re-run these if you change any number above.

### Round 1 — competent play clears

A protein-first draft: Chicken & Potatoes, Salmon Fillet, Steak & Rice, Cottage Cheese, Bacon & Eggs.

```
Protein  = 6 + 5 + 5 + 6 + 5 = 27   vs threshold 17 ✓
Carb E   = 20 + 0 + 16 + 8 + 0 = 44
Fat E    = 0 + 36 + 9 + 9 + 45 = 99

Randle:  greater = 99 (fat), lesser = 44 (carb), r = 0.444
         usable lesser = 44 × (0.5 + 0.222) = 31.8
         suppressed    = 12.2
Usable   = 99 Fat + 31.8 Carb = 130.8
```

Spending that across five training picks — fat into Hill Repeats / Long Ride / Zone 2 Run, carbs into Back Squat / Bench Press — lands **Training Score ≈ 131.**

```
131 × 0.90 (Engine 20) × 1.0 (Efficiency frozen) = 118  vs Demand 100 ✓
```

Cleared by 18%. Competent, unremarkable play wins round 1 — the shape v3 §13 asks for.

### Round 3 — the same play fails

Carry the same skill level forward. Engine is now 40 (×1.10), threshold 22, Demand 156.

```
131 × 1.10 = 144  vs Demand 156 ✗
```

**Misses by 12.** This is intentional and is the whole point of the third round: the player must close the gap by drafting better — chasing carb-dense cards for the better conversion rate, or committing mono-fuel to dodge Randle suppression, and allocating Sets against the diminish curve rather than filling every cap.

It also reproduces v3 §13's "plain play dies" lesson inside three rounds instead of five, which is what makes a 3-round slice worth testing at all.

⚠ **This is the number most likely to need tuning tonight.** If testers hit a wall at round 3 and read it as unfair rather than as a puzzle, raise Engine growth from +10 to +12 (multiplier 0.90 → 1.04 → 1.18, needed TS 142 → 132) before touching card values.

---

## 6. Deviations from v3, flagged

Things where the data set does not match what v3 literally says. Each is a deliberate call, not an oversight.

1. **Macro values are scaled up past v3's stated "+1 / +2 / +3" spread (§7), and past the `3P 2C 0F` Steak & Rice example.** This is a genuine contradiction in v3, not a preference. If protein cards cap at 3P, five picks yield at most 15 protein — and the threshold is `12 + Engine×0.25`, which is 15 only at Engine 12 and rises from there. At v3's own stated Engine values (40 → threshold 22, 68 → threshold 29) the cliff is **mathematically unclearable.** Either protein values scale or the threshold formula changes. I scaled the values, since the formula is cited more load-bearingly across §6 and §9. **Worth a decision from you — it propagates to the real game, not just the prototype.**

2. **Yoga is cut from the training set.** Its two printed identities (§8) are "makes Sets cheaper" and "converts unspent energy at Recomp." The second needs Efficiency, which is frozen. The first has no target — with one training card per week, there are no *other* cards for it to discount. Yoga needs either a next-week effect or multi-card weeks to exist at all; both are out of scope tonight.

3. **Set diminish is extended past set 5 with a 30% floor.** v3's table stops at set 5. Without a floor, a Max-8 Climbing card's last sets are worth nearly nothing and high caps become a fake stat.

4. **Engine growth, Engine decay, Reserve start and Reserve conversion rate are invented.** v3 specifies none of them. All four are marked ⚠ in §1 and are the first knobs to turn if the curve feels wrong.

5. **Reserve does nothing.** With Reserve Employers cut (§15), Reserve is a number that moves at Recomp and is never read. Kept visible anyway — it's the honest v3 behavior (Reserve is dormant until employed), it costs nothing, and it lets a tester watch the body change.

6. **No upgrade / rule-changer cards**, per the previous chunk's reasoning. Round-3 math above assumes zero rule-changers and still resolves, which is the check that the omission holds.
