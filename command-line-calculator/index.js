const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "greeting",
      message: "What would you like to say?",
      type: "input",
    },
  ])
  .then(function (answer) {
    console.log(answer);
  });
