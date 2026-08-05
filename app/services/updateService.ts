import { Platform } from "react-native"
import * as Network from "expo-network"
import * as Updates from "expo-updates"

import { loadString, saveString } from "@/utils/storage"

const UPDATE_GUARD_KEYS = {
  LAST_CHECK_AT: "ota.last_check_at",
  LAST_RELOAD_UPDATE_ID: "ota.last_reload_update_id",
  LAST_RELOAD_AT: "ota.last_reload_at",
} as const

const CHECK_COOLDOWN_MS = 5 * 60 * 1000
const RELOAD_LOOP_GUARD_MS = 10 * 60 * 1000

let hasReloadedInThisSession = false

/**
 * Checks for OTA update on Android and applies it automatically.
 * Only runs in production builds (not in development).
 * Does not block UI rendering.
 */
export async function checkForAppUpdate(): Promise<void> {
  // Skip in development mode or environments where updates are disabled.
  if (__DEV__ || Platform.OS === "web" || !Updates.isEnabled) {
    return
  }

  // Avoid repeated reload attempts in a single app session.
  if (hasReloadedInThisSession) {
    console.log("[updateService] Reload already triggered in this session; skipping.")
    return
  }

  try {
    // Guard frequent check calls (e.g., app remounts) to reduce unnecessary network traffic.
    const now = Date.now()
    const lastCheckAt = Number(loadString(UPDATE_GUARD_KEYS.LAST_CHECK_AT) || "0")
    if (lastCheckAt && now - lastCheckAt < CHECK_COOLDOWN_MS) {
      console.log("[updateService] Skipping update check due to cooldown window.")
      return
    }
    saveString(UPDATE_GUARD_KEYS.LAST_CHECK_AT, String(now))

    const networkState = await Network.getNetworkStateAsync()
    if (!networkState.isConnected || !networkState.isInternetReachable) {
      console.log("[updateService] Offline/unreachable network; skipping update check.")
      return
    }

    console.log("[updateService] Checking for OTA update...")

    const update = await Updates.checkForUpdateAsync()

    if (!update.isAvailable) {
      console.log("[updateService] No update available")
      return
    }

    console.log("[updateService] Update available, fetching...")

    const fetchResult = await Updates.fetchUpdateAsync()

    if (!fetchResult.isNew) {
      console.log("[updateService] Update fetched but not new")
      return
    }

    const updateId = String((fetchResult.manifest as any)?.id ?? "")
    const lastReloadUpdateId = loadString(UPDATE_GUARD_KEYS.LAST_RELOAD_UPDATE_ID) || ""
    const lastReloadAt = Number(loadString(UPDATE_GUARD_KEYS.LAST_RELOAD_AT) || "0")

    // Prevent reload loops for the same update in a short time window.
    if (
      updateId &&
      lastReloadUpdateId === updateId &&
      lastReloadAt &&
      now - lastReloadAt < RELOAD_LOOP_GUARD_MS
    ) {
      console.warn("[updateService] Reload loop guard triggered; skip reload for same update id.")
      return
    }

    if (updateId) {
      saveString(UPDATE_GUARD_KEYS.LAST_RELOAD_UPDATE_ID, updateId)
    }
    saveString(UPDATE_GUARD_KEYS.LAST_RELOAD_AT, String(now))
    hasReloadedInThisSession = true

    console.log("[updateService] Update applied, reloading...")
    await Updates.reloadAsync()
  } catch (error) {
    console.warn("[updateService] Update check failed:", error)
  }
}
