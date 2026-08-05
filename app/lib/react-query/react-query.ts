// Re-export for backward compatibility during migration
import { useMemo, useCallback, useRef } from "react"
import type { UseMutationOptions } from "@tanstack/react-query"

export { createQueryKeys } from "@/lib/react-query/keys"
export { queryClient } from "@/lib/react-query/queryClient"
export { queryConfig } from "@/lib/react-query/config"

// Keep existing utility types and functions
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<FnType>
>

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> =
  UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, Parameters<MutationFnType>[0]>

export function useInfiniteQueryData<TData, Response>({
  query,
  extractQueryData,
}: {
  query: {
    data?: Response
    isFetchingNextPage: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
  }
  extractQueryData: (data?: Response) => {
    data: TData[]
    total: number
  }
}) {
  const extractQueryDataRef = useRef(extractQueryData)
  extractQueryDataRef.current = extractQueryData

  const { data, total } = useMemo(() => {
    return extractQueryDataRef.current(query.data)
  }, [query.data])

  const fetchNextPage = useCallback(() => {
    if (query.isFetchingNextPage || !query.hasNextPage) return
    query.fetchNextPage()
  }, [query])

  return { data, total, fetchNextPage }
}
