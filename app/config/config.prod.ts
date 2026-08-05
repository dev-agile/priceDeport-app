import { BASE_URL } from "./config.base"

/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 *
 * API_URL defaults to BASE_URL.BASE (Railway production). Override at build time
 * with EXPO_PUBLIC_API_URL if QA needs a different host.
 */
export default {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? BASE_URL.BASE,
  POSTHOG_API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY || "",
  POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
  POSTHOG_ENABLED: process.env.EXPO_PUBLIC_POSTHOG_ENABLED !== "false",
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || "",
  SENTRY_ENABLED: process.env.EXPO_PUBLIC_SENTRY_ENABLED !== "false",
}
