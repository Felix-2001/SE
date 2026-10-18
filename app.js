// Lasers & Feelings companion app
"use strict";

const $ = (id) => document.getElementById(id);

// Choices from the Lasers & Feelings rules.
const STYLES = ["Alien", "Android", "Dangerous", "Heroic", "Hot-Shot", "Intrepid", "Savvy"];
const ROLES = ["Doctor", "Envoy", "Engineer", "Explorer", "Pilot", "Scientist", "Soldier"];

function fillSelect(select, options) {
  for (const text of options) {
    select.add(new Option(text, text));
  }
}

fillSelect($("style"), STYLES);
fillSelect($("role"), ROLES);

// Returns a random whole number from 1 to 6.
function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function getNumber() {
  return Number($("number").value);
}

function getMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

// Lasers (logic, tech): roll UNDER your Number.
// Feelings (intuition, passion): roll OVER your Number.
// Rolling your Number exactly also counts as a success.
function isSuccess(value, number, mode) {
  if (value === number) return true;
  return mode === "lasers" ? value < number : value > number;
}

// Short reminder of the character, e.g. "Captain Nova · Heroic Pilot · Number 4".
function updateSummary() {
  const name = $("name").value.trim() || "Unnamed character";
  const kind = [$("style").value, $("role").value].filter(Boolean).join(" ");
  $("summary").textContent = [name, kind, `Number ${getNumber()}`].filter(Boolean).join(" · ");
}

function updateHint() {
  updateSummary();
  const number = getNumber();
  $("mode-hint").textContent = getMode() === "lasers"
    ? `Lasers: roll under ${number} to succeed.`
    : `Feelings: roll over ${number} to succeed.`;
}

// 1 die, +1 if prepared, +1 if expert.
function getDiceCount() {
  return 1 + ($("prepared").checked ? 1 : 0) + ($("expert").checked ? 1 : 0);
}

function updateRollButton() {
  const n = getDiceCount();
  $("roll-btn").textContent = `Roll ${n} ${n === 1 ? "die" : "dice"}`;
}

// What the number of successes means, from the rules.
const OUTCOMES = [
  "Failure. Things go wrong somehow.",
  "You barely manage it, with a complication.",
  "Success! You do it well.",
  "Critical success! You get an extra effect.",
];

function roll() {
  const number = getNumber();
  const mode = getMode();
  const values = Array.from({ length: getDiceCount() }, rollD6);
  const hits = values.filter((v) => isSuccess(v, number, mode)).length;

  $("dice").innerHTML = values
    .map((v) => `<span class="die ${isSuccess(v, number, mode) ? "hit" : "miss"}">${v}</span>`)
    .join("");

  const who = $("name").value.trim() || "You";
  $("result").textContent =
    `${who}: ${hits} ${hits === 1 ? "success" : "successes"}. ${OUTCOMES[hits]}`;
  $("result").className = "result " + (hits >= 2 ? "ok" : hits === 1 ? "meh" : "bad");
}

// --- Saving: the character is kept in the browser's localStorage ---
const STORAGE_KEY = "lf-character";
const FIELDS = ["name", "style", "role", "number"];

function saveCharacter() {
  const data = {};
  for (const f of FIELDS) data[f] = $(f).value;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    $("save-status").textContent = "Saved in this browser.";
  } catch (e) {
    $("save-status").textContent = "Could not save (browser storage is blocked).";
  }
}

function loadCharacter() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) return;
    for (const f of FIELDS) {
      if (data[f] !== undefined) $(f).value = data[f];
    }
    $("save-status").textContent = "Welcome back! Your saved character was loaded.";
  } catch (e) {
    // Nothing saved, or storage not available: start with an empty character.
  }
}

$("roll-btn").addEventListener("click", roll);
$("prepared").addEventListener("change", updateRollButton);
$("expert").addEventListener("change", updateRollButton);
$("number").addEventListener("change", updateHint);
$("name").addEventListener("input", updateSummary);
$("style").addEventListener("change", updateSummary);
$("role").addEventListener("change", updateSummary);
for (const f of FIELDS) $(f).addEventListener(f === "name" ? "input" : "change", saveCharacter);
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener("change", updateHint));

loadCharacter();
updateHint();
