import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthCard from "../components/AuthCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await axios.post('http://localhost:8000/api/login', formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data));

            Swal.fire({
                icon: "success",
                title: "Login Success",
                text: res.data?.message || "welcome",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/dashboard");
        } catch (error) {
            if(error.response && error.response.status === 422){
                setErrors(error.response.data?.errors);
            } else if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "warning",
                    title: "Login failed",
                    text: error.response.data?.message || "Please check your email of password",
                    
                });
            }
        }
  };

  return (
    <AuthCard title="LoginForm">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            isInvalid={!!errors?.email}
            name="email"
            type="email"
            placeholder="Enter your mail"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            isInvalid={!!errors?.password}
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" className="w-100" type="submit">
          Login
        </Button>
      </Form>
    </AuthCard>
  );
};

export default LoginPage;
