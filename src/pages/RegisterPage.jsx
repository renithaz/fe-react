import React from "react";
import { Form, Button } from "react-bootstrap";
import AuthCard from "../components/AuthCard";

const RegisterPage = () => {
  return (
    <AuthCard title="RegisterForm">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your mail"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Confirmation Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your confirm password"
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" className="w-100" type="submit">
          Login
        </Button>
      </Form>
    </AuthCard>
  );
};

export default RegisterPage;
