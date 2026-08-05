export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponseData {
  accessToken: string
  refreshToken: string
  retailer_id: string
  isSubscribed: boolean
  peerGroup: string
}

export interface LoginApiResponse {
  status: boolean
  message: string
  data: LoginResponseData
}

export interface LoginErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  status?: string
}

export interface RegisterRequest {
  name: string
  storeName: string
  email: string
  password: string
  number: string
  location: string
  city: string
  state: string
  zipCode: string
  peerGroup: string
  agreement: boolean
}

export interface RegisterResponse {
  status: boolean
  message: string
  data?: any
}

export interface RegisterErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  message?: string
  response?: {
    data?: {
      message?: string
    }
  }
}

export interface OTPVerifyRequest {
  email: string
  otp: string // 4-digit string
}

export interface OTPVerifyResponseData {
  accessToken: string
  retailer_id: string
  refreshToken: string
  isSubscribed: boolean
  peerGroup: string
}

export interface OTPVerifyResponse {
  message: string
  data: OTPVerifyResponseData
}

export interface OTPVerifyErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  message?: string
  response?: {
    data?: {
      message?: string
    }
  }
}

export interface WhoAmIRequest {
  userId?: string
}

export interface WhoAmIResponseData {
  isSubscribed: boolean
  peerGroup: string
  name: string
  email: string
  location: string
  number: string
  storeName?: string
  city?: string
  zipCode?: string
  _id?: string
  createdAt?: string
  role?: string
}

export interface WhoAmIResponse {
  data: WhoAmIResponseData
  message?: string
  status?: boolean
}

export interface WhoAmIErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  message?: string
  status?: boolean
  response?: {
    data?: {
      message?: string
    }
  }
}

export interface ResetPasswordRequestPayload {
  email: string
  role: string
}

export interface ResetPasswordRequestResponse {
  message?: string
}

export interface ResetPasswordVerifyPayload {
  email: string
  otp: string
}

export interface ResetPasswordVerifyResponse {
  message?: string
  data?: { resetPasswordToken?: string }
}

export interface ResetPasswordCompletePayload {
  password: string
  resetPasswordToken: string
}

export interface ResetPasswordCompleteResponse {
  message?: string
}
