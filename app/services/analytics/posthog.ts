import PostHog from "posthog-react-native"

import Config from "@/config"

type AnalyticsProperties = Record<string, any>

let client: PostHog | null = null

const isEnabled = () => Boolean(Config.POSTHOG_ENABLED && Config.POSTHOG_API_KEY)

export const initAnalytics = () => {
  if (!isEnabled()) return null
  if (client) return client

  client = new PostHog(Config.POSTHOG_API_KEY, {
    host: Config.POSTHOG_HOST,
  })
  return client
}

export const identifyAnalyticsUser = (distinctId: string, properties?: AnalyticsProperties) => {
  if (!distinctId) return
  const posthog = initAnalytics()
  if (!posthog) return

  try {
    posthog.identify(distinctId, properties)
  } catch (error) {
    console.log("[Analytics] identify failed", error)
  }
}

export const captureAnalyticsEvent = (event: string, properties?: AnalyticsProperties) => {
  const posthog = initAnalytics()
  if (!posthog) return

  try {
    posthog.capture(event, properties)
  } catch (error) {
    console.log("[Analytics] capture failed", error)
  }
}

export const captureScreenViewed = (screenName: string, properties?: AnalyticsProperties) => {
  const posthog = initAnalytics()
  if (!posthog) return

  try {
    posthog.screen(screenName, properties)
    posthog.capture("screen_viewed", { screen_name: screenName, ...properties })
  } catch (error) {
    console.log("[Analytics] screen capture failed", error)
  }
}

export const resetAnalyticsUser = () => {
  if (!client) return
  try {
    client.reset()
  } catch (error) {
    console.log("[Analytics] reset failed", error)
  }
}

// Explicitly keep the requested canonical events available.
export const trackReminderCreated = (properties?: AnalyticsProperties) =>
  captureAnalyticsEvent("reminder_created", properties)
export const trackReminderCompleted = (properties?: AnalyticsProperties) =>
  captureAnalyticsEvent("reminder_completed", properties)
export const trackReminderSkipped = (properties?: AnalyticsProperties) =>
  captureAnalyticsEvent("reminder_skipped", properties)
