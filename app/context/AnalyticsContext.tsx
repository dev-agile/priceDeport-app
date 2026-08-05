import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react"

import { useRetailerAuth } from "@/context/RetailerAuthContext"
import {
  captureAnalyticsEvent,
  identifyAnalyticsUser,
  initAnalytics,
  resetAnalyticsUser,
} from "@/services/analytics/posthog"

type AnalyticsProperties = Record<string, unknown>

interface AnalyticsContextValue {
  capture: (event: string, properties?: AnalyticsProperties) => void
  identify: (distinctId: string, properties?: AnalyticsProperties) => void
  reset: () => void
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

export const AnalyticsProvider = ({ children }: PropsWithChildren) => {
  const { userAuth, userRole } = useRetailerAuth()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    if (userAuth?.userId) {
      identifyAnalyticsUser(userAuth.userId, { role: userRole ?? "unknown" })
      captureAnalyticsEvent("user_identified", { role: userRole ?? "unknown" })
    } else {
      resetAnalyticsUser()
    }
  }, [userAuth?.userId, userRole])

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      capture: captureAnalyticsEvent,
      identify: identifyAnalyticsUser,
      reset: resetAnalyticsUser,
    }),
    [],
  )

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) throw new Error("useAnalytics must be used within AnalyticsProvider")
  return context
}
