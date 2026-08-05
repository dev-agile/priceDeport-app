import { useMemo } from "react"
import { useRoute } from "@react-navigation/native"

import { UI_TEXT } from "../lib/constants"
import type { AdminPrices, PriceHistoryRouteParams, PriceHistoryRow } from "../lib/types"

const toShortDate = (raw: string): { label: string; timestamp: number } => {
  const isoDate = raw?.split?.("T")?.[0] ?? raw
  const dateObj = new Date(isoDate)
  const timestamp = dateObj.getTime()
  if (isNaN(timestamp)) {
    return { label: isoDate || "-", timestamp: 0 }
  }

  const month = `${dateObj.getMonth() + 1}`.padStart(2, "0")
  const day = `${dateObj.getDate()}`.padStart(2, "0")
  const year = `${dateObj.getFullYear()}`.slice(-2)
  return { label: `${month}/${day}/${year}`, timestamp }
}

const formatPrice = (value: string | number | undefined): string => {
  if (value === undefined || value === null || value === "") return UI_TEXT.VALUE_NOT_AVAILABLE
  const n = Number(value)
  if (isNaN(n)) return UI_TEXT.VALUE_NOT_AVAILABLE
  return `$${n.toFixed(2)}`
}

export function usePriceHistory() {
  const route = useRoute()
  const params = (route.params ?? {}) as PriceHistoryRouteParams
  const adminPrices: AdminPrices = params.adminPrices ?? {}

  const peerGroups = useMemo(() => Object.keys(adminPrices), [adminPrices])

  const rows = useMemo<PriceHistoryRow[]>(() => {
    if (peerGroups.length === 0) return []

    const byDate = new Map<string, PriceHistoryRow>()

    peerGroups.forEach((group) => {
      const entries = adminPrices[group] ?? []
      entries.forEach((entry) => {
        const { label, timestamp } = toShortDate(entry.Date)
        const existing = byDate.get(label)

        if (existing) {
          existing.prices[group] = formatPrice(entry.price)
        } else {
          const prices: Record<string, string> = {}
          peerGroups.forEach((peerGroup) => {
            prices[peerGroup] = UI_TEXT.VALUE_NOT_AVAILABLE
          })
          prices[group] = formatPrice(entry.price)
          byDate.set(label, {
            date: label,
            prices,
            timestamp,
          })
        }
      })
    })

    return Array.from(byDate.values()).sort((a, b) => b.timestamp - a.timestamp)
  }, [adminPrices, peerGroups])

  return {
    peerGroups,
    rows,
    selectedGroup: params.selectedGroup ?? null,
    productId: params.productId ?? "1",
  }
}
