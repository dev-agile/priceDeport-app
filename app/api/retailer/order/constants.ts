export const ORDER_KEYS = ["order"] as const

export const ORDER_ENDPOINTS = {
  CART: (retailerId: string) => `retailer/${retailerId}/v1/cart`,
  PLACE_ORDER: (retailerId: string) => `retailer/${retailerId}/v1/place-order`,
} as const
