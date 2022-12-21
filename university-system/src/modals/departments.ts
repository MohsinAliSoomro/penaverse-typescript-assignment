import { IDepartments } from "../state/types";
import { v4 } from "uuid";
interface IDepartment {
  depName: string;
  id: string;
}
export default class Departments implements IDepartments {
  private departments: IDepartment[] = [];
  addDepartment(name: string) {
    const id = v4();
    this.departments.push({
      id,
      depName: name,
    });
  }
  deleteDepartment(id: string) {
    this.departments.filter((i) => i.id !== id);
  }
  updateDepartment(id: string, name: string) {
    const index = this.departments.findIndex((i) => i.id === id);
    this.departments[index].depName = name;
  }
  getDepartmentById(id: string) {
    const result = this.departments.find((i) => i.id === id);
    if (result) {
      return result;
    }
    return { depName: "", id: "" };
  }
  getDepartments() {
    return this.departments;
  }
}
