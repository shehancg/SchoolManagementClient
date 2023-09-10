import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";
import { Teacher } from "../../interfaces/teacherInterface";
import Swal from "sweetalert2";

const TeacherRegistration: React.FC = () => {
  // State variables to store teacher details and error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

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

  // Function to validate the form before submission
  const validateForm = () => {
    let isValid = true;

    // Validate First Name
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

    // Validate Email
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

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Check if the form is valid before submitting
    if (validateForm()) {
      // Perform further actions like saving teacher details to the database
      const teacherData = {
        firstName,
        lastName,
        contactNo,
        emailAddress,
      };
  
      try {
        // Send the teacher data to the API using axios
        const response = await api.post("/api/Teacher", teacherData);
  
        // Handle the API response here if needed
        console.log("Teacher added:", response.data);
  
        // Show a success SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Teacher registered successfully!",
        });
  
        fetchTeachers();
  
        // Clear the form fields after successful submission
        setFirstName("");
        setLastName("");
        setContactNo("");
        setEmail("");
  
        // Clear error messages
        setFirstNameError("");
        setContactNoError("");
        setEmailError("");
      } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "A teacher with the same ContactNo already exists.",
          });
          // Handle other errors
          //console.error("Error adding teacher:", error.response.data);
        
      }
    }
  };
  

  const handleCancel = () => {
    // Clear the form fields
    setFirstName("");
    setLastName("");
    setContactNo("");
    setEmail("");

    // Clear error messages
    setFirstNameError("");
    setFirstNameError("");
    setContactNoError("");
    setEmailError("");
  };

  return (
    <div style={{ paddingTop:40, paddingBottom:40 }}>
      <h2 style={{ textAlign:"center", paddingBottom:10 }}>Teacher Registration</h2>
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
          <Label for="lastName">Last Name</Label>
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
          <Button type="submit" color="primary" style={{ marginBottom: "8px" }}>
            Register
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact No</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherID}>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.contactNo}</td>
              <td>{teacher.emailAddress}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeacherRegistration;
