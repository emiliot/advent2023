const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const input = [];

rl.on("line", (line) => {
  input.push(line.split(""));
});

const isEnginePart = (input, row, col, lastCol, n, m) => {
  let checkRow = row - 1;
  if (checkRow >= 0) {
    for (
      let checkCol = Math.max(0, col - 1);
      checkCol < Math.min(lastCol + 1, m);
      checkCol++
    ) {
      if (input[checkRow][checkCol].match(/[^\d\.]/g)) {
        return true;
      }
    }
  }

  checkRow = row + 1;

  if (checkRow < n) {
    for (
      let checkCol = Math.max(0, col - 1);
      checkCol < Math.min(lastCol + 1, m);
      checkCol++
    ) {
      if (input[checkRow][checkCol].match(/[^\d\.]/g)) {
        return true;
      }
    }
  }

  if (col - 1 >= 0) {
    if (input[row][col - 1].match(/[^\d\.]/g)) {
      return true;
    }
  }

  if (lastCol < m) {
    if (input[row][lastCol].match(/[^\d\.]/g)) {
      return true;
    }
  }

  return false;
};

const getResult = (input) => {
  let result = 0;
  const n = input.length;
  const m = input[0].length;
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (digits.includes(input[row][col])) {
        let numberStr = input[row][col];
        let nextCol = col + 1;
        while (nextCol < m && digits.includes(input[row][nextCol])) {
          numberStr += input[row][nextCol];
          nextCol++;
        }
        const number = parseInt(numberStr);

        if (isEnginePart(input, row, col, nextCol, n, m)) {
          //   console.log(numberStr, number);
          result += number;
        }
        col = nextCol;
      }
    }
  }

  return result;
};

rl.once("close", () => {
  console.log(getResult(input));
});
