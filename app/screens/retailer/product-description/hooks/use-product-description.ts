import { useCallback, useEffect, useMemo, useState } from "react"
import { useRoute } from "@react-navigation/native"
import debounce from "lodash/debounce"
import Toast from "react-native-toast-message"

import { orderQueryOptions } from "@/api/retailer/order"
import type { CartItem } from "@/api/retailer/order"
import {
  useProductQuery,
  useSortedProductQuery,
  useToggleFavoriteMutation,
} from "@/api/retailer/product/query-options"
import type { WholesalerData } from "@/api/retailer/product/types"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadNormalizedPeerGroup } from "@/utils/peer-group"
import { saveString } from "@/utils/storage"

import {
  CONSOLE_MESSAGES,
  ERROR_MESSAGES,
  //   SORT_OPTIONS,
  STORAGE_KEYS,
  UI_TEXT,
} from "../lib/constants"
import type { ProductDescriptionScreenRouteProp, UseProductDescriptionReturn } from "../lib/types"

export function useProductDescription(navigation: any): UseProductDescriptionReturn {
  const route = useRoute<ProductDescriptionScreenRouteProp>()
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId || ""

  // Extract productId from route params
  const productId = useMemo(() => {
    return route.params?.singleProductId || route.params?.productDetails?.product_id || ""
  }, [route.params])

  // State
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string | null>(null)
  const [peerGroup, setPeerGroup] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)
  const [showPeerGroupModal, setShowPeerGroupModal] = useState(false)
  const [selectedWholesaler, setSelectedWholesaler] = useState<WholesalerData | null>(null)
  const [quantityInput, setQuantityInput] = useState("")
  const [sortOption, setSortOption] = useState<string | null>(null)
  const [wholesalerData, setWholesalerData] = useState<WholesalerData[]>([])

  // Load subscription and peer group from storage
  useEffect(() => {
    // const premiumUser = loadString(STORAGE_KEYS.PREMIUM_USER)
    const peerGroupValue = loadNormalizedPeerGroup()
    // setIsSubscribed(premiumUser === "true")
    setIsSubscribed(true)
    setPeerGroup(peerGroupValue)
    setSelectedPeerGroup(peerGroupValue)
  }, [])

  // Product query
  const {
    data: productResponse,
    isLoading,
    isError,
    error,
    refetch: refetchProduct,
  } = useProductQuery({ retailerId, productId }, { enabled: !!retailerId && !!productId })

  // Sorted product query (only when sort is selected)
  const { data: sortedData } = useSortedProductQuery(
    {
      retailerId,
      productId,
      sortId: sortOption || "",
    },
    { enabled: !!retailerId && !!productId && !!sortOption },
  )

  // Cart query
  const { data: cartResponse, refetch: refetchCart } = orderQueryOptions.useCartQuery(
    { retailerId },
    { enabled: !!retailerId },
  )

  // Mutations
  const toggleFavoriteMutation = useToggleFavoriteMutation()
  const updateCartMutation = orderQueryOptions.useUpdateCartItemMutation()

  // Update wholesaler data when product or sorted data changes
  useEffect(() => {
    if (sortedData?.data && sortOption) {
      console.log("222222 sortedData.data after sorting api response data =>", sortedData.data)
      setWholesalerData(sortedData.data)
    } else if (productResponse?.data?.wholesalerData) {
      console.log(
        "333333 productResponse.data.wholesalerData after product api response data =>",
        productResponse.data.wholesalerData,
      )
      setWholesalerData(productResponse.data.wholesalerData)
    }
  }, [productResponse?.data?.wholesalerData, sortedData?.data, sortOption])

  // Store fileId when product loads
  useEffect(() => {
    if (productResponse?.data?.wholesalerData?.[0]?.fileId) {
      saveString(STORAGE_KEYS.FILE_ID, productResponse.data.wholesalerData[0].fileId)
    }
  }, [productResponse?.data?.wholesalerData])

  // Error handling
  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        ERROR_MESSAGES.PRODUCT_FETCH_ERROR
      const normalized = String(errorMessage).toUpperCase()
      const isProductNotFound =
        (error as any)?.response?.status === 404 || normalized.includes("PRODUCT NOT FOUND")
      Toast.show({
        text1: isProductNotFound ? UI_TEXT.PRODUCT_NOT_FOUND : UI_TEXT.SOMETHING_WENT_WRONG,
        text2: errorMessage.toUpperCase(),
        type: "error",
      })
      console.error(CONSOLE_MESSAGES.PRODUCT_FETCH_ERROR, error)
    }
  }, [isError, error])

  // Get fileId helper (prefer the current wholesaler to avoid cross-wholesaler mismatch)
  const getFileId = useCallback(
    (wholesaler?: WholesalerData | null): string | null => {
      if (wholesaler?.fileId) return wholesaler.fileId
      if (selectedWholesaler?.fileId) return selectedWholesaler.fileId
      if (wholesalerData?.[0]?.fileId) return wholesalerData[0].fileId
      return productResponse?.data?.wholesalerData?.[0]?.fileId || null
    },
    [selectedWholesaler, wholesalerData, productResponse?.data?.wholesalerData],
  )

  // Get cart item for wholesaler
  const getCartItem = useCallback(
    (wholesaler: WholesalerData): CartItem | undefined => {
      return cartResponse?.data?.find(
        (item) => item.wholesaler_id === wholesaler.wholesaler_id && item.product_id === productId,
      )
    },
    [cartResponse?.data, productId],
  )

  // Toggle favorite
  const handleToggleFavorite = useCallback(async () => {
    if (!retailerId || !productId) return

    try {
      const response = await toggleFavoriteMutation.mutateAsync({
        retailerId,
        productId,
      })
      Toast.show({
        text1: response.data?.message?.toUpperCase() || UI_TEXT.ADDED_TO_FAVORITE,
        type: "success",
      })
      console.log(CONSOLE_MESSAGES.FAVORITE_TOGGLED)
      refetchProduct()
    } catch (error) {
      console.error(CONSOLE_MESSAGES.FAVORITE_TOGGLE_ERROR, error)
      Toast.show({
        text1: ERROR_MESSAGES.FAVORITE_TOGGLE_ERROR,
        type: "error",
      })
    }
  }, [retailerId, productId, toggleFavoriteMutation, refetchProduct])

  // Add to cart
  const handleAddToCart = useCallback((wholesaler: WholesalerData) => {
    setSelectedWholesaler(wholesaler)
    setQuantityInput("1")
    setShowQuantityModal(true)
  }, [])

  // Increment quantity
  const handleIncrement = useCallback(
    async (wholesaler: WholesalerData) => {
      if (!retailerId) return

      const cartItem = getCartItem(wholesaler)
      const currentQuantity = cartItem?.items || 0
      const newQuantity = currentQuantity + 1
      const fileId = getFileId(wholesaler)

      if (!fileId) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
          text2: "File ID not found",
        })
        return
      }

      try {
        await updateCartMutation.mutateAsync({
          retailerId,
          data: {
            wholesaler_id: wholesaler.wholesaler_id,
            product_id: productId,
            items: newQuantity,
            fileId,
          },
        })
        Toast.show({
          type: "success",
          text1: UI_TEXT.CART_UPDATED_SUCCESS,
        })
        console.log(CONSOLE_MESSAGES.CART_UPDATED)
        refetchCart()
      } catch (error) {
        console.error(CONSOLE_MESSAGES.CART_UPDATE_ERROR, error)
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
        })
      }
    },
    [retailerId, productId, getFileId, getCartItem, updateCartMutation, refetchCart],
  )

  // Decrement quantity
  const handleDecrement = useCallback(
    async (wholesaler: WholesalerData) => {
      if (!retailerId) return

      const cartItem = getCartItem(wholesaler)
      const currentQuantity = cartItem?.items || 0
      const newQuantity = currentQuantity - 1
      const fileId = getFileId(wholesaler)

      if (!fileId) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
          text2: "File ID not found",
        })
        return
      }

      try {
        if (newQuantity <= 0) {
          // Remove item by setting quantity to 0
          await updateCartMutation.mutateAsync({
            retailerId,
            data: {
              wholesaler_id: wholesaler.wholesaler_id,
              product_id: productId,
              items: 0,
              fileId,
            },
          })
        } else {
          await updateCartMutation.mutateAsync({
            retailerId,
            data: {
              wholesaler_id: wholesaler.wholesaler_id,
              product_id: productId,
              items: newQuantity,
              fileId,
            },
          })
        }
        Toast.show({
          type: "success",
          text1: UI_TEXT.CART_UPDATED_SUCCESS,
        })
        console.log(CONSOLE_MESSAGES.CART_UPDATED)
        refetchCart()
      } catch (error) {
        console.error(CONSOLE_MESSAGES.CART_UPDATE_ERROR, error)
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
        })
      }
    },
    [retailerId, productId, getFileId, getCartItem, updateCartMutation, refetchCart],
  )

  // Manual quantity change (debounced)
  const debouncedQuantitySubmit = useMemo(
    () =>
      debounce(async (wholesaler: WholesalerData, quantity: number) => {
        if (!retailerId) return

        const fileId = getFileId(wholesaler)
        if (!fileId) {
          Toast.show({
            type: "error",
            text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
            text2: "File ID not found",
          })
          return
        }

        try {
          await updateCartMutation.mutateAsync({
            retailerId,
            data: {
              wholesaler_id: wholesaler.wholesaler_id,
              product_id: productId,
              items: quantity,
              fileId,
            },
          })
          Toast.show({
            type: "success",
            text1: UI_TEXT.CART_UPDATED_SUCCESS,
          })
          console.log(CONSOLE_MESSAGES.CART_UPDATED)
          refetchCart()
        } catch (error) {
          console.error(CONSOLE_MESSAGES.CART_UPDATE_ERROR, error)
          Toast.show({
            type: "error",
            text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
          })
        }
      }, 1500),
    [retailerId, productId, getFileId, updateCartMutation, refetchCart],
  )

  const handleQuantityChange = useCallback(
    (value: string) => {
      setQuantityInput(value)
      if (selectedWholesaler) {
        const quantity = parseInt(value)
        if (!isNaN(quantity) && quantity >= 0) {
          debouncedQuantitySubmit(selectedWholesaler, quantity)
        }
      }
    },
    [selectedWholesaler, debouncedQuantitySubmit],
  )

  // Quantity submit (for modal)
  const handleQuantitySubmit = useCallback(
    async (overrideQuantity?: number) => {
      if (!selectedWholesaler || !retailerId) return

      const quantity = overrideQuantity !== undefined ? overrideQuantity : parseInt(quantityInput)
      if (isNaN(quantity) || quantity < 0) {
        Toast.show({
          type: "error",
          text1: "Invalid quantity",
        })
        return
      }

      const fileId = getFileId(selectedWholesaler)
      if (!fileId) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
          text2: "File ID not found",
        })
        return
      }

      try {
        await updateCartMutation.mutateAsync({
          retailerId,
          data: {
            wholesaler_id: selectedWholesaler.wholesaler_id,
            product_id: productId,
            items: quantity,
            fileId,
          },
        })
        Toast.show({
          type: "success",
          text1: UI_TEXT.CART_UPDATED_SUCCESS,
        })
        console.log(CONSOLE_MESSAGES.CART_UPDATED)
        setShowQuantityModal(false)
        refetchCart()
      } catch (error) {
        console.error(CONSOLE_MESSAGES.CART_UPDATE_ERROR, error)
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.CART_UPDATE_ERROR,
        })
        throw error // Re-throw so caller can handle
      }
    },
    [
      selectedWholesaler,
      quantityInput,
      retailerId,
      productId,
      getFileId,
      updateCartMutation,
      refetchCart,
    ],
  )

  // Sort select
  const handleSortSelect = useCallback(async (sortId: string) => {
    setSortOption(sortId)
    setShowSortModal(false)
    try {
      // Query will automatically refetch with new sort
      console.log(CONSOLE_MESSAGES.SORT_APPLIED, sortId)
    } catch (error) {
      console.error(CONSOLE_MESSAGES.SORT_ERROR, error)
      Toast.show({
        type: "error",
        text1: ERROR_MESSAGES.SORT_ERROR,
      })
    }
  }, [])

  // Peer group select
  const handlePeerGroupSelect = useCallback((peerGroupValue: string) => {
    setSelectedPeerGroup(peerGroupValue)
    setShowPeerGroupModal(false)
  }, [])

  // Navigate to price history
  const handleNavigateToPriceHistory = useCallback(() => {
    if (!productResponse?.data?.adminPrice || !selectedPeerGroup) return
    navigation.navigate(RetailerRoutes.PRICEHISTORY, {
      adminPrices: productResponse.data.adminPrice,
      selectedGroup: selectedPeerGroup,
      productId: productResponse.data.product_id,
    })
  }, [navigation, productResponse?.data?.adminPrice, selectedPeerGroup])

  // Navigate to sales graph
  const handleNavigateToSalesGraph = useCallback(
    (wholesaler: WholesalerData) => {
      if (!productResponse?.data) return
      navigation.navigate(RetailerRoutes.SALES_GRAPH, {
        salesGraphInfo: {
          wholesaler: wholesaler,
          productName: productResponse.data.product_desc,
          productId: productResponse.data.product_id,
          img_url: productResponse.data.image_url,
        },
      })
    },
    [navigation, productResponse?.data],
  )

  return {
    productData: productResponse?.data || null,
    wholesalerData,
    adminPrice: productResponse?.data?.adminPrice || null,
    isFavorite: productResponse?.data?.isFavorite || false,
    isLoading,
    isError,
    error,
    cartItems: cartResponse?.data || [],
    peerGroup,
    selectedPeerGroup,
    isSubscribed,
    showQuantityModal,
    showSortModal,
    showPeerGroupModal,
    selectedWholesaler,
    quantityInput,
    sortOption,
    handleToggleFavorite,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleQuantityChange,
    handleQuantitySubmit,
    handleSortSelect,
    handlePeerGroupSelect,
    handleNavigateToPriceHistory,
    handleNavigateToSalesGraph,
    setShowQuantityModal,
    setShowSortModal,
    setShowPeerGroupModal,
    setQuantityInput,
    setSelectedWholesaler,
  }
}
