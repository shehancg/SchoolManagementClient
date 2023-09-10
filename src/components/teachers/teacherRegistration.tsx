import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";
import { Teacher } from "../../interfaces/teacherInterface";
import Swal from "sweetalert2";

const TeacherRegistration: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [firstNameError, setFirstNameError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get("/api/teacher");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      isValid = false;
    } else {
      setFirstNameError("");
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

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const teacherData = {
        teacherID: selectedTeacher?.teacherID,
        firstName,
        lastName,
        contactNo,
        emailAddress,
      };
      console.log(teacherData);
      try {
        if (isUpdateMode && selectedTeacher) {
          // Update teacher
          const response = await api.put(`/api/teacher/${selectedTeacher.teacherID}`,teacherData
          );
          console.log("Teacher updated:", response.data);
        } else {
          // Add new teacher
          const response = await api.post("/api/teacher", teacherData);
          console.log("Teacher added:", response.data);
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: isUpdateMode
            ? "Teacher updated successfully!"
            : "Teacher registered successfully!",
        });

        fetchTeachers();

        setFirstName("");
        setLastName("");
        setContactNo("");
        setEmail("");
        setIsUpdateMode(false);
        setSelectedTeacher(null);

        setFirstNameError("");
        setContactNoError("");
        setEmailError("");
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: isUpdateMode
            ? "Error updating teacher"
            : "A teacher with the same ContactNo already exists.",
        });
      }
    }
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setContactNo("");
    setEmail("");
    setIsUpdateMode(false);
    setSelectedTeacher(null);

    setFirstNameError("");
    setContactNoError("");
    setEmailError("");
  };

  const handleEdit = (teacher: Teacher) => {
    setIsUpdateMode(true);
    setSelectedTeacher(teacher);
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setContactNo(teacher.contactNo);
    setEmail(teacher.emailAddress);
  };

  const handleDelete = async (teacherID: number) => {
    try {
      await api.delete(`/api/teacher/${teacherID}`);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Teacher deleted successfully!",
      });
      fetchTeachers();
    } catch (error: any) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h2 style={{ textAlign: "center", paddingBottom: 10 }}>
        Teacher Registration
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
      <br />
      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact No</th>
            <th>Email Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherID}>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.contactNo}</td>
              <td>{teacher.emailAddress}</td>
              <td>
                <Button
                  color="info"
                  onClick={() => handleEdit(teacher)}
                  style={{ marginRight: "8px" }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    Swal.fire({
                      title: "Delete Teacher?",
                      text: "Are you sure you want to delete this teacher?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(teacher.teacherID);
                      }
                    });
                  }}
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

export default TeacherRegistration;
