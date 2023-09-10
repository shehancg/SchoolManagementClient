// Interface for the allocation object
export interface AllocationSubject {
    allocateSubjectId: number;
    teacherId: string;
    subjectId: string;
}

export interface AllocateSubjectTeacher{
  allocateSubjectID: number;
  subjectID: number;
  teacherID: number;
  subjectName: string;
}