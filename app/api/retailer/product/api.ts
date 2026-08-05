import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import {
  PRODUCT_DETAILS_ENDPOINTS,
  PRODUCT_ENDPOINTS,
  STATIC_PEERS_ENDPOINT,
  UPLOAD_RETAILER_FILE_ENDPOINT,
} from "./constants"
import type {
  ApiRequestContext,
  CategoryListParams,
  CategoryListResponse,
  GetProductBySortParams,
  GetProductParams,
  ProductDetailsResponse,
  ProductsByNameAndCategoryParams,
  ProductsResponse,
  SearchProductsParams,
  SortedProductResponse,
  StaticPeersResponse,
  SubCategoryListParams,
  SubCategoryListResponse,
  ToggleFavoriteParams,
  ToggleFavoriteResponse,
  UploadRetailerFileParams,
  UploadRetailerFileResponse,
} from "./types"

export const getStaticPeers = (
  _request: void, // No parameters needed, but keeping signature consistent
  context?: ApiRequestContext,
) => {
  const url = `${getApiUrl()}/${STATIC_PEERS_ENDPOINT}`
  return api.get<StaticPeersResponse>(url, { signal: context?.signal })
}

export const getSearchProducts = (params: SearchProductsParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.SEARCH(params.retailerId, params.name)}`
  return api.get<ProductsResponse>(url)
}

export const getTrendingProducts = (retailerId: string) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.TRENDING(retailerId)}`
  return api.get<ProductsResponse>(url)
}

export const getCategoryList = (params: CategoryListParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.CATEGORY(params.retailerId)}`
  return api.get<CategoryListResponse>(url)
}

export const getSubCategoryList = (params: SubCategoryListParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.SUB_CATEGORY(params.retailerId, params.category)}`
  return api.get<SubCategoryListResponse>(url)
}

export const getProductsByNameAndCategory = (params: ProductsByNameAndCategoryParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.SEARCH_BY_CATEGORY(
    params.retailerId,
    params.category,
    params.subcategory,
  )}`
  return api.get<ProductsResponse>(url)
}

export const getProduct = (params: GetProductParams) => {
  const url = `${getApiUrl()}/${PRODUCT_DETAILS_ENDPOINTS.GET_PRODUCT(params.retailerId, params.productId)}`
  return api.get<ProductDetailsResponse>(url)
}

export const getProductBySort = (params: GetProductBySortParams) => {
  const url = `${getApiUrl()}/${PRODUCT_DETAILS_ENDPOINTS.GET_PRODUCT_BY_SORT(
    params.retailerId,
    params.productId,
    params.sortId,
  )}`
  return api.get<SortedProductResponse>(url)
}

export const toggleFavorite = (params: ToggleFavoriteParams) => {
  const url = `${getApiUrl()}/${PRODUCT_DETAILS_ENDPOINTS.TOGGLE_FAVORITE(params.retailerId, params.productId)}`
  return api.put<ToggleFavoriteResponse>(url)
}

export const postUploadRetailerFile = (params: UploadRetailerFileParams) => {
  const url = `${getApiUrl()}/${UPLOAD_RETAILER_FILE_ENDPOINT(params.retailerId, params.peer_group)}`
  return api.post<UploadRetailerFileResponse>(url, params.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60000,
  })
}
