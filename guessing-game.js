const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

let secretNumber = 0;
let numAttempts = 0;

function checkGuess(num) {
    if (num > secretNumber) {
        console.log("Too high");
        return false;
    } else if (num < secretNumber) {
        console.log("Too low");
        return false;
    } else {
        console.log("Correct.");
        return true;
    }
}

function isValidNumber(...numbers) {
    let i = 0;
    while (i < numbers.length) {
        if (isNaN(numbers[i])) return false;
        i++;
    }

    return true;
}

function askGuess() {
    rl.question("Enter a guess: ", (res) => {
        if (!isValidNumber(res)) {
            console.log("Try again, with number.");
            rl.close();
            return;
        }
        const result = checkGuess(Number(res));
        numAttempts--;

        if (result) {
            console.log("You win!");
            rl.close();
        } else if (numAttempts === 0) {
            console.log("You lose!");
            rl.close();
        } else {
            askGuess();
        }
    });
}

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function askRange() {
    rl.question("Enter a maximum number: ", (max) => {
        rl.question("Enter a minimum number: ", (min) => {
            if (!isValidNumber(min, max)) {
                console.log("Try again, with number.");
                rl.close();
                return;
            }
            console.log(`I'm thinking of a number between ${min} and ${max}...`);
            // Start others functions
            secretNumber = randomInRange(Number(min), Number(max));
            askGuess();
        });
    });
}

function askLimit() {
    rl.question("Enter maximum number of guesses: ", (num) => {
        if (!isValidNumber(num)) {
            console.log("Try again, with number as input.");
            rl.close();
            return;
        }
        numAttempts = Number(num);
        askRange();
    });
}

// Start the Game...
askLimit();