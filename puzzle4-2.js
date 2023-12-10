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

  return { winningNumbers, cardNumbers };
};

const getResult = (input) => {
  return input
    .map((card) => ({
      count: 1,
      ...getNumbers(card),
    }))
    .reduce((cardCount, card, index, inputArray) => {
      const { winningNumbers, cardNumbers, count } = card;

      let numbersMatched = 0;
      cardNumbers.forEach((cardNumber) => {
        if (winningNumbers[cardNumber]) {
          numbersMatched++;
        }
      });

      for (
        let k = index + 1;
        numbersMatched > 0 && k < inputArray.length;
        k++, numbersMatched--
      ) {
        inputArray[k].count += count;
      }

      return cardCount + count;
    }, 0);
};

rl.once("close", () => {
  console.log(getResult(input));
});
