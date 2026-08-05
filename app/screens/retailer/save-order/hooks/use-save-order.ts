import { useState, useCallback, useEffect, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { ordersQueryOptions } from "@/api/retailer/orders"
import type { Order } from "@/api/retailer/orders/types"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { formatDate as formatDateUtil } from "@/utils/formatDate"

import { CONSOLE_MESSAGES, ERROR_MESSAGES, UI_TEXT } from "../lib/constants"
import type { UseSaveOrderReturn } from "../lib/types"

export function useSaveOrder(navigation: any): UseSaveOrderReturn {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId || ""

  const [refreshing, setRefreshing] = useState(false)
  const lastErrorRef = useRef<any>(null)

  const {
    data: ordersResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = ordersQueryOptions.useGetOrdersQuery(
    { retailerId },
    {
      enabled: !!retailerId && retailerId.trim() !== "",
    },
  )

  // Refetch on screen focus
  useFocusEffect(
    useCallback(() => {
      if (retailerId) {
        refetch()
      }
    }, [retailerId, refetch]),
  )

  // Handle errors - only show once per unique error
  useEffect(() => {
    if (isError && error && error !== lastErrorRef.current) {
      lastErrorRef.current = error

      // Check if it's a network error
      const errorMessage = (error as any)?.message || ""
      const isNetworkError =
        errorMessage === "Network Error" ||
        (error as any)?.code === "NETWORK_ERROR" ||
        errorMessage === "FETCH_ERROR" ||
        errorMessage.includes("Network Error")

      if (isNetworkError) {
        Toast.show({
          text1: UI_TEXT.ERROR,
          text2: "Network error. Please check your connection and try again.",
          type: "error",
        })
      } else {
        const displayMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.data?.message ||
          errorMessage ||
          ERROR_MESSAGES.FETCH_FAILED

        Toast.show({
          text1: UI_TEXT.ERROR,
          text2: displayMessage,
          type: "error",
        })
      }
      const errMessage = (error as any)?.message ?? String(error)
      if (__DEV__) {
        console.warn(CONSOLE_MESSAGES.ORDERS_ERROR, errMessage)
      }
    }
  }, [isError, error])

  // Handle successful data load
  useEffect(() => {
    if (ordersResponse?.data) {
      console.log(CONSOLE_MESSAGES.ORDERS_LOADED, ordersResponse.data.orderData.length)
    }
  }, [ordersResponse?.data])

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    if (!retailerId || retailerId.trim() === "") {
      Toast.show({
        text1: UI_TEXT.ERROR,
        text2: "Retailer ID is missing",
        type: "error",
      })
      return
    }
    setRefreshing(true)
    console.log(CONSOLE_MESSAGES.REFRESHING)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }, [refetch, retailerId])

  // Format date from ISO timestamp to "Jan 15, 2024, 04:00 PM"
  const formatDate = useCallback((dateString: string): string => {
    try {
      return formatDateUtil(dateString, "MMM d, yyyy, hh:mm a")
    } catch {
      return dateString
    }
  }, [])

  // Handle PDF share (guard: only navigate if pdfData has at least one entry per API doc)
  const handleSharePDF = useCallback(
    (order: Order) => {
      if (!order.pdfData?.length || !order.pdfData[0]) {
        Toast.show({
          text1: UI_TEXT.ERROR,
          text2: "No PDF data for this order",
          type: "error",
        })
        return
      }
      console.log(CONSOLE_MESSAGES.SHARING_PDF, order.orderId)
      navigation.navigate(RetailerRoutes.PREVIEW_PDF, {
        order,
        vendorData: ordersResponse?.data?.vendorData,
      })
    },
    [navigation, ordersResponse?.data?.vendorData],
  )

  // Sort orders by date (newest first)
  const sortedOrders = ordersResponse?.data?.orderData
    ? [...ordersResponse.data.orderData].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    : []

  return {
    orders: sortedOrders,
    vendorData: ordersResponse?.data?.vendorData || null,
    isLoading,
    isError,
    error,
    refreshing,
    onRefresh,
    handleSharePDF,
    formatDate,
  }
}
