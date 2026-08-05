import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys as authQueryKeys } from "@/api/retailer/auth/query-options"

import { putUpdateProfile } from "./api"
import { PROFILE_KEYS } from "./constants"
import type { UpdateProfileRequest, UpdateProfileResponse } from "./types"

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: [...PROFILE_KEYS, "update"],
    mutationFn: async (request: UpdateProfileRequest) => {
      const response = await putUpdateProfile(request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.whoami().key })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data as UpdateProfileResponse | undefined,
    reset: mutation.reset,
  }
}
