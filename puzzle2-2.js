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

const getPower = (rounds) => {
  let minCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

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
      if (currentCubes[color] > minCubes[color]) {
        minCubes[color] = currentCubes[color];
      }
    });
  });

  return Object.values(minCubes).reduce((res, next) => res * next, 1);
};

const getResult = (input) => {
  const result = input.reduce((res, nextGame) => {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    const [game, rounds] = nextGame.split(":");
    const gameId = parseInt(game.match(/\d+/g)[0]);

    const power = getPower(rounds);
    return res + power;
  }, 0);

  return result;
};

rl.once("close", () => {
  console.log(getResult(input));
});
