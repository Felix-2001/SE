// GM tools: random adventure
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
}

$("adventure-btn").addEventListener("click", rollAdventure);
