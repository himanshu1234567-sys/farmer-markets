import React from "react";
import { Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const ContactInfo = ({ handleChange }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Contact Info</h2>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="Email"
          onChange={handleChange("email")}
          name="email"
        />
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="Phone Number"
          onChange={handleChange("phone_number")}
          name="phone_number"
        />
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <FloatingLabel controlId="floatingTextarea2" label="Address">
            <Form.Control
            as="textarea"
            placeholder="adress"
            style={{ height: '100px' }}
            name='address'
          onChange={handleChange("address")}

            />
        </FloatingLabel>
      </Form.Group>
     
    </div>
  );
};

export default ContactInfo;
