export const SUBSCRIPTION_ENDPOINTS = {
  GET_PLANS: (retailerId: string) => `retailer/${retailerId}/v1/subscribe-price`,
  CREATE_SESSION: (retailerId: string) => `retailer/${retailerId}/v1/create-session`,
  PAYMENT_SUCCESS: (retailerId: string) => `retailer/${retailerId}/v1/payment-success`,
} as const

export const SUBSCRIPTION_KEYS = ["subscription"] as const
