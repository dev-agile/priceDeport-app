import * as yup from "yup"

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const WholeSellerSignupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter a email ")
    .matches(
      /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\d{10})$/i,
      "Please enter a valid email ",
    )
    .test("email-format", "Please enter a valid email address", function (value) {
      if (!value) return true // Let required handle empty values

      // If it's a phone number (10 digits), allow it
      if (/^\d{10}$/.test(value)) return true

      // For email, check if it has a proper domain structure
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if (!emailRegex.test(value)) return false

      // Extract domain part
      const domain = value.split("@")[1]

      // Check if domain has at least 2 parts (e.g., gmail.com, not just gmail)
      const domainParts = domain.split(".")
      if (domainParts.length < 2) return false

      // Check if the last part (TLD) is at least 2 characters
      const tld = domainParts[domainParts.length - 1]
      if (tld.length < 2) return false

      // Check if domain name is at least 2 characters
      const domainName = domainParts[0]
      if (domainName.length < 2) return false

      return true
    }),
  password: yup
    .string()
    .required("Please enter a valid password")
    .min(6, "Password must be at least 6 character"),
  name: yup.string().required("Please enter a name"),
  location: yup.string().required("Please enter your location"),
  number: yup
    .string()
    .required("Please enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, " Please enter a valid phone number with 10 digits"),
  // storeName: yup.string().required('Please enter store name'),
  // permit: yup.string().required('Please upload permit'),
  city: yup.string().required("City is required"),
  zipCode: yup
    .string()
    .matches(/^[0-9]+$/, "Zip code must be numeric")
    .required("Zip code is required"),
}) as never

export const retailerSignupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter a email ")
    .matches(
      /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\d{10})$/i,
      "Please enter a valid email ",
    )
    .test("email-format", "Please enter a valid email address", function (value) {
      if (!value) return true // Let required handle empty values

      // If it's a phone number (10 digits), allow it
      if (/^\d{10}$/.test(value)) return true

      // For email, check if it has a proper domain structure
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if (!emailRegex.test(value)) return false

      // Extract domain part
      const domain = value.split("@")[1]

      // Check if domain has at least 2 parts (e.g., gmail.com, not just gmail)
      const domainParts = domain.split(".")
      if (domainParts.length < 2) return false

      // Check if the last part (TLD) is at least 2 characters
      const tld = domainParts[domainParts.length - 1]
      if (tld.length < 2) return false

      // Check if domain name is at least 2 characters
      const domainName = domainParts[0]
      if (domainName.length < 2) return false

      return true
    }),
  password: yup
    .string()
    .required("Please enter a valid password")
    .min(6, "Password must be at least 6 character"),
  name: yup.string().required("Please enter a name"),
  location: yup.string().required("Please enter your location"),
  number: yup
    .string()
    .required("Please enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, " Please enter a valid phone number with 10 digits"),
  storeName: yup.string().required("Please enter store name"),
  peerGroup: yup.string().required("Please enter Peer Group Name"),
  city: yup
    .string()
    .required("City is required")
    .matches(/^[a-zA-Z\s]+$/, "City can only contain letters"),
  state: yup
    .string()
    .required("Please enter your state")
    .matches(/^[a-zA-Z\s]+$/, "State can only contain letters"),
  zipCode: yup
    .string()
    .matches(/^(\d{5}|\d{9})$/, "Zip code must be 5 or 9 digits")
    .required("Zip code is required"),
}) as never

export const editProfileSchema = yup.object().shape({
  storeName: yup.string().required("Please enter store name"),
  name: yup.string().required("Please enter a name"),
  number: yup
    .string()
    .required("Please enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, " Please enter a valid phone number with 10 digits"),
  location: yup.string().required("Please enter your location"),
  peerGroup: yup.string().required("Please enter Peer Group Name"),
  city: yup.string().required("City is required"),
  zipCode: yup
    .string()
    .matches(/^[0-9]+$/, "Zip code must be numeric")
    .required("Zip code is required"),
}) as never

export const WholeSalereditProfileSchema = yup.object().shape({
  name: yup.string().required("Please enter a name"),
  number: yup
    .string()
    .required("Please enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, " Please enter a valid phone number with 10 digits"),
  location: yup.string().required("Please enter your location"),
}) as never

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

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter a email ")
    .matches(
      /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\d{10})$/i,
      "Please enter a valid email ",
    ),
}) as never
export const passwordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
}) as never
