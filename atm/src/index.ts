import { prompt } from "inquirer";

type Iinput = "username" | "password";
class ATM {
  private balance: number = 119999;
  private history: string[] = [];
  constructor() {
    this.start();
  }
  async input(type: Iinput): Promise<string> {
    if (type === "username") {
      const { username } = await prompt({
        name: "username",
        type: "input",
        message: "Please enter your username",
      });
      return username;
    }
    const { password } = await prompt({
      name: "password",
      type: "password",
      message: "Please enter your password",
    });
    return password;
  }
  crendentials(username: string, password: string): boolean {
    if (username === "user1" && password === "1234") {
      return true;
    }
    return false;
  }
  async start() {
    const { response } = await prompt({
      name: "response",
      type: "confirm",
      message: "Welcome to the Crypto ATM, would you like to continue?",
    });
    if (response) {
      const username = await this.input("username");
      const password = await this.input("password");
      const isAuthenticate = this.crendentials(username, password);
      if (isAuthenticate) {
        this.atmFunctionality();
        return;
      }
      console.log("You are not authenticated, please try again");
      this.start();
    }
  }
  async atmFunctionality() {
    const { response } = await prompt({
      name: "response",
      type: "list",
      message: "What would you like to do?",
      choices: ["Withdraw", "Deposit", "Check Balance", "History", "Exit"],
    });
    switch (response) {
      case "Check Balance":
        this.checkBalance();
        break;
      case "Withdraw":
        this.withdraw();
        break;
      case "Deposit":
        this.deposit();
        break;
      case "History":
        this.getHitory();
        break;
      default:
        break;
    }
  }
  getHitory() {
    console.table(this.history);
    this.atmFunctionality();
  }
  async checkBalance() {
    const { response } = await prompt({
      name: "response",
      type: "confirm",
      message: `Your balance is ${this.balance}, would you like to continue?`,
    });
    if (response) {
      this.atmFunctionality();
      return;
    }
  }
  async withdraw() {
    const { amount } = await prompt({
      name: "amount",
      type: "number",
      message: "How much would you like to withdraw?",
    });
    if (amount > this.balance) {
      console.log(
        `You do not have enough funds to withdraw that amount = ${this.balance}`
      );
      this.atmFunctionality();
      return;
    }
    if (amount < 1) {
      console.log("You can not withdraw less than $1");
      this.atmFunctionality();
      return;
    }
    this.balance -= amount;
    console.log(
      `You have withdrawn ${amount} your new balance is ${this.balance}`
    );
    this.history.push(
      `You have withdrawn ${amount} your new balance is ${this.balance}`
    );
    this.atmFunctionality();
  }
  async deposit() {
    const { amount } = await prompt({
      name: "amount",
      type: "number",
      message: "How much would you like to deposit?",
    });
    if (amount < 1) {
      console.log("You can not deposit less than $1");
      this.atmFunctionality();
      return;
    }
    this.balance += amount;
    console.log(
      `You have deposited ${amount} your new balance is ${this.balance}`
    );
    this.history.push(
      `You have deposited ${amount} your new balance is ${this.balance}`
    );
    this.atmFunctionality();
  }
}
const atm = new ATM();
