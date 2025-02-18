const { prompt, delay, dialogue, set, player, audio } = require("../utils.js");
const { TheGuide } = require("../battles/guide.js");
const chalk = require("chalk");

module.exports = async function tutorial() {
  if (!player.name.length) await set("name", "Player");
  if (!player.health.length) await set("health", 100);
  if (!player.inventory.length) await set("inventory", []);

  let name = player.name;

  console.clear();
  await TheGuide();
  console.log(
    `Hello, researcher. Welcome to S.E.E! (Search, Expand, Exterminate)`,
  );
  await delay(3000);

  console.log(
    `As you may have heard, we are a foundation dedicated to studying and containing (and if it comes down to it, exterminating) various anomalies.`,
  );

  console.log(
    `You will be joining our team of researchers dedicated to examining these anomalies, meaning that you must follow a few rules:\n`,
  );
  await delay(3000);

  console.log(
    `${chalk.bold("1:")} Do not handle anomalous objects on your own. Always have a colleague with you when doing certain tasks, or you may face termination from us or the anomaly in question.`,
  );
  await delay(3000);

  console.log(
    `${chalk.bold("2:")} If you suspect something is wrong, make sure to alert a supervisor. You don't want monsters strolling around, do you?`,
  );
  await delay(3000);

  console.log(
    `${chalk.bold("3:")} If you don't know what to do, ask an administrator.\n`,
  );
  await delay(3000);

  console.log(
    "After you've read the rules, just input your name and we'll get you sorted out.\n",
  );

  await prompt("What is your name?", async (i) => {
    set("name", i);
    name = i;
    console.log(
      `We're glad to have you working with us, ${chalk.bold(chalk.blue(name))}! Dr. Astillo will guide you throughout the facility.\n`,
    );
  });
  await delay(2000);

  dialogue(
    "Researcher Astillo",
    "nice to meetcha! I'll show you the ropes of this place.",
  );
  await delay(2000);
  dialogue(
    "Assistant Cynthia",
    `make sure to not get them killed. And you be careful, this guy has a few screws loose.`,
  );
  await delay(2000);

  dialogue(
    "Researcher Astillo",
    "oh come on that was ONE time. can't a guy make mistakes?",
  );
  await delay(3000);

  dialogue(
    "Researcher Astillo",
    "anyway. Let's head to the facility so I can give you a tour.",
  );
  await delay(2000);

  dialogue("Researcher Astillo", "First. Lemme show you your office.");
  await delay(2500);

  dialogue(
    "Researcher Astillo",
    "alright. This place has pretty much anything you'd expect from an office. A chair, a desk, a computer, bunch of pens and crap.",
  );
  await delay(3000);

  dialogue(
    "Researcher Astillo",
    "it may look boring now but you'll be able to customize it later on to fit your style.",
  );
  await delay(2000);

  dialogue(
    "Researcher Astillo",
    "and if you wanna keep your brain intact then i suggest you stay away from Rebecca's office. I still get nightmares about it..",
  );
  await delay(3500);

  dialogue("Researcher Astillo", "anyway let's check out the rest of the-");
  await delay(500);

  dialogue("????", "FUCK YOU");
  await delay(2000);

  dialogue("Test Subject 1", "WAIT. WHERE ARE YOU GOING?");
  await delay(1500);

  dialogue("????", "I'M DONE.");
  await delay(2000);

  dialogue("????", "YOU GUYS CAN'T DIRECT FOR SHIT. I'M OUTTA HERE.");
  await delay(2000);

  dialogue("Researcher Astillo", "the fuck?");
  await delay(3000);

  dialogue("Test Subject 2", "COME BACK, WE PROMISE WE'LL FIX IT!");
  await delay(2500);

  dialogue("????", "SUCK MY DICK");
  await delay(2000);

  dialogue("Researcher Astillo", "oh god i recognize that voice...");
  await delay(2000);

  dialogue("R.E.K.L.A.T.S", "WHERE'S THE FUCKING EXIT");
  await delay(500);

  console.log(
    `${chalk.hex("#fc8403").bold("* ")}${chalk.red.bold("CRASH")}${chalk.hex("#fc8403").bold(" *")}`,
  );
  await audio("crash");
  await delay(4000);

  dialogue("Tiky", "fucking ow.");
  await delay(2000);

  dialogue("Tiky", "oh shit did I fall on someone?");
  await delay(2000);

  dialogue("Researcher Rebecca", "WHAT HAPPENED? I JUST HEARD SOMETHING CRASH");
  await delay(2000);

  dialogue("Researcher Rebecca", "how did rek get knocked out...");
  await delay(2000);

  dialogue("Researcher Astillo", "I'm still processing this as well...");
  await delay(3000);

  dialogue("Tiky", "alright the teleporter is ready again. I'm outta here");
  await delay(2500);

  console.log(chalk.hex("#75039E").bold("* VWOORP *"));
  await audio("teleport");
  await delay(2000);

  dialogue(
    "Researcher Astillo",
    "and here I was hoping that this was gonna be a good chance to teach you how to combat anomalies",
  );
  await delay(3000);

  dialogue("Researcher Astillo", "oh well. I'll just teach you tomorrow");
  await delay(2000);

  dialogue(
    "Researcher Astillo",
    "go home for now while we deal with this. This was probably too much to experience at once",
  );
  await delay(4000);

  console.clear();

  console.log(chalk.bold("Later that day at your house..."));
  await delay(3000);

  dialogue(name, "fucking hell... Today sure was something");
  await delay(3000);

  dialogue(name, "at least i got some time off to process it...");
  await delay(2500);

  dialogue(name, "hopefully some sleep will help");
  await delay(2000);

  console.log(chalk.bold("A few hours later..."));
  await delay(2000);

  dialogue(name, "oughh what time is it");
  await delay(2000);

  console.log(chalk.bold("* checks phone *"));
  await audio("bed");
  await delay(2500);

  dialogue(
    name,
    "3AM? that's odd. Well I feel thirsty so i'll just get some water and go back to sleep",
  );
  await delay(3500);

  console.log(chalk.bold("* walking to the kitchen *"));
  await audio("walking");
  await delay(2800);

  dialogue("The Guide", "greetings.");
  await delay(1000);

  dialogue(name, "WHO THE FUCK ARE YOU?");
  await delay(2000);

  dialogue("The Guide", "calm down. I'm not here to hurt you.");
  await delay(3000);

  dialogue(
    "The Guide",
    "you're in a dream. And if you want to wake up you need to listen to me very carefully",
  );
  await delay(4000);

  await prompt(
    `Do you fight him or listen to him?\n${chalk.bold("Fight    Listen")}`,
    async (option) => {
      if (option.toLowerCase() === "fight") {
        dialogue("The Guide", "I wouldn't do this if i were you.");
        await delay(2000);
        TheGuide();
        rl.write("");
        rl.prompt();
      } else if (option.toLowerCase() === "listen") {
        dialogue(name, "alright. I'll hear you out");
        await delay(2000);

        dialogue("The Guide", "thank you.");
        rl.prompt();
      }
    },
  );
  rl.prompt();
};
