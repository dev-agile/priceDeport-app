import { useMutation } from "@tanstack/react-query"

import { deleteAccount } from "./api"
import { ACCOUNT_DELETE_KEYS } from "./constants"
import type { DeleteAccountErrorResponse } from "./types"

export function useDeleteAccountMutation() {
  return useMutation({
    mutationKey: [...ACCOUNT_DELETE_KEYS.root()],
    mutationFn: (retailerId: string) => deleteAccount(retailerId),
    retry: 1,
    retryDelay: 1000,
  })
}

export type { DeleteAccountErrorResponse }
