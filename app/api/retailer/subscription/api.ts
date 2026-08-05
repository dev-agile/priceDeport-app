import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import { SUBSCRIPTION_ENDPOINTS } from "./constants"
import type {
  CreateSessionRequest,
  CreateSessionResponse,
  GetSubscriptionPlansResponse,
  PaymentSuccessRequest,
  PaymentSuccessResponse,
} from "./types"

export const getSubscriptionPlans = (retailerId: string) => {
  const url = `${getApiUrl()}/${SUBSCRIPTION_ENDPOINTS.GET_PLANS(retailerId)}`
  return api.get<GetSubscriptionPlansResponse>(url)
}

export const createSession = (retailerId: string, request: CreateSessionRequest) => {
  const url = `${getApiUrl()}/${SUBSCRIPTION_ENDPOINTS.CREATE_SESSION(retailerId)}`
  return api.post<CreateSessionResponse>(url, request)
}

export const postPaymentSuccess = (retailerId: string, request: PaymentSuccessRequest) => {
  const url = `${getApiUrl()}/${SUBSCRIPTION_ENDPOINTS.PAYMENT_SUCCESS(retailerId)}`
  return api.post<PaymentSuccessResponse>(url, request)
}
