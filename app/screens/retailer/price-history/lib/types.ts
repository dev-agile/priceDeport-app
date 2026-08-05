export type AdminPriceEntry = {
  Date: string
  price: string | number
}

export type AdminPrices = Record<string, AdminPriceEntry[]>

export type PriceHistoryRow = {
  date: string
  prices: Record<string, string>
  timestamp: number
}

export interface PriceHistoryRouteParams {
  adminPrices?: AdminPrices
  selectedGroup?: string
  productId?: string
}
