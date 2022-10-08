import { prompt } from "inquirer";

class worldCounter {
  count: string = "";
  constructor() {
    this.start();
  }
  async validate(input: string) {
    console.log(input);
  }
  async start() {
    const { response } = await prompt({
      type: "confirm",
      name: "response",
      message: "Welcome to the World Counter App,do you want to continou?",
    });
    if (response) {
      const { text } = await prompt({
        type: "input",
        name: "text",
        message: "Enter the text count the words",
      });
      this.count = text;
      const txt = this.count.replace(/ /g, "");
      console.log("Total Charactor you write =", txt.length);
      this.start();
    }
  }
}

const w_c = new worldCounter();
