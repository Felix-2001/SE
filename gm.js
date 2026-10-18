// GM tools: random adventure, crew overview, ship, adventure preparation, notes
"use strict";

// --- Switching between the Player and GM views ---
document.querySelectorAll(".tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    $("player-view").hidden = view !== "player";
    $("gm-view").hidden = view !== "gm";
    document.querySelectorAll(".tabs button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
  });
});

// --- Random adventure: one d6 roll for each table ---
// Each table has 6 entries, one for each side of the die.
const ADVENTURE_TABLES = [
  ["A band of space pirates", "A rogue AI", "An alien hive queen", "A corrupt Consortium admiral", "A giant space creature", "A mysterious cult"],
  ["steal", "destroy", "take control of", "awaken", "hide", "sell"],
  ["a colony on the edge of the galaxy", "an ancient alien artifact", "the Consortium flagship", "a secret research station", "a peaceful moon city", "the crew's own ship"],
  ["start a war", "wipe out a planet", "give them unstoppable power", "open a rift in space", "ruin the Consortium", "free a dangerous prisoner"],
];

function rollAdventure() {
  const rolls = ADVENTURE_TABLES.map(() => rollD6());
  const [threat, wants, target, consequence] = rolls.map((r, i) => ADVENTURE_TABLES[i][r - 1]);
  $("adventure-dice").innerHTML = rolls.map((r) => `<span class="die">${r}</span>`).join("");
  $("adventure").textContent = `${threat} wants to ${wants} ${target}, which will ${consequence}.`;
  $("use-adventure").hidden = false;
}

$("adventure-btn").addEventListener("click", rollAdventure);

// --- Ship: strengths and problem from the rules, saved in the browser ---
const SHIP_STRENGTHS = ["Fast", "Nimble", "Well-Armed", "Powerful Shields", "Superior Sensors", "Cloaking Device", "Fightercraft"];
const SHIP_PROBLEMS = ["Fuel Hog", "Only One Medical Pod", "Horrible Circuit Breakers", "Grim Reputation"];
const SHIP_KEY = "lf-ship";

for (const s of SHIP_STRENGTHS) {
  const label = document.createElement("label");
  label.innerHTML = `<input type="checkbox" value="${s}"> ${s}`;
  $("ship-strengths").append(label);
}
fillSelect($("ship-problem"), SHIP_PROBLEMS);

const strengthBoxes = () => [...document.querySelectorAll("#ship-strengths input")];

function getShip() {
  return {
    name: $("ship-name").value.trim(),
    strengths: strengthBoxes().filter((b) => b.checked).map((b) => b.value),
    problem: $("ship-problem").value,
  };
}

function updateShip() {
  const ship = getShip();
  // Only 2 strengths can be chosen: disable the rest when 2 are checked.
  for (const b of strengthBoxes()) b.disabled = !b.checked && ship.strengths.length >= 2;

  const parts = [ship.name || "Unnamed ship"];
  if (ship.strengths.length) parts.push(ship.strengths.join(", "));
  if (ship.problem) parts.push(`Problem: ${ship.problem}`);
  const text = parts.join(" · ");
  $("ship-line").textContent = text;
  $("ship-line-player").textContent = text;
}

function saveShip() {
  updateShip();
  try { localStorage.setItem(SHIP_KEY, JSON.stringify(getShip())); } catch (e) { /* storage blocked */ }
}

function loadShip() {
  try {
    const ship = JSON.parse(localStorage.getItem(SHIP_KEY));
    if (ship) {
      $("ship-name").value = ship.name || "";
      for (const b of strengthBoxes()) b.checked = (ship.strengths || []).includes(b.value);
      $("ship-problem").value = ship.problem || "";
    }
  } catch (e) { /* nothing saved yet */ }
  updateShip();
}

$("ship-name").addEventListener("input", saveShip);
$("ship-problem").addEventListener("change", saveShip);
$("ship-strengths").addEventListener("change", saveShip);
loadShip();

// --- Session notes, saved in the browser while typing ---
const NOTES_KEY = "lf-notes";
try { $("notes").value = localStorage.getItem(NOTES_KEY) || ""; } catch (e) { /* storage blocked */ }
$("notes").addEventListener("input", () => {
  try { localStorage.setItem(NOTES_KEY, $("notes").value); } catch (e) { /* storage blocked */ }
});

// --- Crew overview: the GM adds each character's name and Number ---
const CREW_KEY = "lf-crew";
let crew = [];
try { crew = JSON.parse(localStorage.getItem(CREW_KEY)) || []; } catch (e) { crew = []; }

function saveCrew() {
  try { localStorage.setItem(CREW_KEY, JSON.stringify(crew)); } catch (e) { /* storage blocked */ }
}

function renderCrew() {
  const list = $("crew-list");
  list.innerHTML = "";
  if (crew.length === 0) {
    list.innerHTML = '<tr><td colspan="5" class="empty">No characters added yet.</td></tr>';
    return;
  }
  crew.forEach((c, i) => {
    // With one die: Lasers succeeds on 1..Number, Feelings on Number..6.
    const cells = [c.name, c.number, `${c.number}/6`, `${7 - c.number}/6`];
    const row = list.insertRow();
    for (const text of cells) row.insertCell().textContent = text;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Remove";
    btn.addEventListener("click", () => { crew.splice(i, 1); saveCrew(); renderCrew(); });
    row.insertCell().append(btn);
  });
}

$("crew-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("crew-name").value.trim();
  if (!name) return;
  crew.push({ name, number: Number($("crew-number").value) });
  saveCrew();
  renderCrew();
  $("crew-name").value = "";
  $("crew-name").focus();
});

renderCrew();

// --- Adventure preparation: situation, NPCs and threats ---
const PREP_KEY = "lf-adventure";
const PREP_FIELDS = ["prep-situation", "prep-npcs", "prep-threats"];

function savePrep() {
  const data = {};
  for (const id of PREP_FIELDS) data[id] = $(id).value;
  try { localStorage.setItem(PREP_KEY, JSON.stringify(data)); } catch (e) { /* storage blocked */ }
}

try {
  const data = JSON.parse(localStorage.getItem(PREP_KEY)) || {};
  for (const id of PREP_FIELDS) $(id).value = data[id] || "";
} catch (e) { /* nothing saved yet */ }

for (const id of PREP_FIELDS) $(id).addEventListener("input", savePrep);

// Copy the rolled adventure into the situation field.
$("use-adventure").addEventListener("click", () => {
  $("prep-situation").value = $("adventure").textContent;
  savePrep();
  $("prep-situation").focus();
});
