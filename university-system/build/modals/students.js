"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Students {
    addStudent(name) {
        //code here
    }
    deleteStudent(id) {
        //code here
    }
    updateStudent(id, name) {
        //code here
    }
    getStudentById(id) {
        return { stdName: "string", id: "string" };
    }
    getStudents() {
        return [{ stdName: "string", id: "string" }];
    }
    getStudentsByProgId(id) {
        return [{ stdName: "", id: "" }];
    }
}
exports.default = Students;
