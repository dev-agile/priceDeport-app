import * as Sentry from "@sentry/react-native"
import type { ComponentType } from "react"

import Config from "@/config"

const navigationIntegration = Sentry.reactNavigationIntegration()
let initialized = false

const isEnabled = () => Boolean(Config.SENTRY_ENABLED && Config.SENTRY_DSN)

export const initSentry = () => {
  if (!isEnabled() || initialized) return

  Sentry.init({
    dsn: Config.SENTRY_DSN,
    debug: false,
    tracesSampleRate: 1.0,
    release: "pizzaapp@1.0.0",
    integrations: [navigationIntegration],
  })

  initialized = true
}

export const registerSentryNavigation = (navigationContainerRef: any) => {
  if (!isEnabled()) return
  try {
    navigationIntegration.registerNavigationContainer(navigationContainerRef)
  } catch (error) {
    console.log("[Sentry] navigation registration failed", error)
  }
}

export const setSentryUser = (user: { id?: string; email?: string } | null) => {
  if (!isEnabled()) return
  Sentry.setUser(user)
}

export const captureSentryException = (error: unknown, context?: Record<string, any>) => {
  if (!isEnabled()) return
  if (context) {
    Sentry.withScope((scope) => {
      scope.setContext("custom_context", context)
      Sentry.captureException(error)
    })
    return
  }
  Sentry.captureException(error)
}

export const sentryWrapRoot = <T extends ComponentType<any>>(Component: T) => {
  if (!isEnabled()) return Component
  return Sentry.wrap(Component)
}
