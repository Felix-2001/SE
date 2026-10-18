// Lasers & Feelings companion app
"use strict";

const $ = (id) => document.getElementById(id);

// Returns a random whole number from 1 to 6.
function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function roll() {
  const value = rollD6();
  $("dice").innerHTML = `<span class="die">${value}</span>`;
  $("result").textContent = `You rolled ${value}.`;
}

$("roll-btn").addEventListener("click", roll);
