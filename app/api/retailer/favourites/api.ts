import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { retailerPaths } from "@/lib/paths"

import type { GetFavouritesResponse } from "./types"

export function getFavourites(retailerId: string) {
  const url = `${getApiUrl()}${retailerPaths.favorites(retailerId)}`
  return api.get<GetFavouritesResponse>(url)
}
