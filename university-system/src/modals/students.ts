import { IStudents } from "../state/types";
import { v4 } from "uuid";
interface IStudent {
  id: string;
  stdName: string;
  progId: string;
}
export default class Students implements IStudents {
  private students: IStudent[] = [];
  addStudent(name: string, progId: string) {
    const id = v4();
    this.students.push({
      id,
      stdName: name,
      progId,
    });
  }
  deleteStudent(id: string) {
    this.students.filter((i) => i.id !== id);
  }
  updateStudent(id: string, name: string) {
    const index = this.students.findIndex((i) => i.id === id);
    this.students[index].stdName = name;
  }
  getStudentById(id: string) {
    const result = this.students.find((i) => i.id === id);
    if (result) {
      return result;
    }
    return { stdName: "", id: "", progId: "" };
  }
  getStudents() {
    return this.students;
  }
  getStudentsByProgId(id: string) {
    const result = this.students.filter((i) => i.progId === id);
    if (result) {
      return result;
    }
    return [{ stdName: "", id: "", progId: "" }];
  }
}
