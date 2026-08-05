import { DefaultOptions } from "@tanstack/react-query"

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60, // 1 minute
    refetchOnReconnect: true,
  },
  mutations: {
    retry: 1,
  },
} satisfies DefaultOptions
