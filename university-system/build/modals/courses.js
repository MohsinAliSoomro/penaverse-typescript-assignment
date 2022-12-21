"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Courses {
    addCourse(name, progId) {
        //code here
    }
    deleteCourse(id) {
        //code here
    }
    updateCourse(id, name) {
        //code here
    }
    getCourseById(id) {
        return { courseName: "string", id: "string" };
    }
    getCourses() {
        return [{ courseName: "string", id: "string" }];
    }
    getCoursesByProgId(id) {
        return [{ courseName: "", id: "" }];
    }
}
exports.default = Courses;
