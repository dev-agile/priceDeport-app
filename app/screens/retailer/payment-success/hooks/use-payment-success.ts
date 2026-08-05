import { useEffect, useRef } from "react"
import { useNavigation } from "@react-navigation/native"

import { authQueryOptions } from "@/api/retailer/auth"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { saveString } from "@/utils/storage"

import { STORAGE_KEYS } from "../lib/constants"
// import type { PaymentSuccessScreenProps } from "../lib/types"

export function usePaymentSuccess() {
  const navigation = useNavigation()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Call Who Am I with empty string as per API doc
  const { data: whoAmIData } = authQueryOptions.useWhoAmIQuery({ userId: "" })

  useEffect(() => {
    // Update AsyncStorage if user is subscribed
    if (whoAmIData?.data?.isSubscribed === true) {
      saveString(STORAGE_KEYS.PREMIUM_USER, JSON.stringify(true))
    }

    // Auto-navigate after 3 seconds
    timeoutRef.current = setTimeout(() => {
      navigation.navigate(RetailerRoutes.SEARCH as never)
    }, 3000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [whoAmIData, navigation])

  const handleDone = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    navigation.navigate(RetailerRoutes.SEARCH as never)
  }

  return {
    handleDone,
  }
}
