export interface AllocateClassroom {
    allocateClassroomId: number;
    teacherId: number;
    classroomId: number;
  }

export interface AllocateClassTeacher{
  allocateClassroomID: number;
  classroomID: number;
  teacherID: number;
  classroomName: string;
}  