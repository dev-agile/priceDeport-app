// Cart Item Types
export interface CartItem {
  product_id: string
  wholesaler_id: string
  items: number
  price: number
  product_desc: string
  subCategory_desc?: string
  image_url?: string
  file_id: string
}

// Request Types
export interface GetCartParams {
  retailerId: string
}

export interface UpdateCartItemRequest {
  retailerId: string
  data: {
    wholesaler_id: string
    product_id: string
    items: number
    fileId: string
  }
}

export interface PlaceOrderParams {
  retailerId: string
}

// Response Types
export interface CartResponse {
  status: boolean
  data: CartItem[]
  message?: string
}

export interface UpdateCartItemResponse {
  status: boolean
  data: CartItem
  message?: string
}

export interface PlaceOrderResponse {
  status: boolean
  message?: string
}

// Error Types
export interface OrderApiError {
  status?: number
  data?: {
    message?: string
  }
  message?: string
}
