import { prompt } from "inquirer";

interface ICourse {
  id: number;
  fee: number;
  name: string;
}
interface IPaid {
  course: ICourse;
  paid: boolean;
}
interface IStudent {
  id: string;
  name: string;
  email: string;
  enroll: IPaid[];
}
type IOption =
  | "Add Student"
  | "Delete Student"
  | "Update Student"
  | "List Students"
  | "View Student"
  | "Enroll Student"
  | "Exit";

const courses: ICourse[] = [
  { id: 1, fee: 500, name: "Javasript" },
  { id: 2, fee: 400, name: "Python" },
  { id: 3, fee: 600, name: "CSharp" },
  { id: 4, fee: 900, name: "Figma Design" },
  { id: 5, fee: 800, name: "Graphic Design" },
  { id: 6, fee: 600, name: "JAVA" },
  { id: 7, fee: 300, name: "SQL" },
  { id: 8, fee: 400, name: "HTML" },
  { id: 9, fee: 100, name: "CSS" },
  { id: 10, fee: 1000, name: "Node" },
  { id: 11, fee: 900, name: "React" },
  { id: 12, fee: 600, name: "Redux" },
];
const students: IStudent[] = [
  {
    id: "12345",
    name: "John Doe",
    email: "johndoe@gmail.com",
    enroll: [
      { course: courses[0], paid: true },
      { course: courses[1], paid: false },
    ],
  },
  {
    id: "12352",
    name: "John Doe 2",
    email: "johndoe2@gmail.com",
    enroll: [
      { course: courses[2], paid: true },
      { course: courses[10], paid: false },
    ],
  },
  {
    id: "12232",
    name: "John Doe 3",
    email: "johndoe3@gmail.com",
    enroll: [
      { course: courses[3], paid: true },
      { course: courses[5], paid: false },
    ],
  },
];
class studentManagement {
  constructor() {
    this.Main();
  }
  async options(): Promise<IOption> {
    const { option } = await prompt({
      type: "list",
      name: "option",
      message: "Select an option",
      choices: [
        "Add Student",
        "Delete Student",
        "Update Student",
        "View Student",
        "List Students",
        "Enroll Student",
        "Exit",
      ] as IOption[],
    });
    return option;
  }
  async Main() {
    console.log("Welcome to student management system");
    const { confirm } = await prompt({
      type: "confirm",
      name: "confirm",
      message: "Do you want to continue?",
    });
    if (confirm) {
      const option = await this.options();
      switch (option) {
        case "List Students":
          this.students();
          break;
        case "View Student":
          this.student();
          break;
        case "Add Student":
          this.addStudent();
          break;
        case "Delete Student":
          this.deleteStudent();
          break;
        case "Enroll Student":
          this.enrollStudent();
          break;
        case "Update Student":
          this.updateStudent();
          break;
        default:
          break;
      }
    }
  }
  validateEmail(email: string): boolean {
    if (email.includes("@")) {
      return true;
    } else {
      return false;
    }
  }
  async emailInput(studentEmail: string): Promise<string> {
    const { email } = await prompt([
      {
        type: "input",
        name: "email",
        message: "Enter student email",
        default: studentEmail,
      },
    ]);
    return email;
  }
  async updateStudent(): Promise<void> {
    const { id } = await prompt({
      type: "list",
      name: "id",
      message: "Select Student ID ",
      choices: students.map((student) => student.id),
    });
    const student = students.find((student) => student.id === id);
    if (student) {
      const email = await this.emailInput(student.email);
      if (!this.validateEmail(email)) {
        console.log("Invalid email");
        this.updateStudent();
        return;
      }
      student.email = email;
      console.log("Student email updated");
      this.Main();
    } else {
      console.log("Student not found");
      this.Main();
    }
  }
  async enrollStudent() {
    const { id } = await prompt({
      type: "list",
      name: "id",
      message: "Select Student ID ",
      choices: students.map((student) => student.id),
    });
    const student = students.find((student) => student.id === id);
    if (student) {
      const { course } = await prompt({
        type: "list",
        name: "course",
        message: "Select a course",
        choices: courses.map((course) => course.name),
      });
      const enrolled = student.enroll.find((en) => en.course.name === course);
      if (enrolled) {
        console.log("Already enrolled");
        this.Main();
        return;
      }
      const { paid } = await prompt({
        type: "confirm",
        name: "paid",
        message: "Is the course paid?",
      });
      const selectedCourse = courses.find((c) => c.name === course) as ICourse;
      student.enroll.push({ course: selectedCourse, paid });
      console.log("Course enrolled");
      const { response } = await prompt({
        type: "confirm",
        name: "response",
        message: "Do you want to enroll another course?",
      });
      if (response) {
        this.enrollStudent();
        return;
      }
      this.Main();
    } else {
      console.log("Student not found");
      this.Main();
    }
  }
  async deleteStudent() {
    const id = await this.inputID();
    if (!id || id.toString().length !== 5) {
      console.log("Invalid ID");
      this.student();
      return;
    }
    const student = students.find((student) => student.id === id);
    if (student) {
      const { confirm } = await prompt({
        type: "confirm",
        name: "confirm",
        message: "Do you want to delete this student?",
      });
      if (confirm) {
        students.splice(students.indexOf(student), 1);
        console.log("Student deleted");
        this.Main();
      }
    } else {
      console.log("Student not found");
      this.Main();
    }
  }
  async addStudent(): Promise<void> {
    const { name, email } = await prompt([
      {
        type: "input",
        name: "name",
        message: "Enter student name",
      },
      {
        type: "input",
        name: "email",
        message: "Enter student email",
      },
    ]);
    const id = Math.floor(10000 + Math.random() * 90000).toString();
    const student: IStudent = {
      id,
      name,
      email,
      enroll: [],
    };
    students.push(student);
    console.log("Student added with id " + id);
    this.Main();
  }
  async inputID(): Promise<String> {
    const { id } = await prompt({
      type: "input",
      name: "id",
      message: "Enter student five digit id",
    });
    return id;
  }
  async student(): Promise<void> {
    const id = await this.inputID();
    if (!id || id.toString().length !== 5) {
      console.log("Invalid ID");
      this.student();
      return;
    }
    const student = students.find((student) => student.id === id);
    if (student) {
      console.log("Student ID", student.id);
      console.log("Student Name", student.name);
      console.log("Student Email", student.email);
      student.enroll.map((en) => {
        console.log("Course Name", en.course.name);
        console.log("Course Fee", en.course.fee);
        console.log("Course Paid", en.paid);
        if (!en.paid) {
          console.log("Course Fee remain=", en.course.fee);
        }
      });
      console.log("-----------------------------------------");
      this.Main();
    } else {
      console.log("Student not found");
      this.Main();
    }
  }
  async students(): Promise<void> {
    console.log("List of students");
    students.map((student) => {
      console.log("Student ID", student.id);
      console.log("Student Name", student.name);
      console.log("Student Email", student.email);
      student.enroll.map((en) => {
        console.log("Course Name", en.course.name);
        console.log("Course Fee", en.course.fee);
        console.log("Course Paid", en.paid);
        if (!en.paid) {
          console.log("Course Fee remain=", en.course.fee);
        }
      });
      console.log("-----------------------------------------");
    });
    this.Main();
  }
}

const sm = new studentManagement();
