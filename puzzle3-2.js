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

const getNumber = (input, row, col, n, m) => {
  let start = col;
  while (start - 1 >= 0 && input[row][start - 1].match(/\d/g)) {
    start--;
  }

  let numberStr = "";
  while (start < m && input[row][start].match(/\d/g)) {
    numberStr += input[row][start];
    start++;
  }

  return parseInt(numberStr);
};

const getAdjacentNumbers = (input, row, col, n, m) => {
  let result = [];

  const movRow = [-1, -1, -1, 0, 0, 1, 1, 1];
  const movCol = [-1, 0, 1, -1, 1, -1, 0, 1];

  //   for (let k = 0; k < movRow.length; k++) {
  //     const newRow = row + movRow[k];
  //     const newCol = col + movCol[k];

  //     if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m) {
  //       if (input[newRow][newCol].match(/\d/g)) {
  //         result.push(getNumber(input, newRow, newCol, n, m));
  //       }
  //     }
  //   }

  let newRow = row - 1;
  let newCol = col;
  if (newRow >= 0) {
    if (input[newRow][newCol].match(/\d/g)) {
      result.push(getNumber(input, newRow, newCol, n, m));
    } else {
      if (newCol - 1 >= 0 && input[newRow][newCol - 1].match(/\d/g)) {
        result.push(getNumber(input, newRow, newCol - 1, n, m));
      }

      if (newCol + 1 < m && input[newRow][newCol + 1].match(/\d/g)) {
        result.push(getNumber(input, newRow, newCol + 1, n, m));
      }
    }
  }

  if (newCol - 1 >= 0 && input[row][newCol - 1].match(/\d/g)) {
    result.push(getNumber(input, row, newCol - 1, n, m));
  }

  if (newCol + 1 < m && input[row][newCol + 1].match(/\d/g)) {
    result.push(getNumber(input, row, newCol + 1, n, m));
  }

  newRow = row + 1;

  if (newRow < n) {
    if (input[newRow][newCol].match(/\d/g)) {
      result.push(getNumber(input, newRow, newCol, n, m));
    } else {
      if (newCol - 1 >= 0 && input[newRow][newCol - 1].match(/\d/g)) {
        result.push(getNumber(input, newRow, newCol - 1, n, m));
      }

      if (newCol + 1 < m && input[newRow][newCol + 1].match(/\d/g)) {
        result.push(getNumber(input, newRow, newCol + 1, n, m));
      }
    }
  }

  return result;
};

const getResult = (input) => {
  let result = 0;
  const n = input.length;
  const m = input[0].length;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (input[row][col] === "*") {
        const adjacentNumbers = getAdjacentNumbers(input, row, col, n, m);
        console.log(adjacentNumbers);
        if (adjacentNumbers.length === 2) {
          result += adjacentNumbers.reduce((acc, cur) => acc * cur, 1);
        }
      }
    }
  }

  return result;
};

rl.once("close", () => {
  console.log(getResult(input));
});
