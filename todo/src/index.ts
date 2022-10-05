import { prompt } from "inquirer";

interface ITask {
  title: string;
  isCompleted: boolean;
}
const tasks: ITask[] = [
  {
    title: "Task 1",
    isCompleted: true,
  },
  {
    title: "Task 2",
    isCompleted: false,
  },
  {
    title: "Task 3",
    isCompleted: false,
  },
];

type IOptions = {
  options: "Get-Todos" | "Add-Todo" | "Delete-Todo" | "Update-Todos";
};
type ITaskOption = {
  task: boolean;
};
type IMenu = IOptions | ITaskOption;

class TODO {
  constructor() {
    this.Main();
  }
  async messagePrompt(
    message: string,
    isTask?: boolean | undefined
  ): Promise<IMenu> {
    if (isTask) {
      return await prompt({
        name: "options",
        type: "list",
        message,
        choices: ["Get-Todos", "Add-Todo", "Delete-Todo", "Update-Todos"],
      });
    }
    return await prompt({
      name: "task",
      type: "confirm",
      message: message,
    });
  }
  async Main() {
    const options: IMenu = await this.messagePrompt(
      "Welcome to the Todo App, Press enter to continue?",
      true
    );
    if ("options" in options)
      switch (options.options) {
        case "Get-Todos":
          await this.getTodos();
          this.Main();
          break;
        case "Add-Todo":
          await this.addTodo();
          this.Main();
          break;
        case "Delete-Todo":
          this.deleteTodo();
          break;
        case "Update-Todos":
          this.updateTodo();
          break;
        default:
          this.getTodos();
          break;
      }
  }
  async getTodos() {
    return await prompt({
      name: "task",
      type: "list",
      message: "Tasks",
      choices: tasks.map((task) => ({
        name: task.isCompleted
          ? `Complete :Completed , Name :${task.title}`
          : `Complete : Incomplete, Name : ${task.title}`,
        value: task.title,
      })),
    });
  }
  async addTodo() {
    let input;
    input = await prompt({
      name: "title",
      type: "input",
      message: "Enter the title of the task",
    });
    if (input.title === "") {
      input = await prompt({
        name: "title",
        type: "input",
        message: "Enter the title of the task",
      });
    }
    const isCompleted = await prompt({
      name: "isCompleted",
      type: "confirm",
      message: "Is the task completed?",
    });
    tasks.push({
      title: input.title,
      isCompleted: isCompleted.isCompleted,
    });
  }
  async deleteTodo() {
    const title = await prompt({
      name: "title",
      type: "checkbox",
      message: "Select the task to delete",
      choices: tasks.map((task) => ({
        name: task.isCompleted
          ? `Complete :Completed , Name :${task.title}`
          : `Complete : Incomplete, Name : ${task.title}`,
        value: task.title,
      })),
    });
    title.title?.forEach((task: string) => {
      const index = tasks.findIndex((t) => t.title === task);
      if (index > -1) tasks.splice(index, 1);
    });
    this.Main();
  }
  async updateTodo() {
    const title = await prompt({
      name: "title",
      type: "checkbox",
      message: "Select the task that you want to complete...!",
      choices: tasks.map((task) => ({
        name: task.isCompleted
          ? `Complete :Completed , Name :${task.title}`
          : `Complete : Incomplete, Name : ${task.title}`,
        value: task.title,
      })),
    });
    title.title?.forEach((task: string) => {
      const index = tasks.findIndex((t) => t.title === task);
      if (index > -1) {
        const tk = tasks[index].isCompleted;
        tk
          ? (tasks[index].isCompleted = false)
          : (tasks[index].isCompleted = true);
      }
    });
    this.Main();
  }
}
const todo = new TODO();
