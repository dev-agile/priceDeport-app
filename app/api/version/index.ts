import { useQuery } from "@tanstack/react-query"

import { getApplicationVersionQueryOptions } from "./query-options"

// Re-export query options
export { getApplicationVersionQueryOptions }

export function useGetApplicationVersion() {
  const query = useQuery(getApplicationVersionQueryOptions())

  return {
    data: query.data,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
