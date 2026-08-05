import { useCallback, useRef, useState } from "react"
import type { TextInput } from "react-native"
import { useRoute } from "@react-navigation/native"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { save, saveString } from "@/utils/storage"

import {
  CONSOLE_MESSAGES,
  ERROR_MESSAGES,
  OTP_CONFIG,
  STORAGE_KEYS,
  USER_ROLE,
} from "../lib/constants"
import type { UseEmailVerificationReturn } from "../lib/types"

export function useEmailVerification(navigation: any): UseEmailVerificationReturn {
  const route = useRoute()
  const [otp, setOtp] = useState<string[]>(["", "", "", ""])
  const inputRefs = useRef<(TextInput | null)[]>(Array(OTP_CONFIG.OTP_ARRAY_SIZE).fill(null))
  const { email } = route?.params as { email: string }
  const { mutateAsync: verifyOtp, isPending: isLoading } =
    authMutationOptions.useOtpVerifyMutation()
  const { setUserAuth } = useRetailerAuth()

  const handleOtpChange = useCallback(
    (value: string, index: number) => {
      const updatedOtp = [...otp]
      updatedOtp[index] = value
      setOtp(updatedOtp)
      if (value !== "") {
        if (index < OTP_CONFIG.OTP_LENGTH - 1) {
          inputRefs.current[index + 1]?.focus()
        } else if (index === OTP_CONFIG.OTP_LENGTH - 1) {
          inputRefs.current[index]?.focus()
        }
      } else {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus()
        }
      }
    },
    [otp],
  )

  const handleOtpSubmit = useCallback(async () => {
    const enteredOtp = otp.join("")
    if (!email || enteredOtp.length !== OTP_CONFIG.OTP_LENGTH) {
      Toast.show({
        type: "error",
        text1: ERROR_MESSAGES.INVALID_OTP,
      })
      return
    }

    try {
      const response = await verifyOtp({ email, otp: enteredOtp })

      if (response?.message && response?.data) {
        // Store subscription and peer group in storage
        const isSubscribed = response.data.isSubscribed.toString()
        const peerGroup = response.data.peerGroup.toString()
        // saveString(STORAGE_KEYS.PREMIUM_USER, isSubscribed)
        console.log("isSubscribed =>", isSubscribed)
        save(STORAGE_KEYS.PREMIUM_USER, JSON.stringify(true))
        saveString(STORAGE_KEY.PEER_GROUP, peerGroup)

        // Store user info in storage
        try {
          const userInfo = {
            role: USER_ROLE.RETAILER,
            authToken: response.data.accessToken,
            userId: response.data.retailer_id,
            refreshToken: response.data.refreshToken,
          }
          save(STORAGE_KEYS.USER_INFO, userInfo)
        } catch (storageError) {
          console.error(CONSOLE_MESSAGES.STORAGE_ERROR, storageError)
        }

        // Update auth context
        const payload = {
          accessToken: response.data.accessToken,
          userId: response.data.retailer_id,
          refreshToken: response.data.refreshToken,
        }
        setUserAuth(payload)

        // Show success toast
        Toast.show({
          type: "success",
          text1: response.message.toUpperCase(),
        })

        // Navigate to tab container
        navigation.navigate(RetailerRoutes.TAB_CONTAINER)
      }
    } catch (error: any) {
      // Extract error message
      let errorMessage = ERROR_MESSAGES.VERIFICATION_FAILED
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.error?.data?.message) {
        errorMessage = error.error.data.message
      }

      Toast.show({
        type: "error",
        text1: errorMessage.toUpperCase(),
      })
    }
  }, [email, otp, verifyOtp, setUserAuth, navigation])

  return {
    otp,
    inputRefs,
    email,
    isLoading,
    handleOtpChange,
    handleOtpSubmit,
  }
}
