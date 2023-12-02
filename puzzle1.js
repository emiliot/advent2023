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

const getDigitValue = (digit, digits) => {
  const index = digits.indexOf(digit);
  return index < 10 ? index : index - 10;
};

const getLineResult = (line) => {
  const digits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const digitsMap = {};
  digits.forEach((digit) => {
    const a = line.search(digit);
    const b = line.lastIndexOf(digit);

    if (a !== -1) {
      digitsMap[digit] = {
        firstIndex: a,
        lastIndex: b,
        value: getDigitValue(digit, digits),
      };
    }
  });

  let a = null,
    b = null,
    digitA = null,
    digitB = null;
  Object.entries(digitsMap).forEach(([digit, data]) => {
    const { firstIndex, lastIndex, value } = data;
    if (a === null) {
      a = firstIndex;
      digitA = value;
      b = lastIndex;
      digitB = value;
    } else {
      if (firstIndex < a) {
        a = firstIndex;
        digitA = value;
      }

      if (lastIndex > b) {
        b = lastIndex;
        digitB = value;
      }
    }
  });

  return digitA * 10 + digitB;
};

const getResult = (input) => {
  return input.reduce((acc, line) => {
    const value = getLineResult(line);
    return acc + value;
  }, 0);
};

rl.once("close", () => {
  console.log(getResult(input));
});
