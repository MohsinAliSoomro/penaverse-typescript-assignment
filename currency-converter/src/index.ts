import { prompt } from "inquirer";
import axios from "axios";
const URL = "https://api.exchangerate-api.com/v4/latest/USD";
class currencyConverter {
  constructor() {
    this.Main();
  }
  async getCurrenciesList() {
    const { data } = await axios.get(URL);
    return Object.keys(data.rates);
  }

  async Main() {
    console.log("Welcome to the currency converter!");
    const { response } = await prompt({
      type: "confirm",
      name: "response",
      message:
        "Welcome to currency converter app,Would you like to convert a currency?",
    });
    if (response) {
      const currencies = await this.getCurrenciesList();
      const { option } = await prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices: ["Convert", "Get Rate"],
      });
      if (option === "Get Rate") {
        const { from, to } = await prompt([
          {
            name: "from",
            message: "From?",
            type: "list",
            choices: currencies,
          },
          {
            name: "to",
            message: "To?",
            type: "list",
            choices: currencies,
          },
        ]);
        const rate = await this.getCurrencyRate(from, to);
        console.log(`1 ${from} = ${rate} ${to}`);
        this.Main();
        return;
      }

      const { from, to, amount } = await prompt([
        {
          type: "list",
          name: "from",
          message: "From which currency would you like to convert?",
          choices: currencies,
        },
        {
          type: "list",
          name: "to",
          message: "To which currency would you like to convert?",
          choices: currencies,
        },
        {
          type: "number",
          name: "amount",
          message: "How much would you like to convert?",
        },
      ]);
      const result = await this.convert(from, to, amount);
      console.log(`${amount} ${from} is ${result.toFixed(2)} ${to}`);
    }
  }
  async convert(from: string, to: string, amount: number) {
    const { data } = await axios.get(URL);
    const rate = data.rates[to] / data.rates[from];
    return rate * amount;
  }
  async getCurrencyRate(from: string, to: string) {
    const { data } = await axios.get(URL);
    const rate = data.rates[to] / data.rates[from];
    return rate;
  }
}

const converter = new currencyConverter();
