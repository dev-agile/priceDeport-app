import * as yup from "yup"

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email or phone number")
    .matches(
      /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\d{10})$/i,
      "Please enter a valid email or 10-digit phone number",
    ),
}) as yup.ObjectSchema<{ email: string }>

export const resetPasswordCompleteSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Please enter a new password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
}) as yup.ObjectSchema<{ newPassword: string; confirmPassword: string }>
