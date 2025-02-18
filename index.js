const readline = require("readline");
global.rl = readline.createInterface(process.stdin, process.stdout);
const chalk = require("chalk");
const tutorial = require("./src/locations/tutorial.js");
const { centerText, player, audio } = require("./src/utils.js");

console.clear();
console.log("");
console.log(
  centerText(" ░▒▓███████▓▒░      ░▒▓████████▓▒░      ░▒▓████████▓▒░        "),
);
console.log(
  centerText("░▒▓█▓▒░             ░▒▓█▓▒░             ░▒▓█▓▒░               "),
);
console.log(
  centerText("░▒▓█▓▒░             ░▒▓█▓▒░             ░▒▓█▓▒░               "),
);
console.log(
  centerText(" ░▒▓██████▓▒░       ░▒▓██████▓▒░        ░▒▓██████▓▒░          "),
);
console.log(
  centerText("       ░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░               "),
);
console.log(
  centerText("       ░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░      ░▒▓██▓▒░▒▓█▓▒░      ░▒▓██▓▒░ "),
);
console.log(
  centerText("░▒▓███████▓▒░░▒▓██▓▒░▒▓████████▓▒░▒▓██▓▒░▒▓████████▓▒░▒▓██▓▒░ "),
);
console.log(
  centerText("                                                              "),
);
console.log(
  centerText("                                                              "),
);
console.log(
  centerText(chalk.bold(`Search. Expand. ${chalk.red("Exterminate.")}`)),
);
console.log("");

console.log("Run 'start' to begin!");
rl.setPrompt(">> ");

rl.prompt();

(async () => {
  const menuMusic = await audio("menu");
  rl.on("line", async (input) => {
    const args = input.toLocaleLowerCase().split(" ");
    const cmd = args.shift();

    switch (cmd) {
      case "close":
      case "exit":
      case "quit":
        process.exit(1);
        break;

      case "start":
        if (menuMusic) {
          menuMusic.kill("SIGTERM");
        }
        if (player.location === "Start") {
          await tutorial();
        }
        break;

      case "help":
        console.log("Available commands:\nExit, Start");
        rl.prompt();
        break;
      case "stats":
        const name = `${chalk.bold("Name: ")} ${chalk.blue(player.name)}`;
        const sanityColors = {
          Calm: chalk.green("Calm"),
          Uneasy: chalk.yellow("Uneasy"),
          Distressed: chalk.red("Distressed"),
        };
        const sanity = `${chalk.bold("Sanity: ")}${sanityColors[player.sanity]}`;
        const health = `${chalk.bold("Health: ")}${player.health}/100`;
        const inventory = `${chalk.bold("Inventory: ")}${player.inventory.join(" - ")}`;
        const location = `${chalk.bold("Location: ")}${player.location}`;

        console.log([name, sanity, health, inventory, location].join("\n"));
        break;

      default:
        console.log("Unknown command. Try again.");
        rl.prompt();
        break;
    }

    rl.prompt();
  });
})();
