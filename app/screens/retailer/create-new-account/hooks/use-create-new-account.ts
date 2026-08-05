import { useCallback, useEffect, useMemo, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import { productQueryOptions } from "@/api/retailer/product"
import { WholeSellerRoutes } from "@/navigators/wholeSeller/routes"
import { retailerSignupSchema } from "@/utils/schema"

import {
  CONSOLE_MESSAGES,
  DEFAULT_VALUES,
  ERROR_MESSAGES,
  REQUIRED_FIELDS,
  SUCCESS_MESSAGES,
  TOAST_CONFIG,
  UI_TEXT,
} from "../lib/constants"
import type { IFormInput, KeyValueObject } from "../lib/types"

export function useCreateNewAccount(navigation: any) {
  const [selected, setSelectedValue] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [checkboxError, setCheckboxError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const { mutateAsync: handleRegisterPress, isPending: isLoading } =
    authMutationOptions.useRegisterMutation()
  const {
    data: peersData,
    error: peersError,
    status: peersStatus,
    isLoading: _isLoadingPeers,
  } = productQueryOptions.useStaticPeersQuery()

  const staticPeers = (peersData as { data?: string[] })?.data || []

  console.log(CONSOLE_MESSAGES.SELECTED, selected)
  console.log(peersStatus, CONSOLE_MESSAGES.STATIC_PEERS, peersData, "nmsnfda", peersError)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(retailerSignupSchema),
    defaultValues: {
      state: DEFAULT_VALUES.STATE,
    },
  })

  // Watch all form fields to validate form completion
  const watchedFields = watch()

  // Validate form fields completion
  useEffect(() => {
    const isAllFieldsFilled = REQUIRED_FIELDS.every((field) => {
      const value = watchedFields[field as keyof IFormInput]
      return value && value.toString().trim() !== ""
    })

    setIsFormValid(isAllFieldsFilled)
  }, [watchedFields])

  const onSubmit = useCallback(
    async (payloadData: IFormInput) => {
      // Validate checkbox first
      if (!agreeToTerms) {
        setCheckboxError(UI_TEXT.AGREE_TO_TERMS_ERROR)
        return
      }

      // Clear any previous checkbox error
      setCheckboxError("")

      const email = payloadData?.email
      const payload = {
        ...payloadData,
        agreement: true, // Always set to true since we removed the disclosure requirement
      }
      try {
        console.log(CONSOLE_MESSAGES.PAYLOAD, payload)
        const response = await handleRegisterPress(payload)

        if (response?.status) {
          console.log(CONSOLE_MESSAGES.REGISTER_API_RESPONSE, response)

          // Show success toast with 3-second timer
          Toast.show({
            type: "success",
            text1: SUCCESS_MESSAGES.ACCOUNT_CREATED,
            text2: SUCCESS_MESSAGES.REDIRECTING,
            visibilityTime: TOAST_CONFIG.SUCCESS_VISIBILITY_TIME,
          })

          // Navigate after a short delay to show the toast
          setTimeout(() => {
            navigation.navigate(WholeSellerRoutes.EMAIL_VERIFICATION, { email })
            reset()
          }, TOAST_CONFIG.NAVIGATION_DELAY)
        }
      } catch (error: any) {
        console.log(CONSOLE_MESSAGES.REGISTRATION_ERROR, error)

        // Extract error message from response
        let errorMessage = ERROR_MESSAGES.REGISTRATION_FAILED
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error?.message) {
          errorMessage = error.message
        } else if (error?.error?.data?.message) {
          errorMessage = error.error.data.message
        }

        Toast.show({
          type: "error",
          text1: errorMessage,
          text2: ERROR_MESSAGES.CHECK_INFO_AND_TRY_AGAIN,
        })
        console.error(CONSOLE_MESSAGES.REGISTRATION_REQUEST_FAILED, error)
      }
    },
    [agreeToTerms, handleRegisterPress, navigation, reset],
  )

  const handleToggleAgreeToTerms = useCallback(() => {
    setAgreeToTerms((prev) => !prev)
    // Clear error when user interacts with checkbox
    if (checkboxError) {
      setCheckboxError("")
    }
  }, [checkboxError])

  const handleSetSelectedValue = useCallback((value: string) => {
    setSelectedValue(value)
  }, [])

  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate("Login")
  }, [navigation])

  // Transform static peers array to dropdown format
  const dropdownArray = useMemo<KeyValueObject[]>(() => {
    const arrayValues: string[] = staticPeers
    const result: KeyValueObject[] = []

    arrayValues?.forEach((value, index) => {
      const keyValueObject: KeyValueObject = {
        key: String(index + 1),
        value: value,
      }
      result.push(keyValueObject)
    })

    return result
  }, [staticPeers])

  return {
    control,
    handleSubmit,
    errors,
    reset,
    watch,
    isLoading,
    agreeToTerms,
    checkboxError,
    isFormValid,
    selected,
    setSelectedValue,
    onSubmit,
    handleToggleAgreeToTerms,
    handleSetSelectedValue,
    handleNavigateToLogin,
    dropdownArray,
    staticPeers,
  }
}
