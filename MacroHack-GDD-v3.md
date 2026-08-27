# MACROHACK — Game Design Document v3

*Supersedes MacroHack-GDD.md (v2) in full. Numbers are disposable; design intent is the stable part.*

**Mechanics are directionally honest; magnitudes are theatrical.**

---

## 0. Design Thesis

**Two goals, in priority order.**

**One — macro management must be fun.** If managing macros isn't fun, we're designing the wrong game. Every system in this document exists to sharpen that core, or it gets deleted.

**Two — this is a quiet answer to the knowledge half of the obesity epidemic.** It never says so out loud. It is nowhere near the core loop. But nobody should finish a winning run and think *I wish I understood how my actual body worked.* Goal Two is achieved entirely as a byproduct of Goal One being achieved honestly. The moment it becomes the point, the game dies.

**Core fantasy:** the optimization and allocation of energy resources. MacroHack is not a life simulator — it uses the supportive systems of lifestyle (training, work, relationships) to sharpen the core fun of managing a body and its resources.

### The ethos, stated

- **Macros are the game.**
- **Pressure comes from a ratchet, not a clock.** Escalating sufficiency at your own pace.
- **Input randomness, output determinism.** Randomness at the draw, fixed math at resolution. Skill stays legible.
- **Meta-progression rewards retained information, not accrued power.**
- **A single fail state.** Everything else was pruned to protect it.
- **Turn-unlimited.** No clock, no reflex, pause anywhere, resume anywhere, think for four minutes if you want to. This is *not* the same as designing for divided attention — the target is an attention parasite that never rushes you.

---

## 1. Overview

MacroHack is a roguelite resource-management deckbuilder. A **run** is eight **rounds**. A round is a five-week training block, played as five micro-turns. Each week the player drafts one food card and one training card, and the week resolves immediately. At the end of the round, the body recomposes and the run either continues or ends.

The player selects a **Tape** before each run. A Tape is an instructor, a starting deck bias, and one rule twist.

---

## 2. Tone, Art & Sound

**Tone is intentionally absurd — but never comedic and never sarcastic.** The mechanics stay directionally correct and reverent toward biology. Absurdity lives in scale, presentation and character, not in mocking the subject. The game takes physiology completely seriously and takes *itself* not at all.

This is also the tonal lane the nearest competitor isn't in. GET YOKED is comedy. Reverent absurdity is the open ground, and it's the only tone compatible with Goal Two.

**Visual direction: 90s VHS fitness tape, roughly 80% analog / 20% digital.** Film grain, tracking artifacts, CRT curvature and scanline shaders, oversaturated tape color, chunky title cards. Against that, deliberate digital-era glitch: frame corruption, UI elements that stutter and resolve. The name is the art direction — *macro* is the analog body, *hack* is the intrusion into it.

**Figure style is Memphis-flat.** Two or three colors, no shading, no gradients. The player character is a retro multicolored silhouette of a trainee in leotard and legwarmers. Instructors are drawn in the same language.

**Audio follows the same ratio.** 80% period-accurate retro workout music, 20% modern glitch-forward electronic. The glitch layer intensifies as Efficiency falls, so the soundtrack itself reports how broken the run is getting.

### Scope discipline on effects

- **CRT, grain, scanline, curvature:** cheap, always on, the identity. Keep.
- **Datamosh:** prerendered transitions only. Live datamosh is a solo-dev tarpit and buys nothing a prerendered tear doesn't.
- **Adaptive audio:** a two-layer crossfade — clean mix ↔ glitch mix — driven by the Efficiency band. Not middleware. One float, two stems.

The 80/20 ratio survives at a fraction of the cost.

---

## 3. The Shelf — Tapes & Frame

**Main menu is a shelf of VHS tapes beside a deck.** Pressing Play is physically pushing a tape in. The machine accepts it, the tracking settles, the tape plays.

**Vol. 1 sits alone on the top shelf, on its side.** It is the tutorial, and it is not optional. Below it are the shelves that hold the real game.

### A Tape is exactly three things

1. **An instructor** — printed on the cover, the character you operate for the run
2. **A starting deck bias** — the food and training cards you begin with
3. **One rule twist** — a single printed rule that changes how the run plays

Each spine carries its title and a small worn number: the highest **Generation** cleared on that tape. A separate shelf holds the **Collection** — promoted Collector's Edition cards.

**You are not playing yourself.** You are operating a tape instructor who lives inside a cassette. This is load-bearing, not decoration. The disembodiment makes every food and training choice a decision about *a character*, not a judgment about the player's own body — the single most effective wellbeing mechanism in the design, at zero cost. It also licenses the absurdity: a VHS instructor can plausibly do 120 sets.

### Vol. 1 — the tutorial that isn't framed as one

Players skip anything that reads as *not the game yet*. Vol. 1 is a tape. It is a shorter, simpler tape, framed as the primitive first edition of the series — because that is what it is in fiction. It plays for real, it produces a Physique Card, and it sits on the shelf forever.

**Controlled opening hand.** Nobody's first-ever draft is garbage. The first three food cards and first three training cards are fixed.

**Gating order:**

| When | What's introduced |
|---|---|
| Minute one | Food gives energy. Training spends it. Score vs. Demand. Three systems, nothing else. |
| Round 2 | Protein threshold and Engine. |
| Round 3+ | Efficiency begins to drift. The band is on screen from the start; in Vol. 1's early rounds it simply doesn't move. |
| Event-driven | Randle and suppression are taught the first time a lopsided pick suppresses energy. The announcement names it. Never front-loaded. |

Teach time has to fit inside Steam's two-hour refund window with room to spare. Nothing here is a modal, a pointer, or a voice telling you what to click.

Other menus: **Collection**, **Settings**. Pause menu: quit to shelf, start new run, Pull the Tape.

---

## 4. Run Structure

1. **Tape select** — instructor, deck bias, rule twist
2. **Collector Loadout** — selected once per run, before the gauntlet is visible
3. **Round Select** — choose your Demand where the round offers a choice
4. **The Week Ladder** — five weeks, each one: draft food → draft training → resolve
5. **Recomp** — the round resolves; body composition, adaptation, money, Demand met or missed
6. **Shop** — Groceries and Packs
7. Loop to Round Select

### The Week Ladder

**Each week is a micro-turn:**

1. Draw **3 food cards**, pick 1. Macros land. Energy lands. The body updates.
2. Draw **3 training cards**, pick 1. Energy spends. Score climbs.
3. Week resolves.

Five weeks, five payoff beats.

**Food is committed before that week's training is revealed.** You can't fix week 3's food after seeing week 3's training draw.

**Draft-with-depletion runs across the whole round.** The pool shrinks with every pick and never refills mid-round, so week five is made under genuine scarcity that week one wasn't. Tension escalates for free, with no timer.

**Cheat Meal.** Once per round, reject all three food cards and redraw three from the pool. The rejected cards are still depleted — the redraw costs you pool depth, and it costs more the later you spend it.

### Round Select

Rounds offer a **choice of two Demands**, each with its own modifier and its own reward skew (extra Dollars, a free pack, a Groceries discount). Every fourth round is a **Boss**: a single forced Demand, visible from the start of the cycle.

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| | choice | choice | choice | **BOSS** | choice | choice | choice | **BOSS** |

The Boss being foreseen is the whole point. You are not choosing the easiest three Demands — you are choosing three Demands that leave you in a shape that can beat the fourth. That is the run's only macro-strategic layer, and it costs almost no content.

### Pull the Tape

Concede from anywhere. Exists because the fail state is visible a full round out — without an exit, a player who correctly reads a dead run at Recomp 6 must play five more weeks to confirm it.

**The payout is a snapshot, not a settlement.** Everything banked at the moment of ejection pays: Ledger, Physique Card, Collection progress from cards actually played, unlocks whose conditions have already resolved. Nothing that was still cooking pays. Nothing vests on the run ending.

> **Core rule: quitting can never earn more than playing on.** It forfeits all remaining upside and buys back time.

**The confirmation names the cost.** The dialog shows unearned progress left on the table — cards at 4/5 plays, a pending round clear, a Physique Card that improves in two rounds. The honesty contract, applied to the exit door. This is also the friction that stops conceding becoming a habit: the player who ejects anyway has read the bill and paid it. Confirmation is required; a misclick eating a live run is worse than the problem being solved.

**Ceremony is unchanged.** A conceded run is a finished run. The Physique Card generates, the shelf remembers, the tape ejects with dignity — the player pulled it themselves rather than getting recorded over. The Ledger goes diagnostic: name the round it went wrong and why. Conceding becomes the fastest route to the lesson, which is the meta-progression thesis stated exactly.

---

## 5. Core Resources & Terminology

| Term | What it is |
|---|---|
| **Macros** | Protein, Carbs, Fat. Color-coded on every card. |
| **Carb Energy** | Fast fuel. One segment of the energy bar. |
| **Fat Energy** | Dense slow fuel. The other segment. |
| **Suppressed** | Energy earned but locked by Randle. Greyed, not gone. |
| **Reserve** | Stored energy. *(Formerly "body fat." Glycogen is Reserve; they were never two things.)* |
| **Engine** | Lean mass. |
| **Efficiency** | Output multiplier. Drifts with feeding history. The ratchet. |
| **Dollars** | Groceries, packs, upgrades. |
| **Training Score** | The round's accumulated output before multipliers. |
| **Round Output** | Training Score after all multipliers. What the Demand is measured against. |
| **The Demand** | The output the round requires. |

---

## 6. The Macro System

Each macro is correct for a reason and incorrect for a reason. That tension is the game.

### Protein — a cliff, not a slope

Protein is **not spendable on training.** It exists to clear a threshold.

```
Threshold T = 12 + (Engine × 0.25)
```

Round protein total **≥ T** → Engine grows.
**< T** → no Engine growth, and Engine decays if you're also in deficit.

Below the line, protein does nothing. Above it, surplus is largely wasted. This makes the value spread on protein cards genuinely agonizing: seeing a +1 when you need +3 to clear forces a real choice between banking safe value now and gambling that a bigger card surfaces before the pool depletes.

Note the built-in cruelty: **the threshold scales with Engine.** The bigger you get, the more it costs to stand still. Engine charges rent.

### Two-Color Energy

There is no abstract energy pool. Energy exists in two colors, shown as one bar with two segments.

```
Carb Energy = 4 × Carbs
Fat Energy  = 9 × Fat
```

**Training cards cost a specific color.** Explosive and high-intensity work costs Carb Energy. Steady and low-intensity work costs Fat Energy. Some cards accept either. You cannot mismatch fuel — you can only be short of a color, and you see the shortage on the bar before you pick.

### The Randle Cycle

Real mechanism: glucose oxidation and fatty-acid oxidation reciprocally inhibit one another. Whichever fuel dominates suppresses the other's yield.

```
greater = max(Carb Energy, Fat Energy)
lesser  = min(Carb Energy, Fat Energy)
r       = lesser / greater          (r = 1 if greater = 0)

Usable lesser = lesser × (0.5 + 0.5r)
Suppressed    = lesser × 0.5 × (1 − r)
```

**The greater fuel always yields in full. Only the lesser fuel is ever suppressed.** The grey therefore always sits on the color that's losing.

| Split | Raw | After Randle | Suppressed |
|---|---|---|---|
| 100 / 0 (mono-fuel) | 100 | 100 | 0% |
| 50 / 50 (parity) | 100 | 100 | 0% |
| 80 / 20 (lopsided) | 100 | 92.5 | 7.5% |
| 117 / 60 | 177 | 162 | 8.5% |

**The Randle Cycle punishes the half-committed.** Commit to one fuel or split evenly; the mushy middle is where you bleed. Two viable answers, mapping to two real dietary archetypes, and *"take the card with the biggest numbers"* becomes actively wrong.

### Suppressed Energy — held, not destroyed

Every gram printed on a card converts and lands. Nothing is taken cold. What Randle withholds shows as a greyed segment tagged **SUPPRESSED**, inside the lesser color's portion of the bar.

**Randle recomputes on the round's running totals, every time food lands.** A later corrective card **releases previously suppressed energy live, back into the usable pool.** A lopsided week 1 can be rescued by a corrective week 3. Correcting the ratio is a real strategic verb, and suppression is a recoverable position rather than a flat penalty.

Three quantities are tracked per color:

```
Available = Earned − Suppressed − Spent
```

Earned and Spent only accumulate. Suppressed recomputes on every food card, and **can only lock energy you still hold.** Energy already spent is spent.

That last rule produces a genuine decision rather than an exploit. Spending immediately protects energy from future suppression; banking energy for a huge week-five AMRAP exposes the whole bank to a bad draw. Hoard or spend is now a live question every single week.

**Energy remains energy for the entire round.** It is never converted mid-round. Suppressed or usable, it sits in the two-color bar waiting.

**At Recomp, all unspent energy routes to Reserve** — suppressed or not. Visually, both segments slide down into the body. Energy is never destroyed, only routed. Wordless, honest, and it teaches the entire mechanic in one animation.

**The inversion:** builds that employ Reserve (§15) *want* this. For Strongman or Open Water, eating deliberately lopsided is a Reserve pump rather than a mistake. The same mechanic is a leak or a tool depending on who employs your fat.

### Macro identity

| Macro | Verb | Fuels | Fails by |
|---|---|---|---|
| **Protein** | Clear a threshold | Nothing — gates Engine only | Missing the cliff |
| **Carbs** | Fast fuel | Explosive / high-intensity cards | Being suppressed by fat; spilling to Reserve |
| **Fat** | Dense slow fuel | Steady / low-intensity cards | Being suppressed by carbs; spilling to Reserve |

---

## 7. Food Cards & Meals

Food cards are **free to play**. The food deck is a fridge/pantry — non-consumable across the run. To improve it, pay Dollars at Groceries to replace a card of your choosing. Within a round, all drawn cards are **depleted**, not replaced.

Cards are color-coded by primary macro.

### Meals — food as a verb

A food card is not only a macro payload. **A meal enables or forbids.**

> **Steak & Rice** — 3P 2C 0F
> Clears threshold. Next training: high-intensity unlocked.

> **Olive Oil & Greens** — 0P 0C 2F
> Next training: high-intensity locked.

This is what makes the food draft matter beyond arithmetic. A card with mediocre macros that unlocks the training you need beats a card with great macros that forbids it. It also makes the week's food-before-training commitment genuinely fraught: you aren't just guessing at numbers, you're choosing which doors stay open.

### Value spread

Macro cards exist across a range (+1 / +2 / +3). Drawing the weak version of what you need is a real decision, not a rounding error.

---

## 8. Training Cards, Sets & Training Score

Deck shape: fewer total cards than the food deck, **3 drawn per pick.** Training cards cost Energy of a specific color.

### Sets are retriggers

Every training card carries a base **Training Score Output** and a **printed Set cap**.

**A Set is a retrigger.** The card resolves once per Set. The player clicks the card to add Sets, up to its cap.

**Sets cost full energy every time. Output diminishes:**

| Set | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Output** | 100% | 90% | 80% | 70% | 60% |

Flat cost with falling return means every card has a moving optimum — one that depends on how much energy you have left, in which color, what your cap is, and what you think is coming.

**The power fantasy is flattening that curve.** Cards that read *"Sets no longer diminish"* or *"each Set gains instead of losing"* are among the strongest in the game, because they convert a decision into an engine.

### Set caps are printed per card, not global

A heavy squat prints **Max 3**. An interval card prints **Max 12**. This is what keeps the game from collapsing into resistance training — if caps were global, every modality would converge on the same shape. Printed caps also make *"+1 Set to all training cards"* and *"+3 Max Sets on one card"* genuinely different upgrades.

### One mechanic, native vocabulary

| Modality | Prints as | Fuel | Set identity |
|---|---|---|---|
| **Strength** | Sets | Carb | Few Sets, enormous Output each |
| **Hypertrophy** | Sets | Carb | The volume archetype — moderate everything, scales wide |
| **Conditioning / CrossFit** | Rounds | Either | **AMRAP: uncapped — repeats until the energy runs out** |
| **Endurance** | Intervals | Fat | Very high caps, tiny Output each |
| **Yoga** | Rounds | Fat | Adds no Sets; makes Sets cheaper, and converts unspent energy at Recomp |
| **Sport** | Periods | Either | Conditional Sets — scaling off other conditions |
| **Climbing** | Burns | Fat | Low energy per Set, rewards low Reserve |

**AMRAP auto-resolves.** "As many rounds as possible" is a declaration, not 120 clicks. Its output is a pure function of how large an energy pool you built — worthless in round 2, the centre of the universe in round 8.

### Deload cards

A class of training cards available only during a **maintenance round** (§11). Cheap, low Output, and they carry deck-manipulation riders: thin a card from the deck, duplicate a card, retag a training card's fuel color. See §11 — this is what makes the diet break a mode rather than an absence.

### Work Overtime

A training-slot card that earns roughly double normal income in place of training. Costs energy, produces no Training Score.

### Sweat It Out

Every starting deck contains one crude universal converter: **burn Reserve into Fat Energy at a bad exchange rate.** Reserve therefore always has at least one ugly job and is never dead UI. The good jobs (§15) remain the draft prize.

---

## 9. Body Composition — Reserve & Engine

Both are visible at all times. Both persist across rounds. **Body composition is the residue of past transactions, not a spendable resource.**

### Engine

Lean mass. Provides the output multiplier:

```
Engine Multiplier = 0.7 + (Engine / 100)
```

Engine 40 → ×1.10. Engine 68 → ×1.38.

Its cost is the protein threshold, which scales with it. Building Engine is a commitment with a recurring bill.

### Reserve — a dormant axis

**Reserve carries no inherent penalty or bonus at any level.** It can sit anywhere for free. Reserve is meaningless until a card gives it a job. Some cards reward high Reserve, some reward low, some reward the gap between Engine and Reserve.

**Position is free. Travel is expensive.** Sitting anywhere costs nothing. *Moving* Reserve costs macros, energy, and Efficiency. That's where the tension lives, and it's why removing the penalty band doesn't remove the decision.

Two things fall out of this at no cost:

- The diet-culture read dies at the mechanical level. Fat isn't good or bad — it's **unemployed** until you draft its employer. No disclaimer required.
- The same body is a jackpot in one run and dead weight in the next. This only works because disciplines arrive from packs.

### The Reserve Set Point

Where the body "wants" to be, at roughly 25% of Reserve range.

**It carries no penalty and no reward.** Its entire function is to be a reference line that cards read: many cards calculate their effect from the **difference between current Reserve and Set Point**.

Set Point drifts slowly toward sustained Reserve — and that drift is never previewed (§17).

---

## 10. Body-as-HUD

**The resource bar forest is deleted.** Reserve and Engine are not bars. They are the player silhouette, center screen.

### Two resources, two body regions

| Resource | Region | Reads as |
|---|---|---|
| **Engine** | Upper body | Shoulder breadth, limb thickness, taper |
| **Reserve** | Midsection | Belly, hips, softness of outline — angular at low, round at high |

Both channels are **silhouette shape, not interior detail.** This keeps the figure flat, keeps the two readings independent, and avoids needing separate art layers.

Together they produce four instantly distinct corner silhouettes, using real bodybuilding visual language:

- **V-taper** — low Reserve, high Engine
- **Powerlifter** — high Reserve, high Engine
- **Stick** — low Reserve, low Engine
- **Soft** — high Reserve, low Engine

**Set Point is a dotted ghost outline behind the figure** — your current Engine drawn at your Set Point Reserve. The shape your body is trying to return to. When Reserve sits at Set Point, ghost and figure coincide. No number, no tutorial.

### Godot implementation

A **5×5 sprite grid** — 25 unified figures, one per Engine/Reserve combination. **Not two stacked layers.** Muscle detail and outline must be drawn together or the muscle won't register as the outline shifts.

- A single `Sprite2D` selecting a frame by index.
- **No tweening — snap to the nearest frame.** Reserve and Engine only update at Recomp, eight times per run, so the snap *is* the ceremony beat. VHS-era animation didn't interpolate either.
- **Idle motion is transform-only:** vertical bob, slight scale squash, small rotation, driven by an `AnimationPlayer` on the parent `Node2D`. Zero additional drawings, and it prevents dead air between Recomps.

### Validation gate — before the other 21 drawings

Draw **only the four corners.** Show them to someone cold and ask them to sort by muscle and by fat. If they can't, the channel split is wrong and the grid needs rethinking.

One day of work to de-risk the centerpiece visual of the game.

### HUD census

Silhouette (Engine, Reserve, Set Point ghost) · two-color energy bar · protein tracker vs. threshold · symptom band · Demand dial. **Five readouts.**

---

## 11. Efficiency & the Ratchet

**This is the game's central pressure system and its most novel mechanic.**

Real physiology: under a sustained deficit, the body burns less during activity — NEAT falls, output per unit of fuel drops. Under a sustained surplus, it burns more. **The upward adaptation is slower than the downward.**

Consequence: unless a player can spend more time in surplus than deficit without tanking their training, **most runs trend downward metabolically.** That's the ratchet — and unlike an imposed difficulty ramp, it is caused entirely by the player's own choices.

```
Efficiency = 1.0 at run start, drifts with feeding history
```

| Feeding state | Efficiency change per round |
|---|---|
| Aggressive deficit | −5% |
| Mild deficit | −2% |
| Maintenance | rebound (see below) |
| Surplus | small gain; Reserve climbs |

**Recovery scales with depth.** A maintenance round taken at Efficiency 0.70 returns roughly +0.08. Taken at 0.95, roughly +0.02. Physiologically right — leptin restores fast on refeed — and mechanically necessary: flat recovery rates would make the diet break strictly bad play.

The approach to 1.0 is asymptotic. **You can rescue a crisis. You can't grind back to new.**

### The signature decision

> **When do I stop pushing and pay my body back?**

The diet break. Deliberately spending a round at maintenance to buy back Efficiency for the next three. It's a real practice, it's counterintuitive to every instinct the game trains, and it gets harder to justify exactly as it becomes more necessary.

Balatro's recurring question is *which Joker*. Ours is this.

### Maintenance is a mode, not an absence

A round where you declare maintenance must be a round where you **sharpen the knife**, not one where you sit out the fun.

Declaring maintenance unlocks:

- **Deload cards** in the training draft — cheap, low Output, carrying deck-manipulation riders: thin a card, duplicate a card, retag a card's fuel color
- **A Groceries discount** that round — meal prep week
- **Yoga's conversion** — unspent energy at Recomp feeds Efficiency rebound instead of Reserve

The signature decision becomes *"sacrifice scoring to build"* rather than *"sacrifice fun to be correct."* This is the difference between a mechanic players respect and one they actually take.

### Why the ratchet doesn't need a separate difficulty ramp

The Demand rises gently and legibly. Efficiency falls. **The bar barely moves; you do.** That inverts the standard roguelite frame — the enemy isn't getting stronger, you're getting worse — and it means the Degenerate-Strategy Test passes automatically. The safe repeatable line self-nerfs.

### Visibility — the honesty contract

**Efficiency is never hidden. The number is imprecise in the moment; the fact is never in doubt.**

Players tolerate imprecision. They do not tolerate unexplained decline.

**1. The symptom band is a permanent HUD element, with a direction arrow.**

| Band | Efficiency | Reads as |
|---|---|---|
| Springy | 1.05+ | Lifts moving fast, sleeping hard |
| Dialed In | 0.95–1.05 | Everything's working |
| Flat | 0.85–0.95 | Warm-ups feel heavy |
| Cold | 0.75–0.85 | Cold hands, restless sleep |
| Ravenous | 0.65–0.75 | Can't stop thinking about food |
| Hollow | <0.65 | Lifts going backwards |

Rate stays hidden. **Direction does not** — direction isn't solvable information, it's basic fairness.

**2. Band changes are announced events.** At Recomp: *"Four weeks in deficit. Dialed In → Flat."* Unmissable, and it names the cause. Attribution converts *"the game nerfed me"* into *"I did this."*

**3. The Ledger gives exact numbers, one round in arrears.** Full audit at every Recomp: what Efficiency was, what it moved to, which weeks moved it, by how much.

### The Static — Efficiency as tape wear

The ratchet gets a face. Efficiency drives **a single shader intensity float.** Distortion creeps inward from the screen edges as Efficiency falls, and retreats as it recovers.

| Band | The picture |
|---|---|
| 1.0+ | Clean. Faint scanlines, mild curvature. Reads as *normal*, not as reward — so decay registers as loss. |
| 0.85–1.0 | Chroma bleed. Color fringing at high-contrast edges, occasional single-frame jitter. Noticeable before it's nameable. |
| 0.70–0.85 | Tracking bars rolling upward. Edge vignette creeping in. Audio crossfades toward the glitch mix. |
| < 0.70 | Heavy tracking, dropout, vertical roll. The picture fighting to hold. |

> **Hard rule: distortion attacks the frame, never the information.** Numbers stay crisp. The silhouette stays legible. The energy bar stays exact. The effect is masked to screen edges, background and borders — never the play area.

**Recovery is the payoff beat.** A diet break visibly cleans the picture: tracking retreats, color re-registers, audio refocuses. The reward for the game's least intuitive decision, delivered with zero numbers. **The ratchet must be legible in both directions.**

**Fatigue mitigations:**

- **Pulse, don't run flat.** Surge the effect at Recomp, then settle to a lower steady state. Reads as an event rather than a permanently dirty screen.
- **Keep the floor genuinely subtle.** Mild chroma bleed on Memphis pink-and-cyan risks reading as a rendering bug rather than intent.
- **Accessibility toggle, 0–100%.** One slider on a value already exposed. Not optional.

### The governing principle

> **Hide nothing. Precompute nothing.**

The game's only secret is ever a *number*, never a *rule*. Every mechanism is published on the card. What the player doesn't get handed is the current reading and the arithmetic. Five visible rules interacting is a computation, not a lookup.

**Rules leak; state doesn't.** The wiki will publish the Randle formula in a week. It can never tell you where your Efficiency sits *in this run*.

**Name the symptom, never the remedy.** The figure's outline goes angular — not "eat more protein." A card dims — not "needs carbs."

**Never surprise-kill.** Failure must be visible at least a full round out. Losing to information you couldn't have had is the design sin. Losing to information you had and misread is the game.

---

## 12. The Demand & the Single Fail State

**The Demand** is the output a round requires. It represents the world's indifference: it doesn't know you're tired, doesn't care what you did last round, and was going to be what it is whether you showed up or not.

Because it's indifferent, it is **completely honest**. Published in advance. Fully visible. Gentle slope.

```
Demand(n) = 100 × 1.25^(n-1)
```

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| **Demand** | 100 | 125 | 156 | 195 | 244 | 305 | 381 | 477 |

**The single fail state: failing to meet the Demand.** Nothing else ends a run.

### Demand modifiers

A Demand may carry a modifier — the Boss Blind equivalent. **Modifiers attack your engine, not your body.** One that caps Output per Set kills an Intensity build. One that taxes energy per Set kills a Volume build. One locks Reserve so nothing moves it. One hides Efficiency for the round.

Modifiers must target things the player *chose*, never things that take three rounds to change.

### The Ratings Bonus

Round Output above Demand converts to Dollars on an **increasing-returns curve.**

- **Dead zone up to ~2× Demand, paying nothing.**
- Above the threshold, payout accelerates superlinearly.

**The dead zone is load-bearing.** It prevents incidental overkill from paying anything, which is what keeps this from becoming the trickle income the design forbids elsewhere. Below threshold: hit Demand and bank Efficiency. Above it: build the round around blowing the doors off. **No profitable middle.** Overkill becomes a rare spike strategy, not passive income.

**Why runaway is contained.** Efficiency loss from overreach is already superlinear. Accelerating reward races accelerating cost — the balance question is which curve is steeper past the threshold, and that resolves in the same spreadsheet as the Landfill build (§14), not in this document.

**Guardrail:** cap payout as a multiple of the round's Demand, so it scales late without ever out-earning the Job slot. If the Ratings Bonus becomes the dominant income source, the Job slot is dead content.

**Accessibility floor:** the threshold must be clearable by a round-3 player willing to torch Efficiency for it. If only a top-decile engine can reach the payline, the mechanic only exists for players who have already won.

**Fiction:** overkill rounds are ratings spikes — the episode where something insane happened. Working names: *Went Viral*, *Prime Time*. Same story the Physique Card tells.

---

## 13. The Scoring Pipeline

Additive first. Multiplicative second. Exponential last. Flat bonuses matter in round 1 and are rounding error by round 8; multipliers do the opposite.

```
Training Score = Σ cards Σ sets ( Output × set-diminish multiplier )
                 + flat adders

Round Output   = Training Score
                 × Engine Multiplier
                 × Efficiency
                 × Π (rule-changer multipliers)
                 × Π (rule-changer ×Mults)
```

Round Output ≥ Demand(n) → advance. Below → run ends.

### The trajectory is escalation, not attrition

**State this plainly, because it is easy to misread.** The Demand is geometric: a player who merely clears every round has escalated absolute output **~5×** across a run. Efficiency decline is **drag on that trajectory, not the trajectory itself.** The feel is a climb into absurdity while something eats at you — not a slow decay into nothing.

### The absurdity ceiling

**Target: a top-decile round-8 build produces 10–30× Demand.** Against Demand 477, that is five-digit Round Output, legally.

The Ratings Bonus is what makes the overkill *mean* something, and its dead zone at 2× is what stops the ceiling becoming the floor. The VHS unreality is the license: a cassette instructor has no ligaments.

### Worked baseline — Round 3

Demand 156. Engine 40 (×1.10). Efficiency 0.94. One starter rule-changer (+8 flat).

Five training cards, base outputs 24 / 19 / 22 / 26 / 18. Player clicks three extra Sets at 90%: **Training Score 174.** Flat +8 → **182.**

```
182 × 1.10 × 0.94 = 188
```

**188 vs 156.** Cleared by 21%. Competent, unremarkable play wins round 3 comfortably.

**But project that same plain line forward:** by round 5, Efficiency has slipped to 0.87 and Training Score has grown only modestly. Round 5 produces ~230 against a Demand of 244. **Plain play dies at round 5.**

That's deliberate. It's Balatro's Ante 4 lesson: you cannot win on base output. You must find the engine. That's what converts the game from a puzzle into a build search.

---

## 14. Upgrade Slots & the Game-Breaking Layer

Upgrade slots are the primary game-breakers.

### Structure

**Seven slots.** Four singletons and a repeated row:

| Slot | Count | Fiction |
|---|---|---|
| **Diet** | 1 | The way you eat |
| **Training Style** | 1 | The way you train |
| **Partner** | 1 | Who's in your life |
| **Job** | 1 | What you do for money |
| **Gym** | **3** | Equipment you own |

Gym is the repeated row — the equipment you've accumulated. It is **generic equipment, not draft-width**; draft-width is now one Gym effect among many. The 3-wide row is where builds actually assemble, and it makes every single shop visit a real decision rather than an occasional one.

**Sleep is cut as a slot.** Its cards live in Gym. A mattress is equipment.

### No slot owns a variable

**Any card may read or write anything.** Diet may touch score. Gym may touch income. Job may touch Reserve.

Discipline comes from **thematic gravity, not law:** roughly 80% of a slot's cards read as that slot's fiction. Off-theme cards are legal, rare, and memorable — they live at the top of the rarity curve precisely because breaking a category the player has internalized is the most exciting thing a card can do.

**Every card logs its written variable in the balance sheet.** This is for filtering when something breaks, not for enforcement. When Reserve comes out 3× too hot in testing, you sort by written-variable and fix it in one pass.

### The Training Partner exception

**You may only hold one Partner — except a Training Partner, which may be played in addition to any other Partner, creating a second Partner slot.**

This is one of the strongest structural upgrades in the game precisely because it breaks a rule the player has already internalized. Training Partners bias toward training effects (*"+1 Set to all training cards"*); conventional Partners bias toward economy and deck manipulation.

### Rarity

| Tier | Role |
|---|---|
| **Common** | On-theme, single-effect, readable at a glance |
| **Uncommon** | On-theme with a condition, or a modest multiplier |
| **Rare** | Rule-breakers, off-theme writes, and anything that flattens the Set-diminish curve |
| **Collector's Edition** | Not a power tier — a meta promotion (§20). Any rarity can be promoted. |

Packs draw against this curve. Premium packs guarantee a slot type.

### Card modifiers

Consumable modifiers alter individual cards, using real training vocabulary that already means "modify how sets work": **Drop Set**, **Rest-Pause**, **Cluster Set**, **Myo-Reps**, **Superset**. Plus edition-style modifiers on food cards. Six or so modifiers multiply effective content roughly sixfold for near-zero art cost — the cheapest content multiplier in the genre.

### The worked broken build — "The Landfill"

Numbers disposable; this exists so the ceiling is provable in a spreadsheet rather than asserted in a document.

| Slot | Card | Effect |
|---|---|---|
| **Diet** | Ketosis | Fat Energy pays for high-intensity cards |
| **Training Style** | Strongman | Reserve adds to Output on Strength cards |
| **Gym 1** | The Buffer | Above Set Point, Efficiency loss from deficits halved |
| **Gym 2** | Sauna Suit | Suppressed energy routes to Reserve at double rate at Recomp |
| **Gym 3** | Chalk Bucket | Sets no longer diminish on Strength cards |
| **Job** | Strongman Comp | Money = Engine × 2 per round; protein threshold +50% |
| **Partner** | Cook | A copy of each drafted food card stays in the deck |

**The loop:** Cook duplicates fat cards, keeping the fridge mono-fat. Fat dominates, so any stray carb pick is the *lesser* fuel and gets suppressed. Sauna Suit converts that suppression into Reserve at double rate. Strongman converts Reserve into Output on Strength cards. Ketosis means mono-fat doesn't lock you out of the Strength deck. Chalk Bucket removes the diminishing return, so Set count scales linearly. The Buffer keeps Efficiency from collapsing while all of this runs at a deficit.

By round 8, one squat card at 3 Sets should exceed the entire Demand. That's the §18 screenshot target, and it's seven cards across seven slots.

---

## 15. Reserve Employers

Reserve is dormant until one of these gives it a job. A representative spread:

| Card | Slot | Effect |
|---|---|---|
| **Strongman** | Style | Reserve adds to Output on Strength cards |
| **Gymnast** | Style | Every Set costs less energy the lower your Reserve |
| **Open Water** | Style | Reserve insulates — steady Sets cost less energy the higher it is |
| **Sumo** | Style | Output scales with total mass; Sets hard-capped at 3 |
| **Sprinter** | Style | Output multiplier scales inversely with Reserve |
| **Bodybuilder** | Style | Final ×Mult based on (Engine − Reserve) |
| **Off-Season** | Diet | Above Set Point, protein threshold halved |
| **Partitioning** | Diet | Below Set Point, unspent energy at Recomp feeds Engine instead of Reserve |
| **The Buffer** | Gym | Above Set Point, Efficiency loss from deficits halved |
| **Sauna Suit** | Gym | Suppressed energy routes to Reserve at double rate |
| **Featherweight** | Job | Money scales with how far below Set Point you are at Recomp |
| **Strongman Comp** | Job | Money = Engine × 2 per round; protein threshold +50% |
| **Photoshoot** | Consumable | Cash out the Engine−Reserve gap for a large payout; Reserve rebounds hard next round |
| **Sweat It Out** | Starting deck | Burn Reserve into Fat Energy at a bad rate. The floor employer. |

**Gymnast and Strongman are the poles.** Two real athletes, opposite bodies, both obviously elite, neither one healthier than the other. That framing does the wellbeing work without a word of copy.

**Open Water is the one to protect.** Channel swimmers carry fat deliberately. It gives high Reserve to the Endurance archetype and means "fat" and "cardio" aren't opposites — which quietly does more than any disclaimer.

---

## 16. Economy & Shop

Base income from the starter Job, improvable through the Job slot. Some Jobs scale pay with body composition. Some pay almost nothing but give an enormous benefit when playing Work Overtime. The Ratings Bonus (§12) is the other earner, and is capped so it can never displace the Job slot.

**The shop has two doors:**

- **Groceries** — buy base-edition food cards at base price. Every card bought replaces one of the player's choosing. Multi-select. Deterministic: pay for exactly what you want. Discounted during a maintenance round.
- **Packs** — blind. Base packs contain 3–5 random cards against the rarity curve; the player keeps the useful ones and discards the rest. Premium packs guarantee a slot type.

Two doors is the complete fork: certainty versus upside. A third tab would add no decision.

**Deck thinning matters.** Removing a weak food card without replacing it raises the average quality of every future draw.

---

## 17. Interface & Guardrails

Turn-unlimited means analysis paralysis is a real risk and a timer is not an available answer. Two guardrails, both of which compute openly and neither of which advises.

### Hover-Preview

The primary guardrail. Immediate effects are already legible on the HUD; the preview is not for restating them.

**Trigger and placement.** Hover on desktop, press-and-hold on touch. A small panel anchored beside or below the hovered element. **Never modal.** Never occludes the silhouette or the energy bar — half its value is letting the player compare projection against live state.

**On food cards (draft phase):**
- Macros, and resulting running round totals if taken
- **Randle consequence** — whether this pick releases suppressed energy, creates new suppression, or neither
- Protein progress against threshold
- Meals unlocked or locked

**On training cards (play phase):**
- Cost in the specific energy color, and whether it's affordable
- Output **at current Efficiency**, never base
- Employer or slot triggers that would fire

**On the set stepper:**
- Marginal Output per additional Set, updating live per click
- **Efficiency delta at Recomp** — the cost of overreaching, shown while you decide to overreach
- Reserve movement at Recomp

> **Outcomes, never advice.** Numbers and state changes only. No recommendations, no ranking the three cards, no green checkmarks. The game hides nothing; it does not think for the player.

**No hidden arithmetic.** Any calculation the player would otherwise do by hand is shown. The preview is a calculator, not an advisor.

**Set Point drift stays hidden.** Reserve movement previews; Set Point does not. Slow, half-visible Set Point drift is what makes the body read as a body rather than a spreadsheet.

### Fill

A bulk-action verb on the set stepper: max Sets to the printed cap or the energy cap, whichever comes first. The player adjusts **down** from there.

Fill computes nothing hidden and recommends nothing — it saves clicks. **Hover-Preview is what makes trimming informed.**

---

## 18. Recomp — the Recap Screen

The round's ceremony, and the game's most screenshottable surface.

**Recomp is the only ceremony in the game. There are eight of them per run.** Weekly resolution is *instant feedback* — the bar moves, one clank, done — and is forbidden from growing pageantry. Protect this distinction into implementation.

**All ten cards played are laid out in sequence.** Hovering any card shows the **stat delta it created at the moment it was played** — energy by color, macros, Reserve, Engine, Training Score contribution.

This is the artifact. The target moment: **a single card whose contribution alone exceeded the entire round's Demand.** The player will screenshot that card, hovered, with its delta showing. Design toward that moment existing regularly by round 6.

**Resolution sequence:**

1. Weekly Training Scores tally, week by week
2. Sets resolve as discrete audio-visual beats — plates loading, a rep tick. Three Sets, three clanks. Eighty Sets, a continuous mechanical roar. **Past a threshold the barbell visibly bends.** That's the flame.
3. Rule-changers reveal in sequence: flat adders, then multipliers, then ×Mults
4. Unspent energy — usable and suppressed — slides down into the body
5. The silhouette snaps to its new frame
6. Efficiency band change announced with its cause named; The Static surges, then settles
7. Money tallies dollar by dollar; Ratings Bonus, if earned, lands last and loud
8. Demand met or missed, with the margin stated either way

**Resolution must accelerate.** 120 Sets cannot take 120 seconds. Sets speed up, blur, go continuous. Get this wrong and the best moment in the game becomes the most tedious one.

**The Ledger** is available from Recomp: the full numeric audit, one round in arrears. Hidden in the moment, transparent in retrospect. A determined player can reverse-engineer the entire model across twenty runs — and should be able to. That's the solvability horizon being long, not infinite.

---

## 19. Instruments — Legibility as an Economy

In life you can buy clarity. The information exists; the instrument costs money. So instruments compete for the same Dollars and slots as everything else.

| Instrument | Reveals |
|---|---|
| **Bathroom Scale** | Mass trend arrow |
| **Food Scale** | Exact macro values on drafted cards instead of ranges |
| **Training Log** | The derivative — last three rounds' Efficiency deltas |
| **Tape & Calipers** | Approximate Reserve/Engine split |
| **DEXA** *(one-shot)* | Exact Reserve and Engine, this round only |
| **Metabolic Cart** | Exact Efficiency, permanently |
| **Coach** | Both Demand options and their modifiers, two rounds early |

**"How much do I want to know?"** becomes a build decision. A player can run blind and spend everything on capability, or buy the full instrument panel and run a weaker body with perfect information. Both must be viable — if instruments are mandatory, legibility stopped being an economy and became a tax.

### Uncertainty is epistemic, not stochastic

When a food card shows a range before you own a Food Scale, **that card's value is already decided and fixed** — you simply can't read it precisely. The uncertainty is in the player's knowledge, not in the dice.

Never let a number change *at* resolution — only let it become legible there.

---

## 20. Meta-Progression

### The Collection

Stumbling into a **Collector's Edition** card makes it permanently available for future runs. The Collection shelf shows every slot, filled and empty.

**Collector Loadout** is chosen once per run: **1 upgrade-slot card + 1 food card + 1 training card.** A hard cap, permanently.

**The loadout is committed before the gauntlet is visible.** This ordering is load-bearing, not incidental — it is what prevents one dominant loadout, because you are betting on Demands you haven't seen. Combined with the Generations rule that at least one tier must kill each dominant engine, a loadout that wins across *every* gauntlet and *every* Generation is a card-tuning bug, not a structural one.

Winning a run grants one conversion: promote a card from that run to Collector's Edition.

**This is information-retention meta-progression, not power-accrual.** What carries between runs is knowing how to read a body — recognizing "Cold" in week two and knowing you have one hard round left in you. Nothing carries but the knowledge.

### The Physique Card

At the end of every run, win, lose, or Pull the Tape, the game generates a **Physique Card**: silhouette, stat block, build name, the three rule-changers that defined the run, final score. One shareable image, styled as a VHS box.

Because bodies are build-dependent and Reserve carries no penalty, extremes are legal and varied — the enormous strongman who can't run, the featherweight gymnast with no bench press, the run that went sideways in week four.

---

## 21. Generations & the Win Fiction

### Getting taped over

**The Demand is the ratings floor.** Miss it and your tape gets recorded over — the run's footage visibly erased at the fail screen, tracking chewing through the last thing you did.

**Clear the run and your tape is dubbed to the next Generation.** Victory produces a further-degraded copy of you. That is the difficulty ladder, and it is now a consequence of winning rather than a menu option.

### The ladder

Roughly 8–10 tiers that **change rules, not numbers.** Numbers-only ladders get solved; rule-changing ones don't. Each tier is glitchier than the last — The Static's floor rises with the Generation, so the picture is dirtier before you've done anything wrong.

Examples: *Efficiency is hidden.* *Efficiency is capped at 1.0.* *The protein threshold scales faster with Engine.* *Suppressed energy is destroyed rather than stored.* *Demands are revealed only one round ahead.* *No Cheat Meal.*

**At least one Generation must specifically kill each dominant engine.** If one build beats every configuration, the ladder isn't doing its job.

Meta-progression attaches here: the shelf remembers the highest Generation cleared on each Tape, worn onto the spine.

---

## 22. Production Plan

### Step one — the bootleg

**Before anything else on this list.** Index cards, one week.

- ~30 food cards, three colors, +1/+2/+3 spread
- ~20 training cards
- Paper protein tracker
- Two-color energy in poker chips

**Test only this:** *is picking one of three food cards, knowing training comes next, fun for five weeks?* No Efficiency, no Reserve, no Randle curve — a flat suppression rule if the split is lopsided.

If the naked draft isn't fun, nothing upstream of it matters.

**Success bar:** a playtester asks for a second run, unprompted.

### Step two — the four corners

The Body-as-HUD validation gate (§10). One day. Do not draw the other 21 frames until it passes.

### Run length target

**45–75 minutes per full run.** Budget: 80 picks — 40 weeks × 2 — at 20–30 seconds each, plus set allocation, plus 8 Recomps at ≤60 seconds and accelerating. At the pessimistic 30-second pick this lands at roughly 65 minutes, inside the target with no trimming. This is a tuning constraint, not an aspiration — every ceremony and animation decision answers to it.

### The first sixty seconds

Written as a shot list before the vertical slice:

| ~Second | Beat |
|---|---|
| 0 | Tape goes in. Tracking settles. |
| 5 | Instructor one-liner. |
| 10 | "WEEK 1" title card. |
| 15 | Three food cards up. |
| 25 | **First decision made.** |
| 30 | Training draw. |
| 40 | First clank. |
| 55 | Score dial ticks against a Demand of 100. |

> **Hard rule: first decision inside 30 seconds.**

### Content ladder

| Stage | Contents |
|---|---|
| **Vertical Slice** | 1 Tape, rounds 1–3, 15 food / 15 training / 12 rule-changers. No Generations, no Collection. Proves loop and tone. |
| **Early Access** | 25 food / 30 training / 45 rule-changers. 12 Demands + modifiers, 4 card modifiers, 3 Tapes, 5 instruments. Full 8-round run. |
| **1.0** | 40 food / 45 training / 80–100 rule-changers, full cast, Generations ladder, all instruments. |

Rule-changer distribution at 1.0: Gym gets the deepest pool (~35, since it fills three slots); Diet, Style, Partner and Job roughly 15 each.

### Deferred to after the slice

**The cast.** Each instructor is a build archetype with a stated want and a starting loadout that expresses it — the Strongman wants the record, the Aerobics Queen wants to stay on air, the Climber wants to disappear upward. One line of want, one loadout, one voice pass each.

Write the cast one-pager *after* the vertical slice proves the loop. Character is expensive to redo.

---

## 23. Design Glossary

**Pressure Ratchet vs. Clock** — a clock forces speed; a ratchet forces escalating sufficiency at your own pace.

**Sequential Commitment vs. Batch Selection** — a draft forces each choice with less information than the last and closes the door behind you. Batch-select is one decision wearing six hats.

**Draft-with-Depletion** — the pool shrinks with every pick and never refills mid-round.

**Deck Thinning** — removing a weak card without replacing it raises average future draw quality.

**Input Randomness, Output Determinism** *(Richard Garfield)* — randomness at the draw, fixed math at resolution, so skill stays legible.

**Information-Retention vs. Power-Accrual Meta-Progression** — Spelunky versus Hades. MacroHack sits deliberately at the retention end.

**Degenerate-Strategy Test** — does one boilerplate repeatable line clear every round indefinitely? The game must fail this test on purpose. Metabolic adaptation is what makes it fail.

**Epistemic vs. Stochastic Uncertainty** — the number is already decided; you just can't read it yet.

**Thematic Gravity** — discipline by convention rather than by rule. Most of a category's cards read as that category; the exceptions are rare, legal, and memorable.

**Teach Time** *(tabletop)* — how long before a new player makes a real decision. Must fit inside the refund window with room to spare.

---

## 24. Open Questions

1. **Set-cap distribution across modalities.** Where the caps land determines whether Endurance is genuinely top-tier with the right support, or whether the lifting deck quietly dominates. If it's the latter, we built the resistance-training game we were trying to avoid.
2. **Training deck total pool size.** Draw-per-pick is 3; total pool is unresolved.
3. **Does the diet break survive tuning?** Model it in a spreadsheet before anything else: a player taking one maintenance round at round 4 must finish ahead of the player who didn't. Deload cards are on the scale now, which helps — but if it still doesn't clear, the signature decision is fake and the ratchet is just a decay tax.
4. **Ratings Bonus vs. Efficiency cost.** Both curves accelerate past the threshold. Which is steeper? Same spreadsheet as the Landfill build.
5. **Fuel-color split across the training deck.** With cost now printed as a color, the ratio of Carb-cost to Fat-cost to Either-cost cards decides whether mono-fuel diets are viable or trap builds.
6. **Where absurdity actually lives.** Tone is decided; its expression isn't. The mechanics stay reverent — so absurdity has to live in the cast, the tape conceit, and the scale of the numbers. Needs a pass of its own, alongside the cast one-pager.
