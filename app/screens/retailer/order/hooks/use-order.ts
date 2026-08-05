import { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { orderQueryOptions } from "@/api/retailer/order"
import type { CartItem } from "@/api/retailer/order"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadNormalizedPeerGroup } from "@/utils/peer-group"
import { loadString } from "@/utils/storage"

import { CONSOLE_MESSAGES, ERROR_MESSAGES, STORAGE_KEYS, UI_TEXT } from "../lib/constants"
import type { UseOrderReturn } from "../lib/types"

export function useOrder(navigation: any): UseOrderReturn {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId || ""

  const [peerGroup, setPeerGroup] = useState<string | null>(null)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null)
  const [quantityInput, setQuantityInput] = useState("")

  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch: refetchCart,
  } = orderQueryOptions.useCartQuery({ retailerId }, { enabled: !!retailerId })

  const updateCartMutation = orderQueryOptions.useUpdateCartItemMutation()
  const placeOrderMutation = orderQueryOptions.usePlaceOrderMutation()

  // Load peer group from storage
  useEffect(() => {
    const key = loadNormalizedPeerGroup()
    setPeerGroup(key || null)
  }, [])

  // Refetch cart on screen focus
  useFocusEffect(
    useCallback(() => {
      if (retailerId) {
        refetchCart()
      }
    }, [retailerId, refetchCart]),
  )

  // Handle cart loading errors
  useEffect(() => {
    if (isError && error) {
      const errorStatus = (error as any)?.response?.status || (error as any)?.status

      if (errorStatus === 401) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.SESSION_EXPIRED,
          text2: ERROR_MESSAGES.SESSION_EXPIRED_DETAIL,
        })
      } else if (errorStatus === 400) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.INVALID_REQUEST,
        })
      } else if ((error as any)?.message === "Network Error" || errorStatus === "FETCH_ERROR") {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.NETWORK_ERROR,
        })
      } else {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_LOAD_CART,
        })
      }
      console.log(CONSOLE_MESSAGES.CART_ERROR, error)
    }
  }, [isError, error])

  const getFileId = useCallback((): string => {
    // Try to get from storage first
    const fileIdFromStorage = loadString(STORAGE_KEYS.FILE_ID)
    if (fileIdFromStorage) {
      return fileIdFromStorage
    }

    // Fallback to first cart item's file_id
    if (cartData?.data && cartData.data.length > 0) {
      return cartData.data[0].file_id
    }

    return ""
  }, [cartData])

  const handleIncrement = useCallback(
    async (item: CartItem) => {
      if (!retailerId) return

      const fileId = getFileId()
      if (!fileId) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
          text2: "File ID not found",
        })
        return
      }

      try {
        await updateCartMutation.mutateAsync({
          retailerId,
          data: {
            wholesaler_id: item.wholesaler_id,
            product_id: item.product_id,
            items: item.items + 1,
            fileId,
          },
        })

        Toast.show({
          type: "success",
          text1: UI_TEXT.CART_UPDATED_SUCCESS,
        })
        console.log(CONSOLE_MESSAGES.CART_UPDATE_SUCCESS)
      } catch (error) {
        console.log(CONSOLE_MESSAGES.UPDATE_ERROR, error)
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
        })
      }
    },
    [retailerId, getFileId, updateCartMutation],
  )

  const handleDecrement = useCallback(
    async (item: CartItem) => {
      if (!retailerId) return

      const newQuantity = item.items - 1
      const fileId = getFileId()
      if (!fileId) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
          text2: "File ID not found",
        })
        return
      }

      try {
        await updateCartMutation.mutateAsync({
          retailerId,
          data: {
            wholesaler_id: item.wholesaler_id,
            product_id: item.product_id,
            items: newQuantity,
            fileId,
          },
        })

        if (newQuantity === 0) {
          Toast.show({
            type: "success",
            text1: UI_TEXT.ITEM_REMOVED_SUCCESS,
          })
        } else {
          Toast.show({
            type: "success",
            text1: UI_TEXT.CART_UPDATED_SUCCESS,
          })
        }
        console.log(CONSOLE_MESSAGES.CART_UPDATE_SUCCESS)
      } catch (error) {
        console.log(CONSOLE_MESSAGES.UPDATE_ERROR, error)
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
        })
      }
    },
    [retailerId, getFileId, updateCartMutation],
  )

  const handleQuantityPress = useCallback((item: CartItem) => {
    setSelectedItem(item)
    setQuantityInput(item.items.toString())
    setShowQuantityModal(true)
  }, [])

  const handleQuantitySubmit = useCallback(async () => {
    if (!selectedItem || !retailerId) return

    const quantity = parseInt(quantityInput)
    if (isNaN(quantity) || quantity < 0) {
      Toast.show({
        type: "error",
        text1: "Invalid quantity",
      })
      return
    }

    const fileId = getFileId()
    if (!fileId) {
      Toast.show({
        type: "error",
        text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
        text2: "File ID not found",
      })
      return
    }

    try {
      await updateCartMutation.mutateAsync({
        retailerId,
        data: {
          wholesaler_id: selectedItem.wholesaler_id,
          product_id: selectedItem.product_id,
          items: quantity,
          fileId,
        },
      })

      setShowQuantityModal(false)
      setSelectedItem(null)
      setQuantityInput("")

      if (quantity === 0) {
        Toast.show({
          type: "success",
          text1: UI_TEXT.ITEM_REMOVED_SUCCESS,
        })
      } else {
        Toast.show({
          type: "success",
          text1: UI_TEXT.CART_UPDATED_SUCCESS,
        })
      }
      console.log(CONSOLE_MESSAGES.CART_UPDATE_SUCCESS)
    } catch (error) {
      console.log(CONSOLE_MESSAGES.UPDATE_ERROR, error)
      Toast.show({
        type: "error",
        text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
      })
    }
  }, [selectedItem, quantityInput, retailerId, getFileId, updateCartMutation])

  const handleRemoveItem = useCallback(
    async (item: CartItem) => {
      if (!retailerId) return

      const fileId = getFileId()
      if (!fileId) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
          text2: "File ID not found",
        })
        return
      }

      try {
        await updateCartMutation.mutateAsync({
          retailerId,
          data: {
            wholesaler_id: item.wholesaler_id,
            product_id: item.product_id,
            items: 0,
            fileId,
          },
        })
        Toast.show({
          type: "success",
          text1: UI_TEXT.ITEM_REMOVED_SUCCESS,
        })
        console.log(CONSOLE_MESSAGES.CART_UPDATE_SUCCESS)
      } catch (error) {
        console.log(CONSOLE_MESSAGES.UPDATE_ERROR, error)
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_UPDATE_CART,
        })
      }
    },
    [retailerId, getFileId, updateCartMutation],
  )

  const handlePlaceOrder = useCallback(async () => {
    if (!retailerId) return

    if (!cartData?.data || cartData.data.length === 0) {
      Toast.show({
        type: "error",
        text1: ERROR_MESSAGES.EMPTY_CART_ERROR,
      })
      return
    }

    try {
      const response = await placeOrderMutation.mutateAsync({ retailerId })

      if (response.status) {
        Toast.show({
          type: "success",
          text1: UI_TEXT.ORDER_PLACED_SUCCESS,
        })
        console.log(CONSOLE_MESSAGES.ORDER_PLACED)

        // Navigate to Save Order screen
        navigation.navigate(RetailerRoutes.SAVE_ORDER)
      }
    } catch (error: any) {
      const errorStatus = error?.response?.status || error?.status

      if (errorStatus === 401) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.SESSION_EXPIRED,
          text2: ERROR_MESSAGES.SESSION_EXPIRED_DETAIL,
        })
      } else if (errorStatus === 400) {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.EMPTY_CART_ERROR,
        })
      } else {
        Toast.show({
          type: "error",
          text1: ERROR_MESSAGES.FAILED_TO_PLACE_ORDER,
        })
      }
      console.log(CONSOLE_MESSAGES.PLACE_ORDER_ERROR, error)
    }
  }, [retailerId, cartData, placeOrderMutation, navigation])

  return {
    cartData: cartData?.data,
    isLoading: isLoading || updateCartMutation.isPending || placeOrderMutation.isPending,
    isError,
    error,
    peerGroup,
    showQuantityModal,
    selectedItem,
    quantityInput,
    setShowQuantityModal,
    setSelectedItem,
    setQuantityInput,
    handleIncrement,
    handleDecrement,
    handleQuantityPress,
    handleQuantitySubmit,
    handleRemoveItem,
    handlePlaceOrder,
    refetchCart,
  }
}
