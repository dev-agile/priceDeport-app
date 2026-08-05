export interface StaticPeersRequest {
  // Empty interface since this is a void query
}

export interface StaticPeersResponse {
  data: string[]
}

export interface StaticPeersErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  message?: string
  response?: {
    data?: {
      message?: string
    }
  }
}

export interface ApiRequestContext {
  signal?: AbortSignal
}

// Product Types
export interface Product {
  product_id: string
  product_desc: string
  category_desc: string
  subCategory_desc?: string
  image_url?: string
  adminPrice?: {
    [peerGroup: string]: Array<{
      Date: string
      price: number
    }>
  }
}

// Request Types
export interface SearchProductsParams {
  name: string
  retailerId: string
}

export interface CategoryListParams {
  retailerId: string
}

export interface SubCategoryListParams {
  retailerId: string
  category: string
}

export interface ProductsByNameAndCategoryParams {
  retailerId: string
  name: string
  category: string
  subcategory: string
}

// Response Types
export interface ProductsResponse {
  data: Product[]
  message?: string
  status?: boolean
}

export interface CategoryListResponse {
  data: string[]
  message?: string
  status?: boolean
}

export interface SubCategoryListResponse {
  data: string[]
  message?: string
  status?: boolean
}

export interface ApiError {
  status?: number
  data?: {
    message?: string
  }
  message?: string
}

// Request Types
export interface GetProductParams {
  retailerId: string
  productId: string
}

export interface GetProductBySortParams {
  retailerId: string
  productId: string
  sortId: string // 'lthprice', 'htlprice', 'atz', 'time'
}

// Response Types
export interface WholesalerData {
  wholesaler_id: string
  name: string
  price: number
  casePrice?: number
  date: string
  fileId: string
}

export type AdminPrice = {
  [peerGroup: string]: Array<{
    Date: string
    price: number
  }>
} & {
  Date?: string
}

export interface ProductDetailsData {
  product_id: string
  product_desc: string
  category_desc: string
  subCategory_desc?: string
  image_url?: string
  isFavorite: boolean
  adminPrice: AdminPrice
  wholesalerData: WholesalerData[]
}

export interface ProductDetailsResponse {
  status: boolean
  data: ProductDetailsData
  message?: string
}

export interface SortedProductResponse {
  status: boolean
  data: WholesalerData[]
  message?: string
}

// Favorite Types
export interface ToggleFavoriteParams {
  retailerId: string
  productId: string
}

export interface ToggleFavoriteResponse {
  status: boolean
  message: string // "ADDED TO FAVORITE" | "REMOVE TO FAVORITE"
}

// Error Types
export interface ProductDetailsError {
  status?: number
  data?: {
    message?: string
  }
  message?: string
}

// Upload Retailer File
export interface UploadRetailerFileParams {
  formData: FormData
  retailerId: string
  peer_group: string
}

export interface UploadRetailerFileResponse {
  message?: string
}
