import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { STORAGE_KEY } from "@/lib/constants"
import { setSentryUser } from "@/services/monitoring/sentry"
import { load, save, remove } from "@/utils/storage"

export interface UserAuth {
  accessToken: string
  userId: string
  refreshToken: string
}

/** Module-level callbacks registered by the provider so api-client can drive auth state. */
export const authEventHandlers: {
  clearAuth: (() => void) | null
  updateTokens: ((accessToken: string, refreshToken: string) => void) | null
} = {
  clearAuth: null,
  updateTokens: null,
}

function isJwtExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1]
    if (!payloadBase64) return true
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
    // atob is available globally in React Native (Hermes) since RN 0.64
    const decoded = atob(base64)
    const payload = JSON.parse(decoded) as { exp?: number }
    if (typeof payload.exp !== "number") return false
    return Date.now() / 1000 >= payload.exp
  } catch {
    return true
  }
}

export interface RetailerAuthContextType {
  userAuth: UserAuth | null
  userRole: string | null
  setUserAuth: (auth: UserAuth | null) => void
  setUserRole: (role: string | null) => void
  clearAuth: () => void
}

export const RetailerAuthContext = createContext<RetailerAuthContextType | null>(null)

export interface RetailerAuthProviderProps {}

function loadStoredUserInfo(): {
  userAuth: UserAuth | null
  userRole: string | null
} {
  try {
    const stored = load<{
      role?: string
      authToken?: string
      accessToken?: string
      userId?: string
      retailer_id?: string
      refreshToken?: string
    }>(STORAGE_KEY.USER_INFO)
    if (!stored) return { userAuth: null, userRole: null }

    const accessToken = stored.authToken ?? stored.accessToken
    const userId = stored.userId ?? stored.retailer_id
    if (!accessToken || !userId) return { userAuth: null, userRole: stored.role ?? null }

    // Treat an expired access token the same as no token — navigate to Login
    if (isJwtExpired(accessToken)) {
      return { userAuth: null, userRole: stored.role ?? null }
    }

    if (!stored.refreshToken) {
      console.warn("[RetailerAuth] userInfo missing refreshToken; session restored without it.")
    }
    return {
      userAuth: {
        accessToken,
        userId,
        refreshToken: stored.refreshToken ?? "",
      },
      userRole: stored.role ?? null,
    }
  } catch {
    remove(STORAGE_KEY.USER_INFO)
    return { userAuth: null, userRole: null }
  }
}

export const RetailerAuthProvider: FC<PropsWithChildren<RetailerAuthProviderProps>> = ({
  children,
}) => {
  const { userAuth: initialAuth, userRole: initialRole } = loadStoredUserInfo()

  const [userAuth, setUserAuthState] = useState<UserAuth | null>(initialAuth)
  const [userRole, setUserRoleState] = useState<string | null>(initialRole)

  useEffect(() => {
    if (userAuth && userRole) {
      save(STORAGE_KEY.USER_INFO, {
        role: userRole,
        authToken: userAuth.accessToken,
        userId: userAuth.userId,
        refreshToken: userAuth.refreshToken || "",
      })
    } else if (!userAuth && !userRole) {
      remove(STORAGE_KEY.USER_INFO)
    }
  }, [userAuth, userRole])

  useEffect(() => {
    if (userAuth?.userId) {
      setSentryUser({ id: userAuth.userId })
      return
    }
    setSentryUser(null)
  }, [userAuth?.userId])

  const setUserAuth = useCallback((auth: UserAuth | null) => {
    setUserAuthState(auth)
  }, [])

  const setUserRole = useCallback((role: string | null) => {
    setUserRoleState(role)
  }, [])

  const clearAuth = useCallback(() => {
    setUserAuthState(null)
    setUserRoleState(null)
    remove(STORAGE_KEY.USER_INFO)
  }, [])

  // Register global callbacks so api-client can drive auth state without importing React hooks
  useEffect(() => {
    authEventHandlers.clearAuth = clearAuth
    authEventHandlers.updateTokens = (accessToken: string, refreshToken: string) => {
      setUserAuthState((prev) => (prev ? { ...prev, accessToken, refreshToken } : null))
    }
    return () => {
      authEventHandlers.clearAuth = null
      authEventHandlers.updateTokens = null
    }
  }, [clearAuth])

  const value: RetailerAuthContextType = {
    userAuth,
    userRole,
    setUserAuth,
    setUserRole,
    clearAuth,
  }

  return <RetailerAuthContext.Provider value={value}>{children}</RetailerAuthContext.Provider>
}

export const useRetailerAuth = () => {
  const context = useContext(RetailerAuthContext)
  if (!context) {
    throw new Error("useRetailerAuth must be used within a RetailerAuthProvider")
  }
  return context
}
