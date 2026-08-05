export const STATIC_PEERS_ENDPOINT = "static/v1/peer-groups"

export const STATIC_PEERS_KEYS = ["product", "static-peers"] as const

export const PRODUCT_KEYS = ["product"] as const

export const PRODUCT_ENDPOINTS = {
  SEARCH: (retailerId: string, name: string) =>
    `retailer/${retailerId}/v1/products/search?name=${encodeURIComponent(name)}`,
  TRENDING: (retailerId: string) => `retailer/${retailerId}/v1/trending`,
  CATEGORY: (retailerId: string) => `retailer/${retailerId}/v1/category`,
  SUB_CATEGORY: (retailerId: string, category: string) =>
    `retailer/${retailerId}/v1/sub-category?category=${encodeURIComponent(category)}`,
  SEARCH_BY_CATEGORY: (retailerId: string, category: string, subcategory: string) =>
    `retailer/${retailerId}/v1/products/search?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`,
} as const

export const PRODUCT_DETAILS_KEYS = ["product", "product-details"] as const

export const PRODUCT_DETAILS_ENDPOINTS = {
  GET_PRODUCT: (retailerId: string, productId: string) =>
    `retailer/${retailerId}/v1/product/${productId}`,
  GET_PRODUCT_BY_SORT: (retailerId: string, productId: string, sortId: string) =>
    `retailer/${retailerId}/v1/product/${productId}?sort=${sortId}`,
  TOGGLE_FAVORITE: (retailerId: string, productId: string) =>
    `retailer/${retailerId}/v1/favorite/${productId}`,
} as const

export const UPLOAD_RETAILER_FILE_ENDPOINT = (retailerId: string, peerGroup: string) =>
  `retailer/${retailerId}/v1/upload/${encodeURIComponent(peerGroup)}`
