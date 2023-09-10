import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api"; // Import the Axios instance from api.ts
import Swal from "sweetalert2";
import { Classroom } from "../../interfaces/classroomInterface";

const Classrooms: React.FC = () => {
  const dispatch = useDispatch();

  // State variables to store classroom details and error messages
  const [classroomName, setClassroomName] = useState("");

  const [classroomNameError, setClassroomNameError] = useState("");

  const [allClassrooms, setAllClassrooms] = useState<Classroom[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  const fetchAllClassrooms = async () => {
    try {
      const response = await api.get("/api/classrooms");
      setAllClassrooms(response.data);
    } catch (error) {
      console.error("Error fetching all classrooms:", error);
    }
  };

  // Function to validate the form before submission
  const validateForm = () => {
    let isValid = true;

    // Validate Classroom Name
    if (!classroomName.trim()) {
      setClassroomNameError("Classroom Name is required");
      isValid = false;
    } else {
      setClassroomNameError("");
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Dispatch an action to add classroom data to the Redux store
      const newClassroom: Classroom = {
        classroomName,
        classroomId: 0,
      };
      try {
        // Send the data to the API
        const response = await api.post("/api/classrooms", newClassroom);

        // Handle the response from the API (if needed)
        console.log("Classroom added successfully:", response.data);

        // Show a success SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Classroom added successfully!",
        });

        fetchAllClassrooms();

        // Clear the form after successful submission (if needed)
        setClassroomName("");

        setClassroomNameError("");
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Class already exists',
        });
        console.error("Error adding classroom:", error);
      }
    }
  };

  const handleDelete = async (classroomId: number) => {
    try {
      const response = await api.delete(`/api/classrooms/${classroomId}`);
      if (response.status === 200 || 202) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Classroom deleted successfully!',
        });
        fetchAllClassrooms();
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'warning',
        title: 'Failed',
        text: 'Cant delete classroom with student',
      });
      console.error('Error deleting classroom:', error);
      setErrorMessage(error);
    }
  };

  return (
    <div style={{ paddingTop:40, paddingBottom:40 }}>
      <h2>Classrooms</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="classroomName">Classroom Name *</Label>
          <Input
            type="text"
            name="classroomName"
            id="classroomName"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
          />
          {classroomNameError && (
            <div className="error">{classroomNameError}</div>
          )}
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
            <th>Classroom ID</th>
            <th>Classroom Name</th>
          </tr>
        </thead>
        <tbody>
          {allClassrooms.map((classroom) => (
            <tr key={classroom.classroomId}>
              <td>{classroom.classroomId}</td>
              <td>{classroom.classroomName}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => {
                    Swal.fire({
                      title: "Delete Classroom?",
                      text: "Are you sure you want to delete this classroom?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(classroom.classroomId);
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
      {/* {errorMessage && <div className="error">{errorMessage}</div>} */}
    </div>
  );
};

export default Classrooms;
