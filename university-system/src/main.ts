import inquirer from "inquirer";

class Main {
  constructor() {
    this.run();
  }
  async run() {
     await inquirer.prompt({
      name: "uni",
      type: "confirm",
      message: "Welcome to the University System",
    });
  }
}

new Main();
