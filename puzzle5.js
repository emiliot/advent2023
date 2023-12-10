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

const parseSeeds = (seedsStr) => {
  return seedsStr
    .split(":")[1]
    .trim()
    .split(" ")
    .map((seed) => parseInt(seed));
};

const parseMaps = (maps) => {
  const mapsInput = maps.filter((lineInput) => lineInput.trim().length > 0);

  let mapsResult = [];
  mapsInput.forEach((mapInput) => {
    if (mapInput.endsWith("map:")) {
      mapsResult.push([]);
    } else {
      const [destStr, sourceStr, rangeStr] = mapInput.split(" ");
      const dest = parseInt(destStr);
      const source = parseInt(sourceStr);
      const range = parseInt(rangeStr);

      const currentMap = mapsResult.pop();
      currentMap.push({
        source: { start: source, end: source + range },
        dest: { start: dest, end: dest + range },
      });
      mapsResult.push(currentMap);
    }
  });

  return mapsResult;
};

const getNextLocation = (seed, maps) => {
  let currentLocation = seed;
  maps.forEach((mapRanges) => {
    for (let i = 0; i < mapRanges.length; i++) {
      const { source, dest } = mapRanges[i];
      if (currentLocation >= source.start && currentLocation < source.end) {
        currentLocation = dest.start + (currentLocation - source.start);
        break;
      }
    }
  });
  return currentLocation;
};

const getResult = (input) => {
  const [seedsStr, ...rest] = input;
  const seeds = parseSeeds(seedsStr);
  const maps = parseMaps(rest);

  let closestLocation = Number.MAX_SAFE_INTEGER;
  seeds.forEach((seed) => {
    const nextLocation = getNextLocation(seed, maps);
    if (nextLocation < closestLocation) {
      closestLocation = nextLocation;
    }
  });

  return closestLocation;
};

rl.once("close", () => {
  console.log(getResult(input));
});
