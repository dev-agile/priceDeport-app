import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter a email or phone number")
    .matches(
      /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\d{10})$/i,
      "Please enter a valid email or phone number",
    ),
  password: yup
    .string()
    .required("Please enter a valid password")
    .min(6, "Password must be at least 6 character"),
}) as never
