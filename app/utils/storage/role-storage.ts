import { STORAGE_KEY } from "@/lib/constants"

import { loadString, remove, saveString } from "."

export function getRole(): string | null {
  try {
    return loadString(STORAGE_KEY.USER_ROLE)
  } catch {
    return null
  }
}

export function setRole(role: string | null): void {
  try {
    if (role === null) {
      remove(STORAGE_KEY.USER_ROLE)
    } else {
      saveString(STORAGE_KEY.USER_ROLE, role)
    }
  } catch (error) {
    console.error("Error setting role in MMKV:", error)
  }
}

export function removeRole(): void {
  try {
    remove(STORAGE_KEY.USER_ROLE)
  } catch (error) {
    console.error("Error removing role from MMKV:", error)
  }
}
