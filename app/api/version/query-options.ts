import { queryOptions } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getApplicationVersionApi } from "./api"

export const queryKeys = createQueryKeys(["version"], {
  getApplicationVersion: () => ({
    key: [],
    sub: {
      request: () => ({
        key: ["application"],
      }),
    },
  }),
})

export const getApplicationVersionQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.getApplicationVersion().sub.request().key,
    async queryFn() {
      const { data } = await getApplicationVersionApi()
      return data
    },
  })
}
