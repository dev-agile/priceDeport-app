import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getFavourites } from "./api"
import { FAVOURITES_KEYS } from "./constants"

export const favouritesQueryKeys = createQueryKeys([...FAVOURITES_KEYS], {
  list: (retailerId: string) => ({ key: [retailerId] }),
})

export function getFavouritesQueryOptions(retailerId: string) {
  return queryOptions({
    queryKey: favouritesQueryKeys.list(retailerId).key,
    queryFn: async () => {
      const response = await getFavourites(retailerId)
      return response.data
    },
    enabled: !!retailerId,
  })
}

export function useGetFavouritesQuery(retailerId: string) {
  const query = useQuery(getFavouritesQueryOptions(retailerId))
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
