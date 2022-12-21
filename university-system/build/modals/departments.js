import { v4 } from "uuid";
export default class Departments {
    departments = [];
    programs = [];
    addDepartment(name) {
        const id = v4();
        this.departments.push({
            id,
            depName: name,
        });
    }
    deleteDepartment(id) {
        this.departments.filter((i) => i.id !== id);
    }
    updateDepartment(id, name) {
        const index = this.departments.findIndex((i) => i.id === id);
        this.departments[index].depName = name;
    }
    getDepartmentById(id) {
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
