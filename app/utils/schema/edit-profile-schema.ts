import * as yup from "yup"

const phoneRegex = /^[0-9+\-\s()]{10,}$/

export const editProfileSchema = yup.object().shape({
  storeName: yup.string().required("Store name is required"),
  name: yup.string().required("Name is required"),
  number: yup
    .string()
    .required("Phone is required")
    .matches(phoneRegex, "Please enter a valid phone number")
    .min(10, "Phone must be at least 10 characters"),
  location: yup.string().required("Location is required"),
  city: yup.string().required("City is required"),
  zipCode: yup
    .string()
    .required("Zip code is required")
    .matches(/^[0-9]+$/, "Zip code must be numeric only"),
  peerGroup: yup.string().required("Peer group is required"),
  state: yup.string().optional(),
  email: yup.string().optional(),
  password: yup.string().optional(),
}) as yup.ObjectSchema<{
  storeName: string
  name: string
  number: string
  location: string
  city: string
  zipCode: string
  peerGroup: string
  state?: string
  email?: string
  password?: string
}>
