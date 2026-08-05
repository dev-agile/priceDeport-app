export const SALES_GRAPH_KEYS = ["product", "sales-graph"] as const

export const SALES_GRAPH_ENDPOINTS = {
  GET_SALES_GRAPH: (retailerId: string, productId: string, wholeSellerId: string) =>
    `retailer/${retailerId}/v1/product/${productId}/${wholeSellerId}`,
} as const
