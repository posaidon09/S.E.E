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
  constructor(name, health, defense, power, moves) {
    this.name = name;
    this.health = health;
    this.defense = defense;
    this.power = power;
    this.moves = moves;
  }
  action(move) {
    if (move == "Heal") {
      const heal = Math.floor(Math.random() * 10) + 20;
      this.health += heal;
      return heal;
    }
  }
}

class Battle {
  constructor(enemy) {
    this.enemy = enemy;
  }
  async start() {
    await new Promise(async (resolve) => {
      while (true) {
        if (enemy.health < 0 || player.health < 0) {
          console.log("Fight over");
          set("health", 100);
          resolve();
          break;
        }

        await new Promise((promptResolve) => {
          prompt("What do you do?\nAttack, block", async (i) => {
            const action = i.toLowerCase();
            if (action === "attack") {
              const damage = 20 + Math.ceil(Math.random() * 10) - enemy.defense;
              // critical hit
              if (Math.random() < 0.2) damage += 30;
              await delay(1000);
              console.log(`You hit ${enemy.name} and dealt ${damage} damage!`);
              await delay(1000);
              const hurt = guide.action(player);
              console.log(
                `${enemy.name} punched you and dealt ${hurt} damage!`,
              );
            } else if (action === "block") {
              console.log("blocked");
            }
            promptResolve();
          });
        });
      }
    });
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
