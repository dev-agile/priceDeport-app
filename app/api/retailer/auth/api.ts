import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { userPaths, resetPasswordPaths } from "@/lib/paths"

import type {
  LoginApiResponse,
  LoginRequest,
  RegisterResponse,
  RegisterRequest,
  OTPVerifyRequest,
  OTPVerifyResponse,
  WhoAmIRequest,
  WhoAmIResponse,
  ResetPasswordRequestPayload,
  ResetPasswordRequestResponse,
  ResetPasswordVerifyPayload,
  ResetPasswordVerifyResponse,
  ResetPasswordCompletePayload,
  ResetPasswordCompleteResponse,
} from "./types"

export const postLoginData = (request: LoginRequest) => {
  return api.post<LoginApiResponse>(`${getApiUrl()}/${userPaths.login()}`, request)
}

export function postRegisterData(request: RegisterRequest) {
  const url = `${getApiUrl()}/${userPaths.register()}`
  return api.post<RegisterResponse>(url, request)
}

export function postOtpVerify(request: OTPVerifyRequest) {
  const url = `${getApiUrl()}/${userPaths.verify()}`
  return api.post<OTPVerifyResponse>(url, request)
}

export const getWhoAmI = (request?: WhoAmIRequest) => {
  const url = `${getApiUrl()}/${userPaths.whoami()}`
  // POST request with userId in body if provided
  return api.post<WhoAmIResponse>(url, request?.userId ? { userId: request.userId } : {})
}

export function postResetPasswordRequest(payload: ResetPasswordRequestPayload) {
  const url = `${getApiUrl()}/${resetPasswordPaths.request()}`
  return api.post<ResetPasswordRequestResponse>(url, payload)
}

export function postResetPasswordVerify(payload: ResetPasswordVerifyPayload) {
  const url = `${getApiUrl()}/${resetPasswordPaths.verify()}`
  return api.post<ResetPasswordVerifyResponse>(url, payload)
}

export function patchResetPasswordComplete(payload: ResetPasswordCompletePayload) {
  const url = `${getApiUrl()}/${resetPasswordPaths.complete()}`
  return api.patch<ResetPasswordCompleteResponse>(url, payload)
}
