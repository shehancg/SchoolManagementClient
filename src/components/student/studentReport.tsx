import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";

// Interface for the student object
interface Student {
  studentID: number;
  firstName: string;
  lastName: string;
  contactPerson: string;
  contactNo: string;
  classroomName: string;
  emailAddress: string;
  dateOfBirth: string;
}

// Interface for teacher and subject information
interface TeacherAndSubject {
  teacherFirstName: string;
  teacherLastName: string;
  subjectName: string;
}

const StudentReport: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [studentDetails, setStudentDetails] = useState<Student>({
    studentID: 0,
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    classroomName: "",
    emailAddress: "",
    dateOfBirth: "",
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [teacherAndSubjects, setTeacherAndSubjects] = useState<TeacherAndSubject[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/api/student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleStudentSelection = (selectedStudentId: number) => {
    setSelectedStudent(selectedStudentId);
    fetchStudentDetails(selectedStudentId);
  };

  const fetchStudentDetails = async (studentId: number) => {
    try {
      const response = await api.get(`/api/StudentDto/${studentId}`);
      setStudentDetails(response.data);
      fetchTeacherAndSubjects(studentId); // Fetch teacher and subject information
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const fetchTeacherAndSubjects = async (studentId: number) => {
    try {
      const response = await api.get(`/api/StudentDto/new/${studentId}`);
      setTeacherAndSubjects(response.data);
    } catch (error) {
      console.error("Error fetching teacher and subject information:", error);
    }
  };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h2>Student Report</h2>
      <Form>
        {/* Student selection dropdown */}
        <FormGroup>
          <Label for="student">Select Student</Label>
          <Input
            type="select"
            name="student"
            id="student"
            value={selectedStudent || ""}
            onChange={(e) => handleStudentSelection(Number(e.target.value))}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.studentID} value={student.studentID}>
                {`${student.firstName} ${student.lastName}`}
              </option>
            ))}
          </Input>
        </FormGroup>
        {/* Student details form */}
        <FormGroup>
          <Label for="contactPerson">Contact Person</Label>
          <Input
            type="text"
            name="contactPerson"
            id="contactPerson"
            value={studentDetails.contactPerson}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="contactNo">Contact Number</Label>
          <Input
            type="text"
            name="contactNo"
            id="contactNo"
            value={studentDetails.contactNo}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="classroomName">Classroom</Label>
          <Input
            type="text"
            name="classroomName"
            id="classroomName"
            value={studentDetails.classroomName}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="emailAddress">Email Address</Label>
          <Input
            type="text"
            name="emailAddress"
            id="emailAddress"
            value={studentDetails.emailAddress}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="dateOfBirth">Date of Birth</Label>
          <Input
            type="text"
            name="dateOfBirth"
            id="dateOfBirth"
            value={new Date(studentDetails.dateOfBirth).toLocaleDateString()} // Format the date
            readOnly
          />
        </FormGroup>
      </Form>
      {/* Teacher and subject information table */}
      <Table bordered>
        <thead>
          <tr className="table-danger">
            <th>Subject Name</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {teacherAndSubjects.map((teacherAndSubject, index) => (
            <tr key={index}>
              <td className="table-success">{teacherAndSubject.subjectName}</td>
              <td className="table-primary">{`${teacherAndSubject.teacherFirstName} ${teacherAndSubject.teacherLastName}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentReport;
