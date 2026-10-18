# SE - Lasers & Feelings Companion App

Project for the Software Engineering class.

## Background

Course project for the SEAMK Software Engineering course. The case: build software supporting [Lasers & Feelings](https://johnharper.itch.io/lasers-feelings), a minimalist sci-fi tabletop RPG played by a GM and several players, using a single stat and a d6 dice mechanic.

## Introduction

The app's main feature is the dice roll: rolling against a character's Lasers/Feelings stat and showing the result. It may also support character info, ship info, adventure creation, and running a session.

This README is a first draft and will be extended as the project progresses.

## Dictionary

| Term | Meaning |
|---|---|
| **GM** | Runs the game, plays NPCs, calls for rolls. |
| **Player** | Controls one character. |
| **Character** | Defined by Style, Role, Number, and gear. |
| **Number** | Core stat (2-5) balancing Lasers vs. Feelings. |
| **Lasers/Feelings** | The two sides of the Number: logic/tech vs. emotion/intuition. |
| **Dice roll** | Roll d6s, compare to Number to count successes. |
| **Laser Feelings** | Special result when a die matches the Number exactly. |
| **Ship** | The crew's starship, with traits and a Problem. |
| **Adventure** | The scenario the GM prepares and runs. |
| **User story** | "As a [role], I want [goal], so that [reason]." |

## Requirements

Initial requirements as user stories. Will be edited and extended later.

**Player**
- As a player, I want to roll dice against my Number and see my successes, so I don't have to count manually.
- As a player, I want to be notified on a "Laser Feelings" result, so I remember to ask my bonus question.
- As a player, I want to see my character's info (Style, Role, Number, gear) during play, so I can reference it quickly.
- As a player, I want to indicate whether I'm rolling for Lasers or Feelings before rolling, so successes are counted correctly.

**GM**
- As a GM, I want to store ship traits and problem, so the crew has a shared reference.
- As a GM, I want to prepare an adventure (situation, NPCs, threats) beforehand, so I'm ready to run the session.
- As a GM, I want to see an overview of all characters and their Numbers, so I can judge the difficulty of rolls.
- As a GM, I want to keep simple notes during a session, so I can track what has happened so far.

## Product backlog

User stories in priority order (most important first). Stories from the customer (teacher) and my own stories from Assignment 4 are combined into one list.

1. As a GM, I want to see an overview of all characters and their Numbers, so I can judge the difficulty of rolls.
2. As a GM, I want to prepare an adventure (situation, NPCs, threats) beforehand, so I'm ready to run the session.

## Sprint 1 backlog

Goal: a minimum viable product, a browser app where a player can create a character and roll the dice against their Number. Estimated to fit into about 3 x 45 min.

1. (Done) As a GM, I want to be able to use the software in a modern web browser, because they are easy to use and easily available.
2. (Done) As a player, I want to be able to throw a dice, because the result of the throw determines if I succeed or not in whatever I am trying to do.
3. (Done) As a player, I want to be able to set my number, so I can compare it with the result of my dice throw.
4. (Done) As a player, I want to indicate whether I'm rolling for Lasers or Feelings before rolling, so successes are counted correctly.
5. (Done) As a player, I want to be able to give my character a name, because I want to be immersed into the game.
6. (Done) As a player, I want to be able to choose a style and role for my character, so I can remember them.
7. (Done) As a player, I want the software to save my information (number, name, style and role), so I can use them in multiple playing sessions.
8. (Done) As a player, I want to roll dice against my Number and see my successes, so I don't have to count manually.
9. (Done) As a player, I want to be notified on a "Laser Feelings" result, so I remember to ask my bonus question.

## Sprint 1 review

- All 7 planned user stories were completed. Two more stories were taken from the product backlog during the sprint and completed too (9 in total).
- The application was published with GitHub Pages.
- Feedback: the first look was too busy, so the visual style was simplified to plain and readable.

## Sprint 2 backlog

Goal: a publishable release that also supports the GM: random adventures, the ship, and session notes. The player gets their full character info (including gear) during play. The sprint lasts until Mon 19 Oct, 10am.

1. (Not started) As a GM, I want to be able to throw a dice, so I can create a random adventure.
2. (Not started) As a player, I want to see my character's info (Style, Role, Number, gear) during play, so I can reference it quickly.
3. (Not started) As a GM, I want to store ship traits and problem, so the crew has a shared reference.
4. (Not started) As a GM, I want to keep simple notes during a session, so I can track what has happened so far.

## Application

Published with GitHub Pages: https://felix-2001.github.io/SE/

Open the link in any modern browser (Chrome, Firefox, Edge, Safari). The character is saved in the browser's local storage, so it is still there on the next visit on the same device.

