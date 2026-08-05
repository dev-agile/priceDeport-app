import type { IShowModalType } from "./types"

export const UI_TEXT = {
  SCREEN_TITLE: "Retailer",
  WELCOME_HEADING: "Welcome Back",
  SUBTITLE_TEXT: "Sign in to continue to your account",
  EMAIL_FIELD_TITLE: "Email",
  EMAIL_PLACEHOLDER: "Enter your email",
  PASSWORD_FIELD_TITLE: "Password",
  PASSWORD_PLACEHOLDER: "Enter your password",
  FORGOT_PASSWORD_TEXT: "Forgot Password?",
  LOGIN_BUTTON_TEXT: "LOGIN NOW",
  NO_ACCOUNT_TEXT: "Don't have an account yet?",
  CREATE_ACCOUNT_TEXT: "Create New Account",
  BACK_TO_OPTION_TEXT: "Back to Option screen",
} as const

export const FORM_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
} as const

export const STORAGE_KEYS = {
  PREMIUM_USER: "premuimUser",
  LOGIN_TIME: "loginTime",
  USER_INFO: "userInfo",
  USER_ID: "userId",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const

export const USER_ROLE = {
  RETAILER: "retailer",
} as const

export const ERROR_MESSAGES = {
  LOGIN_FAILED: "Login failed",
  NETWORK_ERROR: "Network Error",
  NETWORK_ERROR_DESCRIPTION: "Please check your internet connection",
  LOGIN_FAILED_GENERIC: "Login Failed",
  PLEASE_TRY_AGAIN: "Please try again",
} as const

export const CONSOLE_MESSAGES = {
  LOGIN_REQUEST_FAILED: "Login request failed:",
  STORAGE_ERROR: "Error storing user details in AsyncStorage:",
  STORAGE_SUCCESS: "User info stored in AsyncStorage successfully",
} as const

export const MODAL_INITIAL_STATE: IShowModalType = {
  resetPassword: false,
  otpValidation: false,
  resetCredentials: false,
  verify: false,
} as const
