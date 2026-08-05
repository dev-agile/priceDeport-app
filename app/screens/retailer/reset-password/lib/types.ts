export type ResetPasswordStep = "email" | "otp" | "setPassword"

export interface ResetPasswordEmailForm {
  email: string
}

export interface ResetPasswordCompleteForm {
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordScreenProps {
  role?: string | null
  navigation?: any
}
