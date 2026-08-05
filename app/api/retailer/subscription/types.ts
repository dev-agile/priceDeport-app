// Subscription Plan Types
export interface SubscriptionPlan {
  id: string
  planId: string
  name: string
  amount: number
  interval: string
  currency: string
}

export interface GetSubscriptionPlansResponse {
  data: SubscriptionPlan[]
  message?: string
  status?: boolean
}

// Create Session Types
export interface CreateSessionRequest {
  planId: string
}

export interface CreateSessionResponse {
  session: {
    url: string
    id: string
  }
  message?: string
  status?: boolean
}

// Payment Success Types
export interface PaymentSuccessRequest {
  sessionId: string
}

export interface PaymentSuccessResponse {
  message: string
  status?: boolean
}
