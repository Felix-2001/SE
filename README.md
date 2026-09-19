# SE - Lasers & Feelings Companion App

Project for the Software Engineering class.

## Background

This repository contains the software project for the SEAMK Software Engineering course. The course case asks us to design and build software that supports playing the tabletop role-playing game [Lasers & Feelings](https://johnharper.itch.io/lasers-feelings), a simple sci-fi RPG that uses a single stat and a single die type (d6) to resolve all actions. The game is played by a small group: one Game Master (GM) and several players, each controlling a character aboard a starship.

Lasers & Feelings intentionally has very few rules, which makes it a good, low-risk case for practicing requirements engineering: the rules are short enough to read in one sitting, yet the game still has clear rules-based mechanics (the dice roll), structured data (characters, ships), and open-ended, creative activities (running an adventure) that require different kinds of software support.

## Introduction

The goal of this project is to build a digital companion application for Lasers & Feelings that helps both players and the GM run a session smoothly. The most important feature is supporting the game's core mechanic: rolling dice against a character's Lasers or Feelings stat and interpreting the result (number of successes, and whether it counts as a "laser feelings" special result).

Beyond the dice roll, the application may also support:

- storing and viewing character information (name, style, role, number, stat values, gear);
- storing and viewing starship information (traits and problem);
- creating and preparing an adventure (situation, NPCs, threats, mission);
- running a session (turn order, notes, tracking outcomes).

This README is a living document. It currently contains an initial (first draft) description of the project and a first set of requirements, written as user stories. Both will be revised and extended as the project progresses.

## Dictionary

| Term | Meaning |
|---|---|
| **GM (Game Master)** | The player who runs the game: describes the world, plays NPCs, and calls for dice rolls. |
| **Player** | A person who controls one character (a crew member of the starship). |
| **Character** | A player-controlled crew member, defined by a Style, a Role, a Number (the Lasers/Feelings stat), and gear. |
| **Number** | A character's core stat (2-5) that sets the balance between Lasers (logic, technology, precision) and Feelings (empathy, intuition, action). |
| **Lasers** | The rational, technical, precise side of the Number stat (rolling low succeeds on Lasers-type actions). |
| **Feelings** | The emotional, social, intuitive side of the Number stat (rolling high succeeds on Feelings-type actions). |
| **Dice roll** | The core mechanic: roll a pool of six-sided dice (d6) and compare each die to the character's Number to determine successes. |
| **Success** | A die result that counts toward completing the action, based on whether the roll is a Lasers or a Feelings roll. |
| **Laser Feelings** | A special result when a die shows exactly the character's Number: the player learns something extra true about the situation. |
| **Ship** | The starship the crew serves on, with its own traits (e.g. Fast, Powerful, Elegant, ...) and a Problem. |
| **Adventure** | The scenario/mission the GM prepares and runs for the group, including its situation, NPCs, and threats. |
| **Session** | One sitting of play, from start to end of an adventure or part of it. |
| **Requirement** | A documented need the software must satisfy, expressed here as a user story. |
| **User story** | A short description of a feature from the perspective of a user, in the form "As a [role], I want [goal], so that [reason]." |

## Requirements

The following are the first-draft software requirements for the project, written as user stories. These are initial requirements: they may be edited, split, or removed, and new ones will be added as the project progresses.

### Player stories

- As a **player**, I want to roll dice against my character's Number and immediately see how many successes I got, so that I don't have to count dice manually and can keep the game moving.
- As a **player**, I want to indicate whether I'm rolling for Lasers or for Feelings before I roll, so that the app can tell me correctly whether low or high rolls succeed.
- As a **player**, I want to see my character's information (Style, Role, Number, gear) during the session, so that I can quickly reference it without digging through paper notes.
- As a **player**, I want to be notified when I roll "Laser Feelings" (a die matching my Number exactly), so that I remember to ask the GM my bonus question.

### GM stories

- As a **GM**, I want to create and store the ship's traits and problem, so that the crew has a shared reference during the adventure.
- As a **GM**, I want to prepare an adventure (situation, NPCs, threats, mission) before the session, so that I have everything ready when we start playing.
- As a **GM**, I want to see an overview of all players' characters and their Numbers, so that I can quickly judge the difficulty of rolls I call for.
- As a **GM**, I want to keep simple notes during a running session, so that I can track what has happened and what still needs to be resolved.

## Repository

GitHub repository: https://github.com/Felix-2001/SE
