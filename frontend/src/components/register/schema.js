import * as yup from "yup";

export const schema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name."),
  email: yup
    .string()
    .email("Please enter a valid email: example@email.com")
    .required("Please enter your email."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match.")
    .required("Please confirm your password."),
});
