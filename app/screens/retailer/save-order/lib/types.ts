import type { Order, VendorData } from "@/api/retailer/orders/types"

export interface UseSaveOrderReturn {
  orders: Order[]
  vendorData: VendorData | null
  isLoading: boolean
  isError: boolean
  error: any
  refreshing: boolean
  onRefresh: () => void
  handleSharePDF: (order: Order) => void
  formatDate: (dateString: string) => string
}
