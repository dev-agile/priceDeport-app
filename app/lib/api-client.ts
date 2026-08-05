import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

import { authEventHandlers } from "@/context/RetailerAuthContext"
import { load, save } from "@/utils/storage"

import { getApiUrl } from "./api-config"
import { getToken, getRefreshToken } from "./authStorage"
import { STORAGE_KEY } from "./constants"

const getBaseURL = () => {
  return getApiUrl()
}

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json"

    // Check if this is an auth endpoint (don't add auth headers)
    const isAuthEndpoint =
      config.url?.includes("/login") ||
      config.url?.includes("/register") ||
      config.url?.includes("/verify") ||
      config.url?.includes("/reset-password") ||
      config.url?.includes("preauth")

    // Only add auth headers for non-auth endpoints
    if (!isAuthEndpoint) {
      const token = await getToken()
      const refreshToken = await getRefreshToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      if (refreshToken) {
        config.headers.refreshToken = refreshToken
      }
    }
  }
  return config
}

export const api = Axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
})

api.interceptors.request.use(authRequestInterceptor)

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Keep 501 retry logic - appears idempotent (retries same request)
    if (error.response?.status === 501) {
      return api.request(originalRequest)
    }

    // Handle 401 Unauthorized - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Get refresh token from storage
        const userInfo = load<{
          role?: string
          authToken?: string
          accessToken?: string
          userId?: string
          refreshToken?: string
        }>(STORAGE_KEY.USER_INFO)

        if (!userInfo?.refreshToken) {
          throw new Error("No refresh token available")
        }

        // Backend reads refresh token from "refreshtoken" header on GET /v1/refresh
        const refreshResponse = await Axios.get(`${getApiUrl()}/v1/refresh`, {
          headers: { refreshtoken: userInfo.refreshToken },
        })

        if (refreshResponse?.data?.data) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            refreshResponse.data.data

          // Update tokens in storage
          save(STORAGE_KEY.USER_INFO, {
            ...userInfo,
            authToken: newAccessToken,
            refreshToken: newRefreshToken,
          })

          // Sync new tokens into React context state
          authEventHandlers.updateTokens?.(newAccessToken, newRefreshToken)

          // Retry original request with new token
          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          originalRequest.headers.refreshToken = newRefreshToken

          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed — clear auth in context (which also removes from storage)
        authEventHandlers.clearAuth?.()
        return Promise.reject(refreshError)
      }
    }

    // Pass errors back to React Query consumers
    return Promise.reject(error)
  },
)
