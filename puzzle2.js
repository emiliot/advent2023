const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
});

const checkIsPossible = (rounds, totalCubes) => {
  let isPossible = true;

  rounds.split(";").forEach((round) => {
    const currentCubes = { red: 0, green: 0, blue: 0 };

    round
      .split(",")
      .map((cubeInput) => {
        const count = parseInt(cubeInput.match(/\d+/g)[0]);
        const color = cubeInput.match(/[a-zA-Z]+/g)[0];
        return { count, color };
      })
      .forEach((cube) => {
        currentCubes[cube.color] += cube.count;
      });

    Object.keys(currentCubes).forEach((color) => {
      if (currentCubes[color] > totalCubes[color]) {
        isPossible = false;
      }
    });
  });

  return isPossible;
};

const getResult = (input) => {
  const totalCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const result = input.reduce((res, nextGame) => {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    const [game, rounds] = nextGame.split(":");
    const gameId = parseInt(game.match(/\d+/g)[0]);

    const isPossible = checkIsPossible(rounds, totalCubes);
    return res + (isPossible ? gameId : 0);
  }, 0);

  return result;
};

rl.once("close", () => {
  console.log(getResult(input));
});
