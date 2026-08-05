import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getOrders } from "./api"
import { ORDERS_KEYS } from "./constants"
import type { GetOrdersParams } from "./types"

// Query Keys
export const ordersQueryKeys = createQueryKeys([...ORDERS_KEYS], {
  getOrders: (params: GetOrdersParams) => ({
    key: ["get-orders", params.retailerId],
    sub: {},
  }),
})

// Get Orders Query Options
export const getOrdersQueryOptions = (params: GetOrdersParams, options?: { enabled?: boolean }) => {
  // Ensure retailerId is valid before enabling query
  const isValidParams = Boolean(params.retailerId && params.retailerId.trim() !== "")
  const isEnabled = Boolean((options?.enabled ?? true) && isValidParams)

  return queryOptions({
    queryKey: ordersQueryKeys.getOrders(params).key,
    async queryFn() {
      if (!isValidParams) {
        throw new Error("Invalid retailerId")
      }
      const response = await getOrders(params)
      return response.data
    },
    enabled: isEnabled,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount, error: any) => {
      // Don't retry on network errors or 4xx errors
      if (
        error?.message === "Network Error" ||
        (error?.response?.status >= 400 && error?.response?.status < 500)
      ) {
        return false
      }
      return failureCount < 2
    },
  })
}

// Get Orders Query Hook
export const useGetOrdersQuery = (params: GetOrdersParams, options?: { enabled?: boolean }) => {
  return useQuery(getOrdersQueryOptions(params, options))
}
