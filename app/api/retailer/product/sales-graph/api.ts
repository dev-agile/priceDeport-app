import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import { SALES_GRAPH_ENDPOINTS } from "./constants"
import type { GetSalesGraphParams, SalesGraphResponse } from "./types"

export const getSalesGraph = (params: GetSalesGraphParams) => {
  const url = `${getApiUrl()}/${SALES_GRAPH_ENDPOINTS.GET_SALES_GRAPH(
    params.retailerId,
    params.productId,
    params.wholeSellerId,
  )}`
  return api.get<SalesGraphResponse>(url)
}
