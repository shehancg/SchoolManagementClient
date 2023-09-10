import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import api from "../../api";
import CustomNavbar from "../../components/navbar/navbar";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        username: username,
        password: password,
      });

      if (response.data && response.data.token) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Granted",
          });
  
        // Redirect to protected route
        navigate("/home");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <><CustomNavbar></CustomNavbar><Container style={{ paddingTop:40, paddingBottom:40 }}>
          <Row className="justify-content-center">
              <Col md={6}>
                  <h2>Login</h2>
                  <Form>
                      <FormGroup>
                          <Label for="username">Username:</Label>
                          <Input
                              type="text"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)} />
                      </FormGroup>
                      <FormGroup>
                          <Label for="password">Password:</Label>
                          <Input
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                      </FormGroup>
                      <Button color="primary" onClick={handleLogin}>
                          Login
                      </Button>
                  </Form>
                  <br></br>
                  {error && <Alert color="danger">{error}</Alert>}
              </Col>
          </Row>
      </Container></>
  );
};

export default Login;
