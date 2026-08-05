// Request Types
export interface GetOrdersParams {
  retailerId: string
}

// Response Types
export interface OrderItem {
  quantity: number
  product_desc: string
  productTotalPrice: number
}

export interface WholesalerData {
  wholesaler_name: string
  wholesaler_location: string
  city: string
  zipCode: string
  wholesaler_number: string
  wholesaler_email: string
}

export interface PDFItem {
  product_id: string
  name: string
  items: number
  price: number
  productTotalPrice: number
}

export interface PDFData {
  wholesalerData: WholesalerData
  items: PDFItem[]
  totalPrice: number
}

export interface Order {
  orderId: string
  date: string // ISO timestamp
  totalOrderPrice: number
  items: OrderItem[]
  pdfData: PDFData[]
}

export interface VendorData {
  storeName: string
  location: string
  city: string
  zipCode: string
  number: string
  email: string
}

export interface OrdersResponse {
  status: boolean
  data: {
    orderData: Order[]
    vendorData: VendorData
  }
  message: string
}

export interface OrdersErrorResponse {
  status: false
  message: string
}
