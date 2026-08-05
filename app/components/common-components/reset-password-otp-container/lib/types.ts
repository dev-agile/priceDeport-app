export interface ResetPasswordOTPScreenProps {
  prepareProps: {
    email: string
    role: string
  }
  setIsShowSetNewPasswordScreen: (value: boolean) => void
  setIsShowResetOtpContainer: (value: boolean) => void
}

export interface IsOtpVerification {
  email: string
  otp: string
}
