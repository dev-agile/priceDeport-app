import { STORAGE_KEY } from "@/lib/constants"
import { load } from "@/utils/storage"

export async function getToken(): Promise<string | null> {
  const userInfo = load<{
    authToken?: string
    accessToken?: string
    userId?: string
    refreshToken?: string
  }>(STORAGE_KEY.USER_INFO)

  // Support both authToken and accessToken field names for backward compatibility
  return userInfo?.authToken || userInfo?.accessToken || null
}

export async function getRefreshToken(): Promise<string | null> {
  const userInfo = load<{
    authToken?: string
    accessToken?: string
    userId?: string
    refreshToken?: string
  }>(STORAGE_KEY.USER_INFO)

  return userInfo?.refreshToken || null
}
