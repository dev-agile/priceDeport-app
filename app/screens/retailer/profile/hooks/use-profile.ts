import { useCallback, useEffect, useState } from "react"
import Toast from "react-native-toast-message"

import { useDeleteAccountMutation } from "@/api/retailer/auth/account-delete"
import { useWhoAmIQuery } from "@/api/retailer/auth/query-options"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { useRole } from "@/context/RoleContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { clear } from "@/utils/storage"

import { CONSOLE_MESSAGES, ERROR_MESSAGES, UI_TEXT } from "../lib/constants"
// import type { UseProfileReturn } from "../lib/types"

export function useProfile(navigation: any) {
  const { userAuth, clearAuth } = useRetailerAuth()
  const { clearRole } = useRole()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    data: profileResponse,
    isLoading,
    isError,
    error,
  } = useWhoAmIQuery(userAuth?.userId ? { userId: userAuth.userId } : undefined)
  const deleteAccountMutation = useDeleteAccountMutation()

  const profileData = profileResponse?.data
    ? {
        name: profileResponse.data.name || "",
        email: profileResponse.data.email || "",
        storeName: profileResponse.data.storeName || "",
        location: profileResponse.data.location || "",
        city: profileResponse.data.city || "",
        zipCode: profileResponse.data.zipCode || "",
        number: profileResponse.data.number || "",
        peerGroup: profileResponse.data.peerGroup || "",
      }
    : null

  useEffect(() => {
    if (profileResponse?.data) {
      console.log(CONSOLE_MESSAGES.PROFILE_FETCHED, profileResponse.data)
    }
  }, [profileResponse])

  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        ERROR_MESSAGES.PROFILE_FETCH_ERROR
      Toast.show({
        text1: errorMessage.toUpperCase(),
        type: "error",
      })
      console.error(CONSOLE_MESSAGES.PROFILE_FETCH_ERROR, error)
    }
  }, [isError, error])

  const handleLogout = useCallback(async () => {
    try {
      clear()
      clearAuth()
      clearRole()
      navigation.reset({
        index: 0,
        routes: [{ name: RetailerRoutes.OPTION }],
      })
      Toast.show({
        text1: UI_TEXT.LOGOUT_SUCCESS,
        type: "success",
      })
      console.log(CONSOLE_MESSAGES.LOGOUT_SUCCESS)
    } catch (error) {
      Toast.show({
        text1: UI_TEXT.LOGOUT_ERROR,
        type: "error",
      })
      console.error(CONSOLE_MESSAGES.LOGOUT_ERROR, error)
    }
  }, [clearAuth, clearRole, navigation])

  const handleDeleteAccount = useCallback(() => {
    setShowDeleteModal(true)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (!userAuth?.userId) {
      Toast.show({
        text1: ERROR_MESSAGES.DELETE_ACCOUNT_ERROR,
        type: "error",
      })
      setShowDeleteModal(false)
      return
    }

    try {
      await deleteAccountMutation.mutateAsync(userAuth.userId)
      console.log(CONSOLE_MESSAGES.DELETE_ACCOUNT_SUCCESS)
      setShowDeleteModal(false)
      await handleLogout()
    } catch (error) {
      console.error(CONSOLE_MESSAGES.DELETE_ACCOUNT_ERROR, error)
      setShowDeleteModal(false)
    }
  }, [userAuth?.userId, deleteAccountMutation, handleLogout])

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false)
  }, [])

  return {
    profileData,
    isLoading,
    isError,
    error,
    showDeleteModal,
    isDeleting: deleteAccountMutation.isPending,
    handleLogout,
    handleDeleteAccount,
    handleConfirmDelete,
    handleCancelDelete,
  }
}
