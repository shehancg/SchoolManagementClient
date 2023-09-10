import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";
import Swal from "sweetalert2";
import { Student } from "../../interfaces/studentInterface";
import { Classroom } from "../../interfaces/classroomInterface";

const StudentRegistration: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [classroom, setClassroom] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [classroomError, setClassroomError] = useState("");

  useEffect(() => {
    fetchClassrooms();
    fetchAllStudents();
  }, []);

  // Function to handle update button click
  const handleUpdate = (student: Student) => {
    setIsUpdateMode(true);
    setSelectedStudent(student);
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setContactPerson(student.contactPerson);
    setContactNo(student.contactNo);
    setEmail(student.emailAddress);
    setDateOfBirth(student.dateOfBirth);
    setClassroom(student.classroomID.toString()); // Assuming classroomId is a string
    setAge(student.age);
  };

  const fetchClassrooms = async () => {
    try {
      const response = await api.get("/api/classrooms");
      setClassrooms(response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const response = await api.get("/api/student");
      setAllStudents(response.data);
    } catch (error) {
      console.error("Error fetching all students:", error);
    }
  };

  const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!contactPerson.trim()) {
      setContactPersonError("Contact Person is required");
      isValid = false;
    } else {
      setContactPersonError("");
    }

    if (!contactNo.trim()) {
      setContactNoError("Contact No is required");
      isValid = false;
    } else if (!/^\d{10,}$/.test(contactNo)) {
      setContactNoError(
        "Contact No should be numeric and contain at least 10 digits"
      );
      isValid = false;
    } else {
      setContactNoError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress.trim()) {
      setEmailError("Email Address is required");
      isValid = false;
    } else if (!emailPattern.test(emailAddress)) {
      setEmailError("Invalid Email Address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!dateOfBirth.trim()) {
      setDateOfBirthError("Date of Birth is required");
      isValid = false;
    } else {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        setDateOfBirthError("Date of Birth cannot be in the future");
        isValid = false;
      } else {
        setDateOfBirthError("");
      }
    }

    if (!classroom.trim()) {
      setClassroomError("Classroom is required");
      isValid = false;
    } else {
      setClassroomError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calculatedAge = calculateAge(dateOfBirth);

    if (validateForm()) {
      try {
        if (selectedStudent) {
          // Update existing student
          const updatedStudent = {
            studentID: selectedStudent.studentID, // Assuming studentID is available
            firstName,
            lastName,
            contactPerson,
            contactNo,
            emailAddress,
            dateOfBirth,
            age: calculatedAge,
            classroomID: parseInt(classroom),
          };

          const response = await api.put(
            `/api/Student/${selectedStudent.studentID}`,
            updatedStudent
          );

          console.log("Student updated:", response.data);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Student updated successfully!",
          });

          fetchAllStudents();
        } else {
          // Register new student
          const newStudent = {
            firstName,
            lastName,
            contactPerson,
            contactNo,
            emailAddress,
            dateOfBirth,
            age: calculatedAge,
            classroomID: parseInt(classroom),
          };

          const response = await api.post("/api/Student", newStudent);

          console.log("Student added:", response.data);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Student registered successfully!",
          });

          fetchAllStudents();
        }

        setSelectedStudent(null);
        setFirstName("");
        setLastName("");
        setContactPerson("");
        setContactNo("");
        setEmail("");
        setDateOfBirth("");
        setClassroom("");
        setAge(undefined);

        setFirstNameError("");
        setLastNameError("");
        setContactPersonError("");
        setContactNoError("");
        setEmailError("");
        setDateOfBirthError("");
        setClassroomError("");
      } catch (error: any) {
        console.error("Error adding/updating student:", error.response.data);
      }
    }
  };

  const handleCancel = () => {
    setIsUpdateMode(false);
    setFirstName("");
    setLastName("");
    setContactPerson("");
    setContactNo("");
    setEmail("");
    setDateOfBirth("");
    setClassroom("");
    setAge(undefined);

    setFirstNameError("");
    setLastNameError("");
    setContactPersonError("");
    setContactNoError("");
    setEmailError("");
    setDateOfBirthError("");
    setClassroomError("");
  };

  const handleDelete = async (studentID: number) => {
    try {
      await api.delete(`/api/Student/${studentID}`);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Student deleted successfully!",
      });

      fetchAllStudents();
    } catch (error: any) {
      console.error("Error deleting student:", error.response.data);
    }
  };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h2 style={{ textAlign: "center", paddingBottom: 10 }}>
        Student Registration
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name *</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <div className="error">{firstNameError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name *</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div className="error">{lastNameError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="contactPerson">Contact Person *</Label>
          <Input
            type="text"
            name="contactPerson"
            id="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
          {contactPersonError && (
            <div className="error">{contactPersonError}</div>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="contactNo">Contact No *</Label>
          <Input
            type="text"
            name="contactNo"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          {contactNoError && <div className="error">{contactNoError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email Address *</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="dateOfBirth">Date of Birth *</Label>
          <Input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          {dateOfBirthError && <div className="error">{dateOfBirthError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="age">Age *</Label>
          <Input
            type="text"
            name="age"
            id="age"
            value={dateOfBirth ? calculateAge(dateOfBirth) : ""}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="classroom">Classroom *</Label>
          <Input
            type="select"
            name="classroom"
            id="classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)} // Update the classroom state here
          >
            <option value="">Select Classroom</option>
            {classrooms.map((classroomOption) => (
              <option
                key={classroomOption.classroomId}
                value={classroomOption.classroomId.toString()} // Convert to string
              >
                {classroomOption.classroomName}
              </option>
            ))}
          </Input>
          {classroomError && <div className="error">{classroomError}</div>}
        </FormGroup>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            type="submit"
            color={isUpdateMode ? "success" : "primary"}
            style={{ marginBottom: "8px" }}
          >
            {isUpdateMode ? "Update" : "Register"}
          </Button>
          <Button
            outline
            type="button"
            color="danger"
            onClick={handleCancel}
            style={{ marginBottom: "8px" }}
          >
            Cancel
          </Button>
        </div>
      </Form>
      <br></br>
      <Table striped>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
            <th>DoB</th>
          </tr>
        </thead>
        <tbody>
          {allStudents.map((student) => (
            <tr key={student.studentID}>
              <td>{student.studentID}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.contactPerson}</td>
              <td>{student.contactNo}</td>
              <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
              <td>
                <Button color="info" onClick={() => handleUpdate(student)}>
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    Swal.fire({
                      title: "Delete Student?",
                      text: "Are you sure you want to delete this student?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(student.studentID);
                      }
                    });
                  }}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentRegistration;
