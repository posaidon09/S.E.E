const fs = require("fs");
const chalk = require("chalk");
let player = JSON.parse(fs.readFileSync("stats.json", "utf8"));
const { spawn } = require("child_process");
const path = require("path");

function stripAnsi(text) {
  return text.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");
}

/**
 * Centers text on the terminal
 * @param {string} text - text to print
 * @example
 * console.log(centerText("sample text!"));
 */
function centerText(text) {
  const terminalWidth = process.stdout.columns || 80;
  const textLength = stripAnsi(text).length;
  const padding = Math.max(0, Math.floor((terminalWidth - textLength) / 2));

  return " ".repeat(padding) + text;
}

/**
 * Change a stat for the player
 * @param {string} stat - which stat to edit
 * @param {any} val - new value
 * @example
 * await set("health", 50);
 * await set("inventory", []);
 * await set("name", "posaidon");
 */
async function set(stat, val) {
  player[stat] = val;
  fs.writeFileSync("stats.json", JSON.stringify(player));
}

const chars = {
  "Researcher Astillo": chalk.yellow,
  "Researcher Verde": chalk.green,
  "Assistant Cynthia": chalk.hex("#7B07AD"),
  "Researcher Rebecca": chalk.magentaBright,
  Alice: chalk.red,
  "Jr. Assistant Andrew": chalk.cyanBright,
  "Professor Dragon": chalk.cyan,
  "Dr. Sanchez Jr.": chalk.greenBright,
  Shall: chalk.hex("#3DAD59"),
  Eve: chalk.hex("#808080"),
  Tiky: chalk.hex("#048012"),
  Sally: chalk.hex("#7B04D6"),
  Ghosty: chalk.hex("#CEA2FD"),
  "????": chalk.red,
  "R.E.K.L.A.T.S": chalk.red,
  "Test Subject 1": chalk.hex("#FFA500"),
  "Test Subject 2": chalk.hex("#F09C23"),
  "The Guide": chalk.blueBright,
  p: chalk.blue,
};

/** @type {readonly (keyof typeof chars)[]} */
const characterNames = Object.keys(chars);

/** @typedef {typeof characterNames[number]} Character */

/**
 * Handles character dialogue
 * @param {Character} character - The character speaking
 * @param {string} text - The dialogue text
 * @example
 * dialogue("posaidon", "hi :3");
 */
function dialogue(character, text) {
  if (character == player.name)
    console.log(`${chars["p"].bold(player.name)}: ${text}`);
  else console.log(`${chars[character].bold(character)}: ${text}`);
}

/**
 * Pauses code for a set time
 * @param {number} ms - Amount of time before executing the rest of the code
 * @example
 * // stops code execution for 2 seconds
 * await delay(2000);
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gives a special prompt to the user
 * @param {string} question - Prompt for user to answer
 * @param {function} func - function to run with the user input
 * @example
 * await prompt("what is your name?", (name) => {
 *  console.log(`hello, ${name}!`);
 * });
 */
async function prompt(question, func) {
  await new Promise((resolve) =>
    rl.question(chalk.bold(`${question}\n> `), (i) => {
      func(i);
      resolve();
    }),
  );
}

/**
 * Plays audio files
 * @param {string} sound - which audio file to play
 * @example
 * // plays ./src/audio/teleport.mp3
 * await audio("teleport");
 */
async function audio(sound) {
  const audioPath = path.join(__dirname, "audio", `${sound}.mp3`);
  return spawn("vlc", ["--intf", "dummy", audioPath]);
}

class Enemy {
  constructor(name, health, power, moves) {
    this.name = name;
    this.health = health;
    this.power = power;
    this.moves = moves;
  }

  action(enemy, move) {
    const damage = Math.ceil(Math.random() * 5) * this.power;
    if (enemy.name === player.name) {
      enemy.health -= damage;
      set("health", player.health - damage);
    }
    return damage;
  }
}
module.exports = {
  stripAnsi,
  centerText,
  set,
  dialogue,
  delay,
  prompt,
  player,
  audio,
  Enemy,
};
