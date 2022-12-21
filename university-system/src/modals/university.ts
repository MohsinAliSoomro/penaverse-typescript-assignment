import { IUniversity } from "../state/types";
export default class University implements IUniversity {
  private name: string = "";
  constructor(name: string) {
    this.name = name;
  }
  getUniveristyName() {
    return this.name;
  }
  setUniveristyName(name: string) {
    this.name = name;
  }
}
