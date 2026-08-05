import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getCart, placeOrder, updateCartItem } from "./api"
import { ORDER_KEYS } from "./constants"
import type { GetCartParams, PlaceOrderParams, UpdateCartItemRequest } from "./types"

// Query Keys
export const orderQueryKeys = createQueryKeys([...ORDER_KEYS], {
  cart: (params: GetCartParams) => ({
    key: ["cart", params.retailerId],
    sub: {},
  }),
  placeOrder: (params: PlaceOrderParams) => ({
    key: ["place-order", params.retailerId],
    sub: {},
  }),
})

// Get Cart Query Options
export const getCartQueryOptions = (params: GetCartParams, options?: { enabled?: boolean }) => {
  return queryOptions({
    queryKey: orderQueryKeys.cart(params).key,
    async queryFn() {
      const response = await getCart(params)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 0, // Always fetch fresh cart data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

export function useCartQuery(params: GetCartParams, options?: { enabled?: boolean }) {
  const query = useQuery(getCartQueryOptions(params, options))

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

// Update Cart Item Mutation
export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateCartItemRequest) => updateCartItem(params),
    onSuccess: (response, variables) => {
      // Invalidate cart query to refetch
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.cart({ retailerId: variables.retailerId }).key,
      })
    },
  })
}

// Place Order Mutation
export function usePlaceOrderMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: PlaceOrderParams) => placeOrder(params),
    onSuccess: (response, variables) => {
      // Invalidate cart and product queries
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.cart({ retailerId: variables.retailerId }).key,
      })
      queryClient.invalidateQueries({
        queryKey: ["product"],
      })
    },
  })
}
