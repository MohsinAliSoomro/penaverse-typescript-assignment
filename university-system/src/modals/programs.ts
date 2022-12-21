import { IPrograms } from "../state/types";
import { v4 } from "uuid";
interface IProgram {
  progName: string;
  id: string;
  depId: string;
}
export default class Programs implements IPrograms {
  private programs: IProgram[] = [];
  addProgram(name: string, depId: string) {
    const id = v4();
    this.programs.push({
      id,
      progName: name,
      depId,
    });
  }
  deleteProgram(id: string) {
    this.programs.filter((i) => i.id !== id);
  }
  updateProgram(id: string, name: string) {
    const index = this.programs.findIndex((i) => i.id === id);
    this.programs[index].progName = name;
  }
  getProgramById(id: string) {
    const result = this.programs.find((i) => i.id === id);
    if (result) {
      return result;
    }
    return { progName: "", id: "", depId: "" };
  }
  getPrograms() {
    return this.programs;
  }
  getProgramsByDeptId(id: string) {
    const result = this.programs.filter((i) => i.depId === id);
    if (result) {
      return result;
    }
    return [{ progName: "", id: "", depId: "" }];
  }
}
