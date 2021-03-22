import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Password({ register, errors }) {
  return (
    <>
      {/* PASSWORD FIELD */}
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            ref={register}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* CONFIRM PASSWORD FIELD */}
      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            ref={register}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  );
}
