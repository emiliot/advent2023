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

const getNumbers = (card) => {
  const winningNumbers = {};
  const cardNumbers = [];

  const [_, cardEntriesStr] = card.split(":");
  let [winningNumbersStr, cardNumbersStr] = cardEntriesStr.split("|");
  winningNumbersStr = winningNumbersStr.trim();
  cardNumbersStr = cardNumbersStr.trim();

  winningNumbersStr
    .split(" ")
    .map((entry) => entry.trim())
    .filter((entry) => Boolean(entry))
    .forEach((winningNumber) => {
      winningNumbers[parseInt(winningNumber)] = true;
    });

  cardNumbersStr
    .split(" ")
    .map((entry) => entry.trim())
    .filter((entry) => Boolean(entry))
    .forEach((cardNumber) => {
      cardNumbers.push(parseInt(cardNumber));
    });

  console.log({ winningNumbers, cardNumbers });
  return { winningNumbers, cardNumbers };
};

const getResult = (input) => {
  const result = input.reduce((res, nextCard) => {
    const { winningNumbers, cardNumbers } = getNumbers(nextCard);

    let cardValue = 0;
    cardNumbers.forEach((cardNumber) => {
      if (winningNumbers[cardNumber]) {
        cardValue = cardValue ? cardValue * 2 : 1;
      }
    });

    return res + cardValue;
  }, 0);

  return result;
};

rl.once("close", () => {
  console.log(getResult(input));
});
