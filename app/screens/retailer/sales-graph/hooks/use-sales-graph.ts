import { useEffect, useMemo } from "react"
import { useRoute } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { Images } from "@assets/Images/wholeSeller"

import { salesGraphQueryOptions } from "@/api/retailer/product/sales-graph"
import { useRetailerAuth } from "@/context/RetailerAuthContext"

import { CONSOLE_MESSAGES, ERROR_MESSAGES } from "../lib/constants"
import type { ChartDataPoint, SalesGraphInfo, UseSalesGraphReturn } from "../lib/types"

export function useSalesGraph(): UseSalesGraphReturn {
  const route = useRoute()
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId || ""

  // Extract salesGraphInfo from route params
  const salesGraphInfo = useMemo(() => {
    const params = route.params as { salesGraphInfo?: SalesGraphInfo }
    return params?.salesGraphInfo
  }, [route.params])

  // Extract parameters for API call
  const apiParams = useMemo(() => {
    if (!salesGraphInfo || !retailerId) return null
    return {
      retailerId,
      productId: salesGraphInfo.productId,
      wholeSellerId: salesGraphInfo.wholesaler.wholesaler_id,
    }
  }, [salesGraphInfo, retailerId])

  // Fetch sales graph data
  const {
    data: salesGraphResponse,
    isLoading,
    isError,
    error,
  } = salesGraphQueryOptions.useSalesGraphQuery(
    apiParams || { retailerId: "", productId: "", wholeSellerId: "" },
  )

  // Format chart data
  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!salesGraphResponse?.data?.updatePrice) return []

    return salesGraphResponse.data.updatePrice
      .map((entry) => {
        const date = new Date(entry.date)
        return {
          date: entry.date,
          price: entry.price,
          formattedDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        }
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [salesGraphResponse?.data?.updatePrice])

  // Get product image
  const productImage = useMemo(() => {
    if (salesGraphInfo?.img_url) {
      return { uri: salesGraphInfo.img_url }
    }
    return Images.SoyaMilk
  }, [salesGraphInfo?.img_url])

  // Get current price
  const currentPrice = useMemo(() => {
    return salesGraphInfo?.wholesaler?.price || 0
  }, [salesGraphInfo?.wholesaler?.price])

  // Get product name
  const productName = useMemo(() => {
    return salesGraphInfo?.productName || ""
  }, [salesGraphInfo?.productName])

  // Error handling
  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        ERROR_MESSAGES.SALES_GRAPH_FETCH_ERROR
      Toast.show({
        text1: ERROR_MESSAGES.SALES_GRAPH_FETCH_ERROR,
        text2: errorMessage.toUpperCase(),
        type: "error",
      })
      console.error(CONSOLE_MESSAGES.SALES_GRAPH_FETCH_ERROR, error)
    }
  }, [isError, error])

  return {
    productName,
    productImage,
    currentPrice,
    chartData,
    isLoading,
    isError,
    error,
  }
}
