export interface IFormInput {
  email: string
  password: string
}
export type IShowModalType = {
  resetPassword: boolean
  otpValidation: boolean
  resetCredentials: boolean
  verify?: boolean
}
