import { v4 } from "uuid";
export default class Courses {
    courses = [];
    addCourse(name, progId) {
        const id = v4();
        this.courses.push({
            id,
            courseName: name,
            progId,
        });
    }
    deleteCourse(id) {
        this.courses.filter((i) => i.id !== id);
    }
    updateCourse(id, name) {
        const index = this.courses.findIndex((i) => i.id === id);
        this.courses[index].courseName = name;
    }
    getCourseById(id) {
        const result = this.courses.find((i) => i.id === id);
        if (result) {
            return result;
        }
        else {
            return {
                courseName: "",
                id: "",
                progId: "",
            };
        }
    }
    getCourses() {
        return this.courses;
    }
    getCoursesByProgId(id) {
        const result = this.courses.filter((i) => i.progId === id);
        if (result)
            return result;
        return [{ courseName: "", id: "", progId: "" }];
    }
}
