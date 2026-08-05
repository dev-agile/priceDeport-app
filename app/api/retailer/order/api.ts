import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import { ORDER_ENDPOINTS } from "./constants"
import type {
  CartResponse,
  GetCartParams,
  PlaceOrderParams,
  PlaceOrderResponse,
  UpdateCartItemRequest,
  UpdateCartItemResponse,
} from "./types"

export const getCart = (params: GetCartParams) => {
  const url = `${getApiUrl()}/${ORDER_ENDPOINTS.CART(params.retailerId)}`
  return api.get<CartResponse>(url)
}

export const updateCartItem = (params: UpdateCartItemRequest) => {
  const url = `${getApiUrl()}/${ORDER_ENDPOINTS.CART(params.retailerId)}`
  return api.post<UpdateCartItemResponse>(url, params.data)
}

export const placeOrder = (params: PlaceOrderParams) => {
  const url = `${getApiUrl()}/${ORDER_ENDPOINTS.PLACE_ORDER(params.retailerId)}`
  return api.get<PlaceOrderResponse>(url)
}
