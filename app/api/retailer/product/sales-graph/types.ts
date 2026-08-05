// Request Types
export interface GetSalesGraphParams {
  retailerId: string
  productId: string
  wholeSellerId: string
}

// Response Types
export interface UpdatePriceEntry {
  date: string
  price: number
}

export interface SalesGraphResponse {
  status: boolean
  data: {
    updatePrice: UpdatePriceEntry[]
  }
  message?: string
}

export interface SalesGraphErrorResponse {
  status?: boolean
  message?: string
  data?: {
    message?: string
  }
}
