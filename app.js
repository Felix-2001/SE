// Lasers & Feelings companion app
"use strict";

const $ = (id) => document.getElementById(id);

// Returns a random whole number from 1 to 6.
function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function getNumber() {
  return Number($("number").value);
}

function roll() {
  const value = rollD6();
  const number = getNumber();
  const compare = value < number ? "under" : value > number ? "over" : "exactly";
  $("dice").innerHTML = `<span class="die">${value}</span>`;
  $("result").textContent = `You rolled ${value}, ${compare} your Number ${number}.`;
}

$("roll-btn").addEventListener("click", roll);
