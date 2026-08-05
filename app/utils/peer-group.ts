import { STORAGE_KEY } from "@/lib/constants"

import { loadString } from "./storage"

export function normalizePeerGroup(value: string | null): string {
  if (!value) return ""

  const trimmed = value.trim()
  if (!trimmed) return ""

  // Handles values saved as JSON strings, e.g. "\"A\""
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}

export function loadNormalizedPeerGroup(): string {
  const storedValue = loadString(STORAGE_KEY.PEER_GROUP)
  return normalizePeerGroup(storedValue)
}
