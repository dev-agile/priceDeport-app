import { STORAGE_KEY } from "@/lib/constants"

export const UI_TEXT = {
  HELPER_TEXT: "We have send you one time password on",
  DEFAULT_EMAIL_PLACEHOLDER: "example123@gmail.com",
  SUBMIT_BUTTON: "SUBMIT",
} as const

export const ERROR_MESSAGES = {
  INVALID_OTP: "Please enter a valid 4-digit OTP",
  VERIFICATION_FAILED: "OTP verification failed",
} as const

export const STORAGE_KEYS = {
  PREMIUM_USER: "premuimUser",
  USER_INFO: STORAGE_KEY.USER_INFO,
} as const

export const CONSOLE_MESSAGES = {
  EMAIL_LOG: "EmailVerification email: ",
  UPDATED_OTP_LOG: ";;updatedOtp",
  SUCCESS_LOG: "emailVerification Success data",
  ERROR_LOG: "errorOTPVerification",
  STORAGE_ERROR: "Error storing user info:",
} as const

export const OTP_CONFIG = {
  OTP_LENGTH: 4,
  OTP_ARRAY_SIZE: 4,
} as const

export const USER_ROLE = {
  RETAILER: "retailer",
} as const
