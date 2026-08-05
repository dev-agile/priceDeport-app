export interface DeleteAccountResponse {
  status: boolean
  message: string
}

export interface DeleteAccountErrorResponse {
  status?: boolean
  message?: string
  error?: {
    data?: {
      message?: string
    }
  }
  response?: {
    data?: {
      message?: string
    }
  }
}
