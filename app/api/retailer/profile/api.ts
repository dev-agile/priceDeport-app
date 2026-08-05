import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { retailerPaths, staticPaths } from "@/lib/paths"

import type { UpdateProfileRequest, UpdateProfileResponse } from "./types"
import type { GetStaticPeerGroupsResponse } from "./types"

export function putUpdateProfile({ retailerId, data }: UpdateProfileRequest) {
  const url = `${getApiUrl()}${retailerPaths.updateProfile(retailerId)}`
  return api.put<UpdateProfileResponse>(url, data)
}

export function getStaticPeerGroups() {
  const url = `${getApiUrl()}${staticPaths.getPeerGroups()}`
  return api.get<GetStaticPeerGroupsResponse>(url)
}
