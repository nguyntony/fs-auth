import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Name({ register, errors }) {
  return (
    <>
      <Form.Group controlId="formFullName">
        <Form.Label>Full name</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="fullName"
            ref={register}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  );
}
