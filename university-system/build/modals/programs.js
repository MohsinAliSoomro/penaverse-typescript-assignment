import { v4 } from "uuid";
export default class Programs {
    programs = [];
    addProgram(name, depId) {
        const id = v4();
        this.programs.push({
            id,
            progName: name,
            depId,
        });
    }
    deleteProgram(id) {
        this.programs.filter((i) => i.id !== id);
    }
    updateProgram(id, name) {
        const index = this.programs.findIndex((i) => i.id === id);
        this.programs[index].progName = name;
    }
    getProgramById(id) {
        const result = this.programs.find((i) => i.id === id);
        if (result) {
            return result;
        }
        return { progName: "", id: "", depId: "" };
    }
    getPrograms() {
        return this.programs;
    }
    getProgramsByDeptId(id) {
        const result = this.programs.filter((i) => i.depId === id);
        if (result) {
            return result;
        }
        return [{ progName: "", id: "", depId: "" }];
    }
}
