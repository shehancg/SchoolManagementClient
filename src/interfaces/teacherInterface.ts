export interface Teacher {
    teacherID: number;
    firstName: string;
    lastName: string;
    contactNo: string;
    emailAddress: string;
    allocatedSubjects: any[]; // Replace 'any[]' with the appropriate type for allocatedSubjects
    allocateClassrooms: any[]; // Replace 'any[]' with the appropriate type for allocateClassrooms
  }