import { useState, useEffect, useCallback } from "react"
import { Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { authQueryOptions } from "@/api/retailer/auth"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadNormalizedPeerGroup } from "@/utils/peer-group"

import { BUTTONS, MADRCHECKER_URL, UI_TEXT } from "../lib/constants"
import type { UseHomeOptionListReturn } from "../lib/types"

export function useHomeOptionList(): UseHomeOptionListReturn {
  const [peerGroup, setPeerGroup] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const { data, isSuccess } = authQueryOptions.useWhoAmIQuery()
  const navigation = useNavigation()

  useEffect(() => {
    const getPeerGroupDetails = () => {
      const key = loadNormalizedPeerGroup()
      setPeerGroup(key || null)
    }

    getPeerGroupDetails()

    // if (isSuccess && data) {
    //   if (data.data.isSubscribed) {
    //     setIsPremium(true);
    //   } else {
    //     setShowPopup(true);
    //   }
    // }
  }, [isSuccess, data])

  const navigateHome = useCallback(
    (pathToNavigate: string) => {
      switch (pathToNavigate) {
        case "Scan Item":
          // @ts-expect-error - navigation type doesn't include all RetailerRoutes
          navigation.navigate(RetailerRoutes.TAB_CONTAINER, {
            screen: RetailerRoutes.SCAN,
          })
          break
        case "Search Item":
          // @ts-expect-error - navigation type doesn't include all RetailerRoutes
          navigation.navigate(RetailerRoutes.SEARCH)
          break
        case "Favorites":
          // @ts-expect-error - navigation type doesn't include all RetailerRoutes
          navigation.navigate(RetailerRoutes.FAVOURITES, {
            peerGroup: peerGroup,
          })
          break
        case "Upload MADR Peer Group File":
          // @ts-expect-error - navigation type doesn't include all RetailerRoutes
          navigation.navigate(RetailerRoutes.UPLOAD_FILE)
          break
      }
    },
    [navigation, peerGroup],
  )

  const madrCheckerLink = useCallback(async () => {
    const supported = await Linking.canOpenURL(MADRCHECKER_URL)
    console.log(supported)
    if (supported) {
      await Linking.openURL(MADRCHECKER_URL)
    } else {
      Toast.show({
        text1: UI_TEXT.INVALID_URL_ERROR,
        type: "error",
      })
    }
  }, [])

  return {
    showPopup,
    setShowPopup,
    navigateHome,
    madrCheckerLink,
    buttons: [...BUTTONS],
    data,
    isSuccess,
  }
}
