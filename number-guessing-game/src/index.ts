import { prompt } from "inquirer";

interface IAnswers {
  input: number;
  answer: number;
  id: number;
}
const answers: IAnswers[] = [];
class Game {
  number: number = 0;
  getRondomNumber(): number {
    return Math.floor(Math.random() * (10 - 1) + 1);
  }
  constructor() {
    this.start();
  }
  async input(message: string): Promise<number> {
    let n;
    n = await prompt({
      type: "number",
      name: "number",
      message,
    });
    return n.number;
  }
  validateNumber(input: number): boolean {
    if (isNaN(input)) {
      return false;
    }
    if (input < 1 || input > 10) {
      return false;
    }
    return true;
  }
  async start() {
    const { response } = await prompt({
      type: "confirm",
      name: "response",
      message:
        "Welcome to the number guessing game,This round will ask you 5 number and then we will show you a result, do you want to continue?",
    });
    let i = 0;
    if (response) {
      do {
        this.number = this.getRondomNumber();
        let input = await this.input(
          `Guess the number between 1 and 10, Number: ${i + 1}`
        );
        if (!isNaN(input) && input >= 1 && input <= 10) {
          answers.push({ id: i + 1, input, answer: this.number });
          i++;
        } else {
          i = i;
        }
      } while (i < 5);
      const correct = answers.filter(
        (answer) => answer.input === answer.answer
      );
      const incorrect = answers.filter(
        (answer) => answer.input !== answer.answer
      );
      const response = await prompt({
        type: "confirm",
        name: "response",
        message: `You got ${correct.length} correct and ${incorrect.length} incorrect, do you want to see the result?`,
      });
      if (response.response) {
        this.start();
      }
    }
  }
}

const game = new Game();
