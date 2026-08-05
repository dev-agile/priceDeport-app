import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getWhoAmI } from "./api"
import { WHOAMI_KEYS } from "./constants"
import type { WhoAmIRequest } from "./types"

export const queryKeys = createQueryKeys([...WHOAMI_KEYS], {
  whoami: () => ({
    key: [],
    sub: {
      byRequest: (request?: WhoAmIRequest) => ({
        key: request?.userId ? [request.userId] : [],
      }),
    },
  }),
})

export const getWhoAmIQueryOptions = (request?: WhoAmIRequest) => {
  return queryOptions({
    queryKey: queryKeys.whoami().sub.byRequest(request).key,
    async queryFn() {
      const response = await getWhoAmI(request)
      return response.data
    },
  })
}

export function useWhoAmIQuery(request?: WhoAmIRequest) {
  const query = useQuery(getWhoAmIQueryOptions(request))

  // Map status to match RTK Query behavior
  const status = query.isPending ? "pending" : query.isError ? "rejected" : "fulfilled"

  return {
    data: query.data,
    error: query.error,
    status,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}
