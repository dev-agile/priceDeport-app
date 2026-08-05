import { useCallback, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  useForm,
  type Control,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormReset,
} from "react-hook-form"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { useRole } from "@/context/RoleContext"
import { STORAGE_KEY } from "@/lib/constants"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { captureAnalyticsEvent, identifyAnalyticsUser } from "@/services/analytics/posthog"
import { captureSentryException } from "@/services/monitoring/sentry"
import { loginSchema } from "@/utils/schema/login-schema"
import { save, saveString } from "@/utils/storage"

import {
  CONSOLE_MESSAGES,
  ERROR_MESSAGES,
  MODAL_INITIAL_STATE,
  STORAGE_KEYS,
  USER_ROLE,
} from "../lib/constants"
import type { IFormInput, IShowModalType } from "../lib/types"

export interface UseRetailerLoginReturn {
  // Form management
  control: Control<IFormInput>
  handleSubmit: UseFormHandleSubmit<IFormInput>
  errors: FieldErrors<IFormInput>
  reset: UseFormReset<IFormInput>

  // Loading state
  isLoading: boolean

  // Password visibility
  isShowPassword: boolean
  handleTogglePassword: () => void

  // Submit handler
  onSubmit: (data: IFormInput) => Promise<void>

  // Navigation handlers
  handleNavigateToResetPassword: () => void
  handleNavigateToCreateAccount: () => void
  handleBackToOption: () => void

  // Modal state (for potential future use)
  showModal: IShowModalType
  setShowModal: React.Dispatch<React.SetStateAction<IShowModalType>>
}

export function useRetailerLogin(navigation: any): UseRetailerLoginReturn {
  const [showModal, setShowModal] = useState<IShowModalType>(MODAL_INITIAL_STATE)
  const [isShowPassword, setIsShowPassword] = useState(true)

  const { mutateAsync: handleLoginPress, isPending: isLoading } =
    authMutationOptions.useLoginMutation()
  const { setUserAuth } = useRetailerAuth()
  const { clearRole } = useRole()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleTogglePassword = useCallback(() => {
    setIsShowPassword((prev) => !prev)
  }, [])

  const getFriendlyLoginErrorMessage = useCallback((error: any): string => {
    const backendMessage =
      error?.response?.data?.message || error?.error?.data?.message || error?.data?.message || ""
    const normalizedBackend = String(backendMessage).trim().toUpperCase()

    if (normalizedBackend === "USER ARE NOT FOUND") {
      return "User not found. Please check your credentials and try again."
    }

    if (normalizedBackend === "PASSWORD INVALID" || normalizedBackend === "INCORRECT PASSWORD") {
      return "Incorrect password. Please try again."
    }

    if (normalizedBackend) {
      return backendMessage
    }

    const rawErrorMessage = String(error?.message || "").trim()
    const isTechnicalMessage =
      rawErrorMessage.includes("Request failed with status code") ||
      rawErrorMessage.includes("Network Error")

    if (rawErrorMessage && !isTechnicalMessage) {
      return rawErrorMessage
    }

    return "Something went wrong. Please try again."
  }, [])

  const onSubmit = useCallback(
    async (data: IFormInput) => {
      try {
        const response = await handleLoginPress(data)
        if (response?.data?.status) {
          const isSubscribed = response?.data?.data?.isSubscribed.toString()
          const peerGroup = response?.data?.data?.peerGroup.toString()
          // save(STORAGE_KEYS.PREMIUM_USER, isSubscribed)
          console.log("isSubscribed =>", isSubscribed)
          save(STORAGE_KEYS.PREMIUM_USER, JSON.stringify(true))
          saveString(STORAGE_KEY.PEER_GROUP, peerGroup)
          save(STORAGE_KEYS.LOGIN_TIME, new Date().getTime())

          Toast.show({
            type: "success",
            text1: response?.data?.message?.toUpperCase(),
          })
          const result = response?.data?.data
          save(STORAGE_KEYS.PREMIUM_USER, JSON.stringify(true))
          saveString(STORAGE_KEY.PEER_GROUP, peerGroup)
          save(STORAGE_KEYS.LOGIN_TIME, new Date().getTime())
          save(STORAGE_KEYS.USER_ID, result?.retailer_id)
          save(STORAGE_KEYS.ACCESS_TOKEN, result?.accessToken)
          save(STORAGE_KEYS.REFRESH_TOKEN, result?.refreshToken)

          const userInfo = {
            role: USER_ROLE.RETAILER,
            authToken: result?.accessToken,
            userId: result?.retailer_id,
            refreshToken: result?.refreshToken,
          }
          save(STORAGE_KEYS.USER_INFO, userInfo)

          const payload = {
            accessToken: result?.accessToken,
            userId: result?.retailer_id,
            refreshToken: result?.refreshToken,
          }
          setUserAuth(payload)
          identifyAnalyticsUser(result?.retailer_id, {
            email: data.email,
            name: "retailer_user",
            role: USER_ROLE.RETAILER,
          })
          captureAnalyticsEvent("login_success", {
            role: USER_ROLE.RETAILER,
          })
          navigation.navigate(RetailerRoutes.TAB_CONTAINER)
          reset()
        } else {
          const errorMessage = response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED
          Toast.show({
            type: "error",
            text1: errorMessage.toUpperCase(),
          })
        }
      } catch (error: any) {
        console.error(CONSOLE_MESSAGES.LOGIN_REQUEST_FAILED, error)
        captureSentryException(error, {
          surface: "retailer_login",
          action: "submit_login",
        })
        const errorMessage = getFriendlyLoginErrorMessage(error)
        Toast.show({
          type: "error",
          text1: errorMessage,
        })
      }
    },
    [handleLoginPress, setUserAuth, navigation, reset, getFriendlyLoginErrorMessage],
  )

  const handleNavigateToResetPassword = useCallback(() => {
    navigation.navigate(RetailerRoutes.RESET_PASSWORD)
  }, [navigation])

  const handleNavigateToCreateAccount = useCallback(() => {
    navigation.navigate(RetailerRoutes.CREATE_NEW_ACCOUNT)
  }, [navigation])

  const handleBackToOption = useCallback(() => {
    clearRole()
    navigation.navigate(RetailerRoutes.OPTION)
  }, [clearRole, navigation])

  return {
    control,
    handleSubmit,
    errors,
    reset,
    isLoading,
    isShowPassword,
    handleTogglePassword,
    onSubmit,
    handleNavigateToResetPassword,
    handleNavigateToCreateAccount,
    handleBackToOption,
    showModal,
    setShowModal,
  }
}
