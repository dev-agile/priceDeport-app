import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import { ORDERS_ENDPOINTS } from "./constants"
import type { GetOrdersParams, OrdersResponse } from "./types"

export const getOrders = (params: GetOrdersParams) => {
  if (!params.retailerId || params.retailerId.trim() === "") {
    throw new Error("retailerId is required")
  }
  const url = `${getApiUrl()}/${ORDERS_ENDPOINTS.GET_ORDERS(params.retailerId)}`
  return api.get<OrdersResponse>(url)
}
