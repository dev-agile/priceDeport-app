import { useCallback, useEffect, useMemo, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useFocusEffect } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import Toast from "react-native-toast-message"

import { useWhoAmIQuery } from "@/api/retailer/auth/query-options"
import { profileMutationOptions, profileQueryOptions } from "@/api/retailer/profile"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { editProfileSchema } from "@/utils/schema/edit-profile-schema"
import { saveString } from "@/utils/storage"

import { UI_TEXT } from "../lib/constants"
import type { EditProfileFormValues } from "../lib/types"

export function useEditProfile(navigation: any) {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId ?? ""

  const { data: profileResponse } = useWhoAmIQuery(retailerId ? { userId: retailerId } : undefined)
  const { data: peersResponse } = profileQueryOptions.useGetStaticPeerGroupsQuery()
  const updateProfileMutation = profileMutationOptions.useUpdateProfileMutation()

  const profileData = profileResponse?.data
    ? {
        name: profileResponse.data.name ?? "",
        storeName: profileResponse.data.storeName ?? "",
        number: profileResponse.data.number ?? "",
        location: profileResponse.data.location ?? "",
        city: profileResponse.data.city ?? "",
        zipCode: profileResponse.data.zipCode ?? "",
        peerGroup: profileResponse.data.peerGroup ?? "",
        state: profileResponse.data.location ?? "",
      }
    : null

  const defaultValues: EditProfileFormValues = useMemo(
    () => ({
      name: profileData?.name ?? "",
      storeName: profileData?.storeName ?? "",
      number: profileData?.number ?? "",
      location: profileData?.location ?? "",
      city: profileData?.city ?? "",
      zipCode: profileData?.zipCode ?? "",
      peerGroup: profileData?.peerGroup ?? "",
      state: profileData?.state ?? "",
    }),
    [
      profileData?.name,
      profileData?.storeName,
      profileData?.number,
      profileData?.location,
      profileData?.city,
      profileData?.zipCode,
      profileData?.peerGroup,
      profileData?.state,
    ],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<EditProfileFormValues>({
    resolver: yupResolver(editProfileSchema),
    defaultValues,
  })

  const watchedValues = watch()
  const [btnDisable, setBtnDisable] = useState(true)

  // Increment on every screen focus so the reset effect re-fires even if profileData didn't change
  const [focusCount, setFocusCount] = useState(0)

  useFocusEffect(
    useCallback(() => {
      setFocusCount((c) => c + 1)
    }, []),
  )

  // Reset form to the server-saved values:
  //   - on initial data load (profileData?.name dep)
  //   - every time the screen gains focus (focusCount dep) — discards any unsaved changes
  useEffect(() => {
    if (!profileData) return
    reset(defaultValues)
    // defaultValues is always current in this render because focusCount/profileData?.name
    // changing caused a re-render that recomputed defaultValues before this effect ran.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusCount, profileData?.name])

  useEffect(() => {
    const hasChange =
      defaultValues.name !== watchedValues.name ||
      defaultValues.storeName !== watchedValues.storeName ||
      defaultValues.number !== watchedValues.number ||
      defaultValues.location !== watchedValues.location ||
      defaultValues.city !== watchedValues.city ||
      defaultValues.zipCode !== watchedValues.zipCode ||
      defaultValues.peerGroup !== watchedValues.peerGroup
    setBtnDisable(!hasChange)
  }, [watchedValues, defaultValues])

  const peerGroups = useMemo(() => {
    const list = (peersResponse as { data?: string[] })?.data ?? []
    return list
  }, [peersResponse])

  const onSubmit = useCallback(
    async (data: EditProfileFormValues) => {
      if (!retailerId) return
      try {
        saveString(STORAGE_KEY.PEER_GROUP, data.peerGroup ?? "")
        const response = await updateProfileMutation.mutateAsync({
          retailerId,
          data: {
            storeName: data.storeName,
            name: data.name,
            number: data.number,
            location: data.location,
            city: data.city,
            zipCode: data.zipCode,
            peerGroup: data.peerGroup,
            state: data.state,
          },
        })
        const status = response?.status ?? response?.data?.status
        const message = response?.message ?? response?.data?.message
        if (status) {
          Toast.show({
            type: "success",
            text1: (message ?? UI_TEXT.UPDATE).toUpperCase(),
          })
          setTimeout(() => {
            if (navigation.goBack) {
              navigation.goBack()
            }
          }, 100)
        }
      } catch (error) {
        console.error("Edit profile update failed", error)
      }
    },
    [retailerId, updateProfileMutation, navigation],
  )

  return {
    control,
    handleSubmit,
    errors,
    btnDisable,
    isLoading: updateProfileMutation.isPending,
    profileData,
    peerGroups,
    onSubmit,
    isProfileLoading: !profileData && !!retailerId,
  }
}
