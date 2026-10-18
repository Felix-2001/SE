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

function roll() {
  const value = rollD6();
  const number = getNumber();
  const ok = isSuccess(value, number, getMode());
  $("dice").innerHTML = `<span class="die ${ok ? "hit" : "miss"}">${value}</span>`;
  const who = $("name").value.trim() || "You";
  $("result").textContent = ok ? `${who} rolled ${value}: success!` : `${who} rolled ${value}: failure.`;
  $("result").className = "result " + (ok ? "ok" : "bad");
}

$("roll-btn").addEventListener("click", roll);
$("number").addEventListener("change", updateHint);
$("name").addEventListener("input", updateSummary);
$("style").addEventListener("change", updateSummary);
$("role").addEventListener("change", updateSummary);
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener("change", updateHint));
updateHint();
