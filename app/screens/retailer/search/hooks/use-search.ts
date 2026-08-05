import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import debounce from "lodash/debounce"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { productQueryOptions } from "@/api/retailer/product"
import type { Product } from "@/api/retailer/product/types"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { loadNormalizedPeerGroup } from "@/utils/peer-group"
import { save } from "@/utils/storage"

export function useSearch() {
  const { userAuth, userRole } = useRetailerAuth()
  const userDetails = userAuth
    ? {
        userId: userAuth.userId,
        accessToken: userAuth.accessToken,
        refreshToken: userAuth.refreshToken,
      }
    : null

  const [query, setQuery] = useState("")
  const [itemsArray, setItemsArray] = useState<Product[]>([])
  const [trendingArray, setTrendingArray] = useState<Product[]>([])
  const [isStartSearch, setIsStartSearch] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [shouldTrendingDataFetch, setShouldTrendingDataFetch] = useState<boolean>(false)
  const [peerGroup, setPeerGroup] = useState("")
  const [isCategoryAll, setIsCategoryAll] = useState<string>("Select Category")
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const isSubCategoryEnabled = !!selectedCategory

  const {
    data: filteredData,
    isSuccess: isSucces,
    // refetch: refetchCategoryList,
  } = productQueryOptions.useProductsByNameAndCategoryQuery(
    {
      retailerId: userDetails?.userId || "",
      name: query,
      category: selectedCategory || "",
      subcategory: selectedSubCategory || "",
    },
    {
      enabled: !!(userDetails?.userId && selectedCategory && selectedSubCategory),
    },
  )

  const { data: categoryListData, error: categoryListError } =
    productQueryOptions.useCategoryListQuery({
      retailerId: userDetails?.userId || "",
    })

  const { data: subCategoryListData } = productQueryOptions.useSubCategoryListQuery(
    {
      retailerId: userDetails?.userId || "",
      category: selectedCategory || "",
    },
    {
      enabled: !!selectedCategory && !!userDetails?.userId,
    },
  )

  const {
    data: trendingData,
    isSuccess: isSuccessTrendingData,
    isLoading: isLoadingTrendingData,
    isError: isErrorTrendingData,
    refetch: refetchTrendingData,
    error: errorTrendingData,
  } = productQueryOptions.useTrendingProductsQuery(userDetails?.userId, {
    enabled: !!userDetails?.userId,
  })

  const {
    data: searchedItems,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
    status,
  } = productQueryOptions.useSearchProductsQuery(
    {
      name: query,
      retailerId: userDetails?.userId || "",
    },
    {
      enabled: isStartSearch && query.trim().length >= 2 && !!userDetails?.userId,
    },
  )

  const handleShowAll = useCallback(() => {
    // Restore trending items immediately — don't wait for the refetch to resolve
    if (trendingArray.length > 0) {
      setItemsArray(trendingArray)
    }
    refetchTrendingData()
    setIsStartSearch(false)
    setQuery("")
    setShouldTrendingDataFetch(true)
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setIsCategoryAll("Select Category")
  }, [refetchTrendingData, trendingArray])

  const onCategorySelect = useCallback(
    (category: string) => {
      if (category === "All (trending)") {
        handleShowAll()
      } else {
        // Reset stale subcategory whenever category changes.
        setSelectedSubCategory((prev) => (prev && selectedCategory !== category ? null : prev))
        setSelectedCategory(category)
      }
    },
    [handleShowAll, selectedCategory],
  )

  const onSubCategorySelect = useCallback((subcategory: string) => {
    setSelectedSubCategory(subcategory)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetchTrendingData()
      .then(() => {
        setPeerGroup(loadNormalizedPeerGroup())
        setRefreshing(false)
      })
      .catch((refreshError) => {
        console.error("Error occurred while refreshing:", refreshError)
        setRefreshing(false)
      })
  }, [refetchTrendingData])

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [onRefresh]),
  )

  const MIN_SEARCH_LENGTH = 2

  const debouncedSearch = useCallback(
    debounce((nextQuery: string) => {
      if (nextQuery && nextQuery.trim().length >= MIN_SEARCH_LENGTH) {
        setIsStartSearch(true)
      }
    }, 1000),
    [],
  )

  // Cancel any in-flight search immediately when the query drops below the minimum length
  useEffect(() => {
    if (query.trim().length < MIN_SEARCH_LENGTH && isStartSearch) {
      setIsStartSearch(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < MIN_SEARCH_LENGTH) return
    setQuery(searchQuery)
    setIsStartSearch(true)
  }, [])

  const handleClearSearch = useCallback(() => {
    refetchTrendingData()
    setIsStartSearch(false)
    setQuery("")
    setShouldTrendingDataFetch(true)
    setSelectedCategory(null)
    setSelectedSubCategory(null)
  }, [refetchTrendingData])

  const categoryDescArray = categoryListData?.data
    ? ["All (trending)", ...categoryListData.data]
    : []
  const subCategoryDescArray = subCategoryListData?.data

  useEffect(() => {
    // Only apply filtered results when a category+subcategory is actively selected
    if (isSucces && filteredData?.data && selectedCategory && selectedSubCategory) {
      setItemsArray(filteredData.data)
    }
  }, [isSucces, filteredData, query, selectedCategory, selectedSubCategory])

  useEffect(() => {
    if (categoryListError && categoryListError?.status !== 404) {
      Toast.show({
        type: "error",
        text1: "Failed to load categories",
        text2: "Some features may not be available",
      })
    }
  }, [categoryListError])

  useEffect(() => {
    if (errorTrendingData && errorTrendingData?.status !== 404) {
      Toast.show({
        type: "error",
        text1: "Failed to load trending products",
        text2: "Some features may not be available",
      })
    }
  }, [errorTrendingData])

  useEffect(() => {
    if (trendingData?.data) {
      setItemsArray(trendingData.data)
    }
  }, [trendingData])

  useEffect(() => {
    if (query && isStartSearch) {
      refetch()
    }
  }, [query, isStartSearch, refetch, peerGroup])

  useEffect(() => {
    const fetchPeer = async () => {
      const peerGroupValue = loadNormalizedPeerGroup()
      setPeerGroup(peerGroupValue)
      return peerGroupValue
    }
    fetchPeer()
  }, [])

  useEffect(() => {
    if (isSuccessTrendingData && trendingData?.data) {
      setTrendingArray(trendingData.data)
      setItemsArray(trendingData.data)
      setShouldTrendingDataFetch(false)
    } else if (isErrorTrendingData) {
      Toast.show({
        type: "error",
        text1: "Server Error",
        position: "top",
        topOffset: 90,
      })
    }
  }, [
    isSuccessTrendingData,
    isErrorTrendingData,
    trendingData,
    shouldTrendingDataFetch,
    errorTrendingData,
  ])

  useEffect(() => {
    if (isSuccess && status === "fulfilled" && searchedItems?.data) {
      setItemsArray(searchedItems.data.slice(0, 20))
      setIsStartSearch(false)
    } else if (isError) {
      setQuery("")
      Toast.show({
        type: "error",
        text1: "Server Error",
        position: "top",
        topOffset: 90,
      })
      setIsStartSearch(false)
    }
  }, [isSuccess, isError, searchedItems, status, isLoading, error])

  useEffect(() => {
    if (userDetails && userRole) {
      try {
        const userInfo = {
          role: userRole,
          authToken: userDetails?.accessToken,
          userId: userDetails?.userId,
          refreshToken: userDetails?.refreshToken,
        }
        save(STORAGE_KEY.USER_INFO, userInfo)
      } catch (err) {
        console.error("Error storing user details: ", err)
      }
    }
  }, [userDetails, userRole])

  useEffect(() => {
    if ((query === "" || query.trim() === "") && trendingData?.data) {
      setItemsArray(trendingData.data)
    }
  }, [query, trendingData])

  return {
    categoryDescArray,
    debouncedSearch,
    filteredData,
    handleClearSearch,
    handleSearch,
    isCategoryAll,
    isLoading,
    isLoadingTrendingData,
    isSubCategoryEnabled,
    itemsArray,
    onCategorySelect,
    onRefresh,
    onSubCategorySelect,
    peerGroup,
    query,
    refreshing,
    selectedCategory,
    selectedSubCategory,
    setQuery,
    subCategoryDescArray,
    trendingArray,
  }
}
