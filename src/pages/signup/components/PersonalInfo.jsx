import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { AiFillEye } from "react-icons/ai";



const PersonalInfo = ({ handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showConfirmPasswordFn = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const showPasswordFn = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Personal Info</h2>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="Type (admin/user)"
          onChange={handleChange("type")}
          name="type"
        />
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="First Name"
          onChange={handleChange("name")}
          name="name"
        />
      </Form.Group>

      <Form.Group className="w-75 mt-4">
        <InputGroup>
          <Form.Control
            placeholder="password"
            onChange={handleChange("password")}
            name="password"
            type={showPassword ? "text" : "password"}
          ></Form.Control>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={showPasswordFn}
          >
            <AiFillEye />
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <InputGroup>
          <Form.Control
            placeholder="confirm password"
            onChange={handleChange("confirm_password")}
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
          ></Form.Control>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={showConfirmPasswordFn}
          >
            <AiFillEye />
          </Button>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default PersonalInfo;
