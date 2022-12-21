import { ICourses } from "../state/types";
import { v4 } from "uuid";
interface ICourse {
  courseName: string;
  id: string;
  progId: string;
}
export default class Courses implements ICourses {
  private courses: ICourse[] = [];
  addCourse(name: string, progId: string) {
    const id = v4();
    this.courses.push({
      id,
      courseName: name,
      progId,
    });
  }
  deleteCourse(id: string) {
    this.courses.filter((i) => i.id !== id);
  }
  updateCourse(id: string, name: string) {
    const index = this.courses.findIndex((i) => i.id === id);
    this.courses[index].courseName = name;
  }
  getCourseById(id: string) {
    const result = this.courses.find((i) => i.id === id);
    if (result) {
      return result;
    } else {
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
  getCoursesByProgId(id: string) {
    const result = this.courses.filter((i) => i.progId === id);
    if (result) return result;
    return [{ courseName: "", id: "", progId: "" }];
  }
}
