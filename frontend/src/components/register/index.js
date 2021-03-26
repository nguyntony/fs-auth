import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Name from "./Name";
import Email from "./Email";
import Password from "./Password";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export default function Register() {
  const [validated, setValidated] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // const resp = await axios.post("/register");
    // tomorrow I need to connect this with the backend to check for the email and ensure that it is unique
    setValidated(true);
    console.log(data);
  };

  const formProps = {
    validated,
    onSubmit: handleSubmit(onSubmit),
  };

  return (
    <div>
      <Container id="formContainer">
        <h2>Create your account</h2>
        <Form noValidate {...formProps}>
          <Name register={register} errors={errors} />
          <Email register={register} errors={errors} />
          <Password register={register} errors={errors} />
          <Button />
        </Form>

        <p className="text-center">
          Already a user? <a href="#">Login to your account.</a>
        </p>
      </Container>
    </div>
  );
}
