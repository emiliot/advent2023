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
  const seedsInput = seedsStr
    .split(":")[1]
    .trim()
    .split(" ")
    .map((seed) => parseInt(seed));

  let seeds = [];
  for (let i = 0; i < seedsInput.length; i += 2) {
    seeds.push({
      start: seedsInput[i],
      end: seedsInput[i] + seedsInput[i + 1],
    });
  }

  return seeds;
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

const getIntersection = (a, b) => {
  if (b.start < a.start) {
    return getIntersection(b, a);
  }

  if (b.start >= a.end) {
    return null;
  }

  const start = Math.max(a.start, b.start);
  const end = Math.min(a.end, b.end);

  return { start, end };
};

const getNewLocation = (source, dest, intersection) => {
  console.log("getNewLocation", { source, dest, intersection });
  const newStart = dest.start + (intersection.start - source.start);
  const newEnd = dest.start + (intersection.end - source.start);

  return { start: newStart, end: newEnd };
};

const getNextLocation = (seed, maps) => {
  let currentLocation = seed;
  maps.forEach((mapRanges) => {
    for (let i = 0; i < mapRanges.length; i++) {
      console.log({ currentLocation });
      const { source, dest } = mapRanges[i];
      const intersection = getIntersection(currentLocation, source);
      console.log({ intersection });
      if (intersection) {
        currentLocation = getNewLocation(source, dest, intersection);
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

  let closestLocation = {
    start: Number.MAX_SAFE_INTEGER,
    end: Number.MAX_SAFE_INTEGER,
  };
  seeds.forEach((seed) => {
    const nextLocation = getNextLocation(seed, maps);
    console.log({ nextLocation });
    if (nextLocation.start < closestLocation.start) {
      closestLocation = nextLocation;
    }
  });

  return closestLocation.start;
};

rl.once("close", () => {
  console.log(getResult(input));
});
