import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getStaticPeerGroups } from "./api"
import { STATIC_PEERS_KEYS } from "./constants"

export const staticPeerKeys = createQueryKeys([...STATIC_PEERS_KEYS], {
  list: () => ({ key: [] }),
})

export function getStaticPeerGroupsQueryOptions() {
  return queryOptions({
    queryKey: staticPeerKeys.list().key,
    queryFn: async () => {
      const response = await getStaticPeerGroups()
      return response.data
    },
  })
}

export function useGetStaticPeerGroupsQuery() {
  const query = useQuery(getStaticPeerGroupsQueryOptions())
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
