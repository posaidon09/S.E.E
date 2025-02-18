const { Enemy, prompt, set, player, delay } = require("./../utils.js");
const chalk = require("chalk");

async function TheGuide() {
  await new Promise(async (resolve) => {
    const guide = new Enemy("The Guide", 99999, 99, ["Block", "Slap"]);
    while (true) {
      if (guide.health < 0 || player.health < 0) {
        console.log("Fight over");
        set("health", 100);
        resolve();
        break;
      }

      await new Promise((promptResolve) => {
        prompt("What do you do?\nAttack, block", async (i) => {
          const action = i.toLowerCase();
          if (action === "attack") {
            const damage = chalk.bold.red("0");
            await delay(1000);
            console.log(`You hit The Guide and dealt ${damage} damage!`);
            await delay(1000);
            const hurt = guide.action(player);
            console.log(`The Guide punched you and dealt ${hurt} damage!`);
          } else if (action === "block") {
            console.log("blocked");
          }
          promptResolve();
        });
      });
    }
  });
}

module.exports = { TheGuide };
