import { v4 } from "uuid";
export default class Students {
    students = [];
    addStudent(name, progId) {
        const id = v4();
        this.students.push({
            id,
            stdName: name,
            progId,
        });
    }
    deleteStudent(id) {
        this.students.filter((i) => i.id !== id);
    }
    updateStudent(id, name) {
        const index = this.students.findIndex((i) => i.id === id);
        this.students[index].stdName = name;
    }
    getStudentById(id) {
        const result = this.students.find((i) => i.id === id);
        if (result) {
            return result;
        }
        return { stdName: "", id: "", progId: "" };
    }
    getStudents() {
        return this.students;
    }
    getStudentsByProgId(id) {
        const result = this.students.filter((i) => i.progId === id);
        if (result) {
            return result;
        }
        return [{ stdName: "", id: "", progId: "" }];
    }
}
