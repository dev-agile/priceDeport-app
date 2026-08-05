export const ORDERS_KEYS = ["orders"] as const

export const ORDERS_ENDPOINTS = {
  GET_ORDERS: (retailerId: string) => `retailer/${retailerId}/v1/orders`,
} as const
