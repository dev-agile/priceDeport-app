import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { retailerPaths } from "@/lib/paths"

import type { DeleteAccountResponse } from "./types"

export function deleteAccount(retailerId: string) {
  const url = `${getApiUrl()}${retailerPaths.accountDelete(retailerId)}`
  return api.delete<DeleteAccountResponse>(url)
}
