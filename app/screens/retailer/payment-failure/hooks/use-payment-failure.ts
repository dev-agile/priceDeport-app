import { useEffect, useRef } from "react"
import { useNavigation } from "@react-navigation/native"

import { RetailerRoutes } from "@/navigators/retailer/routes"

export function usePaymentFailure() {
  const navigation = useNavigation()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Auto-navigate after 3 seconds
    timeoutRef.current = setTimeout(() => {
      navigation.navigate(RetailerRoutes.SEARCH as never)
    }, 3000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [navigation])

  const handleGoBack = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    navigation.navigate(RetailerRoutes.SEARCH as never)
  }

  return {
    handleGoBack,
  }
}
