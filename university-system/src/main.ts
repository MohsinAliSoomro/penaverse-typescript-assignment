import inquirer from "inquirer";
// import Departments from "./modals/departments";
import University from "./modals/university";

const uni = new University("Air University");
// const dept = new Departments();
type OptionsType =
  | "Add Department"
  | "Add Student"
  | "Add Cource"
  | "Add Program";
class Main {
  constructor() {
    this.run();
  }
  async run() {
    await inquirer.prompt({
      name: "uni",
      type: "confirm",
      message: "Welcome to the University System " + uni.getUniveristyName(),
    });
    this.options();
  }
  async handleOptions(options: OptionsType) {
    switch (options) {
      case "Add Cource":
      case "Add Department":
      case "Add Program":
      case "Add Student":
      default:
        return null;
    }
  }
  async options() {
    const response = await inquirer.prompt({
      name: "option",
      type: "list",
      choices: ["Add Department", "Add Student", "Add Cource", "Add Program"],
      message: "Please Choose Options",
    });
    this.handleOptions(response.option);
  }
}

new Main();
