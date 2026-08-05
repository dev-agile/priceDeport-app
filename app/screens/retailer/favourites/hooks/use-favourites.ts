import { useCallback, useEffect, useMemo, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import type { FavouriteProductItem, PriceEntry } from "@/api/retailer/favourites"
import { useGetFavouritesQuery } from "@/api/retailer/favourites"
import { useToggleFavoriteMutation } from "@/api/retailer/product/query-options"
import { profileQueryOptions } from "@/api/retailer/profile"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadNormalizedPeerGroup } from "@/utils/peer-group"
import { loadString, saveString } from "@/utils/storage"

import { STORAGE_KEYS, UI_TEXT } from "../lib/constants"
import type { FavouritesFlatItem, FavouritesListItem } from "../lib/types"

function getLatestPriceForPeerGroup(
  item: FavouriteProductItem,
  peerGroupKey: string | null,
  fallbackPeerGroupKey?: string | null,
): string {
  if (!item?.price || typeof item.price !== "object") return "0"
  const key = peerGroupKey || fallbackPeerGroupKey
  if (!key) return "0"
  const prices: PriceEntry[] = item.price[key]
  if (!Array.isArray(prices) || prices.length === 0) return "0"
  const sorted = [...prices].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
  return sorted[0]?.price ?? "0"
}

function buildFlatListData(
  items: FavouriteProductItem[],
  currentPeerGroup: string | null,
  routePeerGroup?: string | null,
): FavouritesFlatItem[] {
  if (!items?.length) return []
  const byCategory = items.reduce<Record<string, FavouriteProductItem[]>>((acc, item) => {
    const cat = item.category_desc || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})
  const flat: FavouritesFlatItem[] = []
  Object.entries(byCategory).forEach(([title, list]) => {
    flat.push({ isHeader: true, title: `${UI_TEXT.CATEGORY_PREFIX}${title}` })
    list.forEach((item) => {
      const latestPrice = getLatestPriceForPeerGroup(item, currentPeerGroup, routePeerGroup)
      flat.push({ ...item, isHeader: false, latestPrice })
    })
  })
  return flat
}

export function useFavourites(navigation: any, route?: { params?: { peerGroup?: string } }) {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId ?? ""
  const routePeerGroup = route?.params?.peerGroup ?? null

  const [currentPeerGroup, setCurrentPeerGroup] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [optimisticallyRemovedIds, setOptimisticallyRemovedIds] = useState<Record<string, boolean>>(
    {},
  )
  const [unlikeLoadingIds, setUnlikeLoadingIds] = useState<Record<string, boolean>>({})
  const [banner, setBanner] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  })

  const {
    data: favouritesResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFavouritesQuery(retailerId || "")
  const toggleFavoriteMutation = useToggleFavoriteMutation()
  const { data: peersResponse } = profileQueryOptions.useGetStaticPeerGroupsQuery()

  const isSubscribed = useMemo(() => {
    const val = loadString(STORAGE_KEYS.PREMIUM_USER)
    // return val === "true"
    console.log("val", val)
    return true
  }, [])

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  useEffect(() => {
    const saved = loadNormalizedPeerGroup()
    setCurrentPeerGroup(saved || null)
  }, [])

  useEffect(() => {
    if (
      isError &&
      error &&
      (error as { response?: { status?: number } })?.response?.status !== 400
    ) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.FAILED_TO_LOAD,
        text2: UI_TEXT.SOME_FEATURES_UNAVAILABLE,
      })
      console.error("Favourites load error", error)
    }
  }, [isError, error])

  const favouritesDataRaw = (favouritesResponse as { data?: FavouriteProductItem[] })?.data ?? []
  const favouritesData = useMemo(
    () => favouritesDataRaw.filter((item) => !optimisticallyRemovedIds[item.product_id]),
    [favouritesDataRaw, optimisticallyRemovedIds],
  )
  const flatData = useMemo(
    () => buildFlatListData(favouritesData, currentPeerGroup, routePeerGroup),
    [favouritesData, currentPeerGroup, routePeerGroup],
  )

  const peerGroupsList = useMemo(() => {
    const list = (peersResponse as { data?: string[] })?.data ?? []
    return list
  }, [peersResponse])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (e) {
      console.error(e)
    } finally {
      setRefreshing(false)
    }
  }, [refetch])

  const openPeerGroupModal = useCallback(() => {
    return isSubscribed && favouritesData.length > 0
  }, [isSubscribed, favouritesData.length])

  const selectPeerGroup = useCallback((group: string) => {
    setCurrentPeerGroup(group)
    saveString(STORAGE_KEY.PEER_GROUP, group)
    setBanner({
      visible: true,
      message: UI_TEXT.SWITCHED_TO(group),
    })
  }, [])

  const dismissBanner = useCallback(() => {
    setBanner((prev) => (prev.visible ? { ...prev, visible: false } : prev))
  }, [])

  const onItemPress = useCallback(
    (item: FavouritesListItem) => {
      navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
        productDetails: item,
        singleProductId: item.product_id,
      })
    },
    [navigation],
  )

  const onSubscribePress = useCallback(() => {
    navigation.navigate(RetailerRoutes.SUBSCRIPTIONPLAN)
  }, [navigation])

  const handleUnlike = useCallback(
    async (productId: string) => {
      if (!retailerId || !productId) return

      setOptimisticallyRemovedIds((prev) => ({ ...prev, [productId]: true }))
      setUnlikeLoadingIds((prev) => ({ ...prev, [productId]: true }))

      try {
        await toggleFavoriteMutation.mutateAsync({
          retailerId,
          productId,
        })
        Toast.show({
          type: "success",
          text1: "Item removed from favorites",
        })
      } catch {
        setOptimisticallyRemovedIds((prev) => {
          const next = { ...prev }
          delete next[productId]
          return next
        })
        Toast.show({
          type: "error",
          text1: "FAILED TO UPDATE FAVORITE",
        })
      } finally {
        setUnlikeLoadingIds((prev) => {
          const next = { ...prev }
          delete next[productId]
          return next
        })
      }
    },
    [retailerId, toggleFavoriteMutation],
  )

  return {
    flatData,
    isLoading,
    favouritesData,
    isSubscribed,
    currentPeerGroup,
    banner,
    dismissBanner,
    peerGroupsList,
    refreshing,
    onRefresh,
    canChangePeerGroup: openPeerGroupModal(),
    selectPeerGroup,
    onItemPress,
    handleUnlike,
    onSubscribePress,
    unlikeLoadingIds,
    // isPeerGroupButtonDisabled: !isSubscribed || favouritesData.length === 0,
    isPeerGroupButtonDisabled: favouritesData.length === 0,
  }
}
