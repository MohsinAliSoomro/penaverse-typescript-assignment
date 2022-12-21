"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Departments {
    constructor() {
        this.depName = "";
        this.id = 0;
        this.programs = [];
    }
    addDepartment(name) {
        // add dep
        const id = (this.id = +1);
    }
    deleteDepartment(id) {
        //remove dep
    }
    updateDepartment(id, name) {
        //update deptarmnt
    }
    getDepartmentById(id) {
        return { depName: "", id: "" };
    }
    getDepartments() {
        //get department
        return [{ depName: "", id: "" }];
    }
}
exports.default = Departments;
