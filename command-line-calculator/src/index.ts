import { prompt } from "inquirer";

interface IAnswers {
  name: boolean;
}
type IOperator = "add" | "sub" | "mul" | "div";
class Main {
  firstNumber: number = 0;
  lastNamber: number = 0;
  sum: number = 0;
  constructor() {
    this.welcome();
  }
  /**
   * welcome to calculator and ask for operation
   * @param isAgain
   * @param message
   */
  async welcome(
    isAgain: boolean = false,
    message: string = "Welcome to the calculator, Press enter to continue"
  ): Promise<void> {
    let response: IAnswers = { name: false };
    if (isAgain) {
      response = await prompt({
        name: "name",
        message,
        type: "confirm",
      });
    } else {
      response = await prompt({
        name: "name",
        message,
        type: "confirm",
      });
    }
    if (response.name) {
      const response = await prompt({
        name: "operator",
        message: "What operation do you want to perform?",
        type: "list",
        choices: ["Addition", "Subtraction", "Multiplication", "Division"],
      });
      switch (response.operator) {
        case "Addition":
          this.operate("add");
          break;
        case "Division":
          this.operate("div");
          break;
        case "Multiplication":
          this.operate("mul");
          break;
        case "Subtraction":
          this.operate("sub");
          break;
        default:
          this.welcome(true);
          break;
      }
    }
  }
  /**
   * first digit input
   * @returns {Promise<{firstNumber: number}>}
   */
  async firstDigit(): Promise<{ firstNumber: number }> {
    let first: { firstNumber: number } = { firstNumber: 0 };
    return (first = await prompt({
      name: "firstNumber",
      message: "Enter the first number",
      type: "number",
    }));
  }
  /**
   * second digit input
   * @returns {Promise<{secondNumber: number}>}
   */
  async secondDigit(): Promise<{ secondNumber: number }> {
    let second: { secondNumber: number } = { secondNumber: 0 };
    return (second = await prompt({
      name: "secondNumber",
      message: "Enter the second number",
      type: "number",
    }));
  }
  /**
   * operation of calculator
   * @param operator
   * @returns void
   */
  async operate(operator: IOperator) {
    let first: { firstNumber: number } = { firstNumber: 0 };
    first = await this.firstDigit();
    if (isNaN(first.firstNumber)) {
      this.welcome(true, "Please enter valid number");
      first = await this.firstDigit();
    }
    let second: { secondNumber: number } = { secondNumber: 0 };
    second = await this.secondDigit();
    if (isNaN(second.secondNumber)) {
      this.welcome(true, "Please enter valid number");
      second = await this.secondDigit();
    }
    switch (operator) {
      case "sub":
        this.sum = first.firstNumber - second.secondNumber;
        break;
      case "div":
        if (second.secondNumber === 0) {
          return this.welcome(true, "You can't divide by zero");
        }
        this.sum = first.firstNumber / second.secondNumber;
        break;
      case "mul":
        this.sum = first.firstNumber * second.secondNumber;
        break;
      default:
        this.sum = first.firstNumber + second.secondNumber;
        break;
    }
    this.welcome(true, `The result is ${this.sum}, Do you want to continue?`);
  }
}

const main = new Main();
