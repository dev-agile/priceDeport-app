import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { FAVOURITES_KEYS } from "@/api/retailer/favourites/constants"
import { createQueryKeys } from "@/lib/react-query/keys"

import {
  getCategoryList,
  getProduct,
  getProductBySort,
  getProductsByNameAndCategory,
  getSearchProducts,
  getStaticPeers,
  getSubCategoryList,
  getTrendingProducts,
  postUploadRetailerFile,
  toggleFavorite,
} from "./api"
import { PRODUCT_DETAILS_KEYS, PRODUCT_KEYS, STATIC_PEERS_KEYS } from "./constants"
import type {
  CategoryListParams,
  GetProductBySortParams,
  GetProductParams,
  ProductsByNameAndCategoryParams,
  SearchProductsParams,
  SubCategoryListParams,
  ToggleFavoriteParams,
  UploadRetailerFileParams,
} from "./types"

// Static Peers Query Keys
export const staticPeersQueryKeys = createQueryKeys([...STATIC_PEERS_KEYS], {
  getStaticPeers: () => ({
    key: [],
    sub: {
      byRequest: (_params?: void) => ({
        key: [],
      }),
    },
  }),
})

// Product Query Keys
export const productQueryKeys = createQueryKeys([...PRODUCT_KEYS], {
  searchProducts: (params: SearchProductsParams) => ({
    key: ["search", params],
    sub: {},
  }),
  trendingProducts: (retailerId: string) => ({
    key: ["trending", retailerId],
    sub: {},
  }),
  categoryList: (params: CategoryListParams) => ({
    key: ["categories", params.retailerId],
    sub: {},
  }),
  subCategoryList: (params: SubCategoryListParams) => ({
    key: ["subcategories", params.retailerId, params.category],
    sub: {},
  }),
  productsByNameAndCategory: (params: ProductsByNameAndCategoryParams) => ({
    key: ["search-by-category", params],
    sub: {},
  }),
})

// Query Keys
export const productDetailsQueryKeys = createQueryKeys([...PRODUCT_DETAILS_KEYS], {
  product: (params: GetProductParams) => ({
    key: ["product", params.retailerId, params.productId],
    sub: {},
  }),
  sortedProduct: (params: GetProductBySortParams) => ({
    key: ["sorted-product", params.retailerId, params.productId, params.sortId],
    sub: {},
  }),
})

// Static Peers Query Options
export const getStaticPeersQueryOptions = (_request?: void) => {
  return queryOptions({
    queryKey: staticPeersQueryKeys.getStaticPeers().sub.byRequest().key,
    async queryFn(context) {
      const response = await getStaticPeers(undefined, context)
      return response.data
    },
  })
}

export function useStaticPeersQuery() {
  const query = useQuery(getStaticPeersQueryOptions())

  const status = query.isPending ? "pending" : query.isError ? "rejected" : "fulfilled"

  return {
    data: query.data,
    error: query.error,
    status,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

// Search Products Query Options
export const getSearchProductsQueryOptions = (
  params: SearchProductsParams,
  options?: { enabled?: boolean },
) => {
  return queryOptions({
    queryKey: productQueryKeys.searchProducts(params).key,
    async queryFn() {
      const response = await getSearchProducts(params)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSearchProductsQuery(
  params: SearchProductsParams,
  options?: { enabled?: boolean },
) {
  const query = useQuery(getSearchProductsQueryOptions(params, options))

  const status = query.isPending ? "pending" : query.isError ? "rejected" : "fulfilled"

  return {
    data: query.data,
    error: query.error,
    status,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

// Trending Products Query Options
export const getTrendingProductsQueryOptions = (
  retailerId: string,
  options?: { enabled?: boolean },
) => {
  return queryOptions({
    queryKey: productQueryKeys.trendingProducts(retailerId).key,
    async queryFn() {
      const response = await getTrendingProducts(retailerId)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (endpoint might not be available)
      if (error?.response?.status === 404) {
        return false
      }
      return failureCount < 2
    },
  })
}

export function useTrendingProductsQuery(
  retailerId: string | undefined,
  options?: { enabled?: boolean },
) {
  const query = useQuery(
    getTrendingProductsQueryOptions(retailerId || "", {
      enabled: options?.enabled ?? !!retailerId,
    }),
  )

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

// Category List Query Options
export const getCategoryListQueryOptions = (params: CategoryListParams) => {
  return queryOptions({
    queryKey: productQueryKeys.categoryList(params).key,
    async queryFn() {
      const response = await getCategoryList(params)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (expected for some API versions)
      if (error?.response?.status === 404) {
        return false
      }
      return failureCount < 2
    },
  })
}

export function useCategoryListQuery(params: CategoryListParams) {
  const query = useQuery(getCategoryListQueryOptions(params))

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
  }
}

// Subcategory List Query Options
export const getSubCategoryListQueryOptions = (
  params: SubCategoryListParams,
  options?: { enabled?: boolean },
) => {
  return queryOptions({
    queryKey: productQueryKeys.subCategoryList(params).key,
    async queryFn() {
      const response = await getSubCategoryList(params)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useSubCategoryListQuery(
  params: SubCategoryListParams,
  options?: { enabled?: boolean },
) {
  const query = useQuery(getSubCategoryListQueryOptions(params, options))

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
  }
}

// Products by Name and Category Query Options
export const getProductsByNameAndCategoryQueryOptions = (
  params: ProductsByNameAndCategoryParams,
  options?: { enabled?: boolean },
) => {
  return queryOptions({
    queryKey: productQueryKeys.productsByNameAndCategory(params).key,
    async queryFn() {
      const response = await getProductsByNameAndCategory(params)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 30 * 1000, // 30 seconds
  })
}

export function useProductsByNameAndCategoryQuery(
  params: ProductsByNameAndCategoryParams,
  options?: { enabled?: boolean },
) {
  const query = useQuery(getProductsByNameAndCategoryQueryOptions(params, options))

  return {
    data: query.data,
    error: query.error,
    isSuccess: query.isSuccess,
    isError: query.isError,
    refetch: query.refetch,
  }
}

// Get Product Query Options
export const getProductQueryOptions = (
  params: GetProductParams,
  options?: { enabled?: boolean },
) => {
  return queryOptions({
    queryKey: productDetailsQueryKeys.product(params).key,
    async queryFn() {
      const response = await getProduct(params)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useProductQuery(params: GetProductParams, options?: { enabled?: boolean }) {
  const query = useQuery(getProductQueryOptions(params, options))

  console.log("11111111111 query.data =>", query.data)
  console.log("11111111111 query.isLoading =>", query.isLoading)
  console.log("11111111111 query.isError =>", query.isError)
  console.log("11111111111 query.isSuccess =>", query.isSuccess)

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

// Get Sorted Product Query Options
export const getSortedProductQueryOptions = (
  params: GetProductBySortParams,
  options?: { enabled?: boolean },
) => {
  return queryOptions({
    queryKey: productDetailsQueryKeys.sortedProduct(params).key,
    async queryFn() {
      const response = await getProductBySort(params)
      return response.data
    },
    enabled: options?.enabled ?? true,
    staleTime: 30 * 1000, // 30 seconds
  })
}

export function useSortedProductQuery(
  params: GetProductBySortParams,
  options?: { enabled?: boolean },
) {
  const query = useQuery(getSortedProductQueryOptions(params, options))
  console.log("444444 query.data after sorted product api response data =>", query.data)
  console.log("444444 query.isLoading after sorted product api response data =>", query.isLoading)
  console.log("444444 query.isError after sorted product api response data =>", query.isError)
  console.log("444444 query.isSuccess after sorted product api response data =>", query.isSuccess)

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}

// Toggle Favorite Mutation
export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ToggleFavoriteParams) => toggleFavorite(params),
    onSuccess: (_response, variables) => {
      // Invalidate the specific product so its isFavorite flag updates
      queryClient.invalidateQueries({
        queryKey: productDetailsQueryKeys.product({
          retailerId: variables.retailerId,
          productId: variables.productId,
        }).key,
      })
      // Invalidate all favourites queries — key prefix matches ["retailer","favourites","list",...]
      queryClient.invalidateQueries({
        queryKey: [...FAVOURITES_KEYS],
      })
    },
  })
}

// Upload Retailer File Mutation
export function useUploadRetailerFileMutation() {
  return useMutation({
    mutationFn: (params: UploadRetailerFileParams) => postUploadRetailerFile(params),
  })
}
