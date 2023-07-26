const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

class GuessingGame {
  constructor() {
    this.secretNumber = 0;
    this.numAttempts = 0;
  }

  askGuess() {
    rl.question("Enter a guess: ", (res) => {
      if (!this._isValidNumber(res)) {
        console.log("Try again, with number.");
        rl.close();
        return;
      }
      const result = this.checkGuess(Number(res));
      this.numAttempts--;

      if (result) {
        console.log("You win!");
        rl.close();
      } else if (this.numAttempts === 0) {
        console.log("You lose!");
        rl.close();
      } else {
        this.askGuess();
      }
    });
  }

  askRange() {
    rl.question("Enter a maximum number: ", (max) => {
      rl.question("Enter a minimum number: ", (min) => {
        if (!this._isValidNumber(min, max)) {
          console.log("Try again, with number.");
          rl.close();
          return;
        }
        console.log(`I'm thinking of a number between ${min} and ${max}...`);
        // Start others functions
        this.secretNumber = this.randomInRange(Number(min), Number(max));
        this.askGuess();
      });
    });
  }

  askLimit() {
    rl.question("Enter maximum number of guesses: ", (num) => {
      if (!this._isValidNumber(num)) {
        console.log("Try again, with number as input.");
        rl.close();
        return;
      }
      this.numAttempts = Number(num);
      this.askRange();
    });
  }

  checkGuess(num) {
    if (num > this.secretNumber) {
      console.log("Too high");
      return false;
    } else if (num < this.secretNumber) {
      console.log("Too low");
      return false;
    } else {
      console.log("Correct.");
      return true;
    }
  }

  _isValidNumber(...numbers) {
    let i = 0;
    while (i < numbers.length) {
      if (isNaN(numbers[i])) return false;
      i++;
    }
    return true;
  }

  randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
}

module.exports = GuessingGame;
