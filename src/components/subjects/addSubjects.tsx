import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";
import { Subject } from "../../interfaces/subjectInterface";
import Swal from "sweetalert2";

const SubjectRegistration: React.FC = () => {
  // State variables to store subject details and error messages
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [subjectNameError, setSubjectNameError] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/api/subject");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Function to validate the form before submission
  const validateForm = () => {
    let isValid = true;

    // Validate Subject Name
    if (!subjectName.trim()) {
      setSubjectNameError("Subject Name is required");
      isValid = false;
    } else {
      setSubjectNameError("");
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Dispatch an acyion f needed to add subject to redux store
      const newSubject: Subject = {
        subjectName,
        subjectId: 0,
        allocations: [],
      };
      try {
        // send data to the api
        const response = await api.post("/api/Subject", newSubject);

        // Response from the api
        console.log("Subject added successfully:", response.data);

        // Show a success SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Subject added successfully!",
        });

        fetchSubjects();

        setSubjectName("");

        setSubjectNameError("");
      } catch (error) {
        console.error("Error adding subjects:", error);
      }
    }
  };

  return (
    <div style={{ paddingTop:40, paddingBottom:40 }}>
      <h2>Subject Registration</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="subjectName">Subject Name *</Label>
          <Input
            type="text"
            name="subjectName"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          {subjectNameError && <div className="error">{subjectNameError}</div>}
        </FormGroup>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button type="submit" color="primary" style={{ marginBottom: "8px" }}>
            Add Classroom
          </Button>
        </div>
      </Form>
      <br></br>
      <Table striped>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectId}>
              <td>{subject.subjectId}</td>
              <td>{subject.subjectName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubjectRegistration;
