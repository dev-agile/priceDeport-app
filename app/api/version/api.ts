import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { staticPaths } from "@/lib/paths"

import type { ApiVersionResponse } from "./types"

export const getApplicationVersionApi = () => {
  return api.get<ApiVersionResponse>(`${getApiUrl()}/${staticPaths.getAppVersion()}`)
}
