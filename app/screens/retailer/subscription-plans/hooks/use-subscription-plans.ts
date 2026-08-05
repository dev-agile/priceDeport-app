import { useCallback, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { useCreateSessionMutation, useGetSubscriptionPlansQuery } from "@/api/retailer/subscription"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"

import { UI_TEXT } from "../lib/constants"
import type { SelectedPlan } from "../lib/types"

export function useSubscriptionPlans() {
  const navigation = useNavigation()
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [showWebView, setShowWebView] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")

  const { data: plansData, isLoading } = useGetSubscriptionPlansQuery(retailerId)
  const createSessionMutation = useCreateSessionMutation()

  const plans = plansData?.data || []

  const handlePlanSelect = useCallback((plan: SelectedPlan) => {
    setSelectedPlan(plan)
  }, [])

  const handleBuyNow = useCallback(async () => {
    if (!selectedPlan) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.SELECT_PLAN_ERROR,
      })
      return
    }

    if (!retailerId) {
      Toast.show({
        type: "error",
        text1: "User ID not found. Please login again.",
      })
      return
    }

    try {
      const response = await createSessionMutation.mutateAsync({
        retailerId,
        request: { planId: selectedPlan.planId },
      })

      if (response?.session?.url && response?.session?.id) {
        setPaymentUrl(response.session.url)
        setSessionId(response.session.id)
        setShowWebView(true)
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to create payment session",
        })
      }
    } catch (error) {
      console.error("Error creating session:", error)
      Toast.show({
        type: "error",
        text1: "Failed to create payment session. Please try again.",
      })
    }
  }, [selectedPlan, retailerId, createSessionMutation])

  const handleWebViewClose = useCallback(() => {
    setShowWebView(false)
    setPaymentUrl("")
    setSessionId("")
  }, [])

  const handleWebViewNavigation = useCallback(
    (navState: { url: string }) => {
      const url = navState.url

      if (url.includes("status=success")) {
        handleWebViewClose()
        // Navigate to LoadingScreen with sessionId and plan details
        if (sessionId && selectedPlan && retailerId) {
          ;(navigation as { navigate: (name: string, params?: object) => void }).navigate(
            RetailerRoutes.LOADING,
            {
              sessionId,
              id: retailerId,
              price: selectedPlan.amount,
              name: selectedPlan.name,
              validtill: selectedPlan.interval,
            },
          )
        }
      } else if (url.includes("status=cancel")) {
        handleWebViewClose()
        // Navigate to FailureScreen with plan details
        if (selectedPlan) {
          ;(navigation as { navigate: (name: string, params?: object) => void }).navigate(
            RetailerRoutes.FAILURE,
            {
              price: selectedPlan.amount,
              name: selectedPlan.name,
              validtill: selectedPlan.interval,
            },
          )
        }
      }
    },
    [handleWebViewClose, selectedPlan, retailerId, navigation, sessionId],
  )

  return {
    plans,
    isLoading,
    selectedPlan,
    showWebView,
    paymentUrl,
    handlePlanSelect,
    handleBuyNow,
    handleWebViewClose,
    handleWebViewNavigation,
    isCreatingSession: createSessionMutation.isPending,
  }
}
