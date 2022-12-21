interface IUniversity {
  getUniveristyName: () => string;
  setUniveristyName: (name: string) => void;
}

interface IDepartments {
  getDepartments: () => { depName: string; id: string }[];
  getDepartmentById: (id: string) => { depName: string; id: string };
  addDepartment: (name: string) => void;
  deleteDepartment: (id: string) => void;
  updateDepartment: (id: string, name: string) => void;
}

interface IPrograms {
  addProgram: (name: string, depId: string) => void;
  deleteProgram: (id: string) => void;
  updateProgram: (id: string, name: string) => void;
  getProgramById: (id: string) => {
    progName: string;
    id: string;
    depId: string;
  };
  getPrograms: () => { progName: string; id: string; depId: string }[];
  getProgramsByDeptId: (
    id: string
  ) => { progName: string; id: string; depId: string }[];
}

interface ICourses {
  addCourse: (name: string, programId: string) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (id: string, name: string) => void;
  getCourseById: (id: string) => {
    courseName: string;
    id: string;
    progId: string;
  };
  getCourses: () => { courseName: string; id: string; progId: string }[];
  getCoursesByProgId: (
    id: string
  ) => { courseName: string; id: string; progId: string }[];
}
interface IStudents {
  addStudent: (name: string,progId:string) => void;
  deleteStudent: (id: string) => void;
  updateStudent: (id: string, name: string) => void;
  getStudentById: (id: string) => {
    stdName: string;
    id: string;
    progId: string;
  };
  getStudents: () => { stdName: string; id: string; progId: string }[];
  getStudentsByProgId: (
    id: string
  ) => { stdName: string; id: string; progId: string }[];
}

export { IUniversity, IDepartments, IPrograms, ICourses, IStudents };
