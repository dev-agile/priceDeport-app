import { queryOptions, useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { createSession, getSubscriptionPlans, postPaymentSuccess } from "./api"
import { SUBSCRIPTION_KEYS } from "./constants"
import type {
  CreateSessionRequest,
  // CreateSessionResponse,
  // GetSubscriptionPlansResponse,
  PaymentSuccessRequest,
  // PaymentSuccessResponse,
} from "./types"

export const queryKeys = createQueryKeys([...SUBSCRIPTION_KEYS], {
  plans: () => ({
    key: [],
    sub: {
      byRetailerId: (retailerId: string) => ({
        key: [retailerId],
      }),
    },
  }),
})

export const getSubscriptionPlansQueryOptions = (retailerId: string | undefined) =>
  queryOptions({
    queryKey: retailerId
      ? queryKeys.plans().sub.byRetailerId(retailerId).key
      : queryKeys.plans().key,
    queryFn: async () => {
      if (!retailerId) throw new Error("retailerId is required")
      const response = await getSubscriptionPlans(retailerId)
      return response.data
    },
    enabled: !!retailerId,
  })

export function useGetSubscriptionPlansQuery(retailerId: string | undefined) {
  const query = useQuery(getSubscriptionPlansQueryOptions(retailerId))

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

export function useCreateSessionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      retailerId,
      request,
    }: {
      retailerId: string
      request: CreateSessionRequest
    }) => {
      const response = await createSession(retailerId, request)
      return response.data
    },
    onSuccess: () => {
      // Optionally invalidate queries if needed
      queryClient.invalidateQueries({ queryKey: queryKeys.plans().key })
    },
  })
}

export function usePaymentSuccessMutation() {
  return useMutation({
    mutationFn: async ({
      retailerId,
      request,
    }: {
      retailerId: string
      request: PaymentSuccessRequest
    }) => {
      const response = await postPaymentSuccess(retailerId, request)
      return response.data
    },
  })
}
