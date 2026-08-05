import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getSalesGraph } from "./api"
import { SALES_GRAPH_KEYS } from "./constants"
import type { GetSalesGraphParams } from "./types"

// Sales Graph Query Keys
export const salesGraphQueryKeys = createQueryKeys([...SALES_GRAPH_KEYS], {
  getSalesGraph: (params: GetSalesGraphParams) => ({
    key: [params.retailerId, params.productId, params.wholeSellerId],
    sub: {},
  }),
})

export const getSalesGraphQueryOptions = (params: GetSalesGraphParams) => {
  return queryOptions({
    queryKey: salesGraphQueryKeys.getSalesGraph(params).key,
    async queryFn() {
      const response = await getSalesGraph(params)
      return response.data
    },
    enabled: !!params.retailerId && !!params.productId && !!params.wholeSellerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}

export function useSalesGraphQuery(params: GetSalesGraphParams) {
  const query = useQuery(getSalesGraphQueryOptions(params))

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}
