import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import { usePaymentSuccessMutation } from "@/api/retailer/subscription"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"

import type { PaymentLoadingScreenProps } from "../lib/types"

export function usePaymentLoading({ route }: PaymentLoadingScreenProps) {
  const navigation = useNavigation()
  const { userAuth } = useRetailerAuth()
  const params = route?.params
  const retailerId = userAuth?.userId || params?.id

  const paymentSuccessMutation = usePaymentSuccessMutation()

  useEffect(() => {
    if (!params) return

    const verifyPayment = async () => {
      const { sessionId, price, name, validtill } = params

      if (!sessionId || !retailerId) {
        console.error("Missing sessionId or retailerId")
        return
      }

      try {
        const response = await paymentSuccessMutation.mutateAsync({
          retailerId,
          request: { sessionId },
        })

        // Check for exact string match as per API doc
        if (response?.message === "Payment Successful") {
          ;(navigation as { navigate: (name: string, params?: object) => void }).navigate(
            RetailerRoutes.SUCCESS,
            { price, name, validtill },
          )
        } else {
          // If payment verification fails, navigate to failure screen
          ;(navigation as { navigate: (name: string, params?: object) => void }).navigate(
            RetailerRoutes.FAILURE,
            { price, name, validtill },
          )
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        // On error, navigate to failure screen
        ;(navigation as { navigate: (name: string, params?: object) => void }).navigate(
          RetailerRoutes.FAILURE,
          { price: params.price, name: params.name, validtill: params.validtill },
        )
      }
    }

    verifyPayment()
  }, [params, retailerId, navigation, paymentSuccessMutation])

  return {
    isLoading: paymentSuccessMutation.isPending,
  }
}
