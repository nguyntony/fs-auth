import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Email({ register, errors }) {
  return (
    <>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            ref={register}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </InputGroup>

        <Form.Text muted>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    </>
  );
}
