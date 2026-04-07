import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AuthCard from "../components/AuthCard";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState([]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await axios.post('http://localhost:8000/api/register', formData);
            const successMsg = res.data.message
            Swal.fire({
                icon: "success",
                title: "Success Registration",
                text: successMsg,
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/login");
        } catch (error) {
            if(error.response && error.response.status === 422){
                setErrors(error.response.data?.errors);
            } else{
                const errorMsg = error.response?.data?.message || "Internal server error";
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: errorMsg,
                  timer: 2000,
                  showConfirmButton: false,
                });
            }
        }

    }
     
  return (
    <AuthCard title="RegisterForm">
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            isInvalid={!!errors?.name}
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.name?.[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            isInvalid={!!errors?.email}
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.email?.[0]}
          </Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">
            {errors.password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Confirmation Password</Form.Label>
          <Form.Control
            isInvalid={!!errors?.password_confirmation}
            name="password_confirmation"
            type="password"
            placeholder="Enter your confirm password"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.password_confirmation?.[0]}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Button variant="primary" className="w-100" type="submit">
          Register
        </Button>
      </Form>
    </AuthCard>
  );
};

export default RegisterPage;
