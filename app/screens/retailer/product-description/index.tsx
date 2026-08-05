import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import type { ComponentRef } from "react"
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import type { CartItem } from "@/api/retailer/order"
import { WholesalerData } from "@/api/retailer/product/types"
import { HeaderComponent } from "@/components/common-components/header/header"
import { commonStyles } from "@/theme/styles"

import { PeerGroupModal } from "./components/peer-group-modal"
import { PeerGroupPriceCard } from "./components/peer-group-price-card"
import { PeerGroupSelector } from "./components/peer-group-selector"
import { ProductHeaderCard } from "./components/product-header-card"
import { QuantityModal } from "./components/quantity-modal"
import { SortBottomSheet } from "./components/sort-bottom-sheet"
import { SortButton } from "./components/sort-button"
import { WholesalerCard } from "./components/wholesaler-card"
import { useProductDescription } from "./hooks/use-product-description"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function ProductDescription() {
  const navigation = useNavigation()
  const {
    productData,
    wholesalerData,
    adminPrice,
    isFavorite,
    isLoading,
    isError,
    error,
    cartItems,
    peerGroup,
    selectedPeerGroup,
    isSubscribed,
    showPeerGroupModal,
    selectedWholesaler,
    handleToggleFavorite,
    // handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleQuantitySubmit,
    handleSortSelect,
    handlePeerGroupSelect,
    handleNavigateToPriceHistory,
    setShowPeerGroupModal,
    setSelectedWholesaler,
  } = useProductDescription(navigation)

  const sortBottomSheetRef =
    useRef<ComponentRef<typeof import("@gorhom/bottom-sheet").BottomSheetModal>>(null)

  const peerGroups = useMemo(() => {
    if (!adminPrice || typeof adminPrice !== "object") return []
    return Object.keys(adminPrice).filter((group) => Array.isArray(adminPrice[group]))
  }, [adminPrice])

  // Local UI state for peer group selection (defaults to first peer group when available)
  const [uiSelectedPeerGroup, setUiSelectedPeerGroup] = useState<string | null>(null)

  // Default to user peer group when present in adminPrice, else fallback to first available group.
  useEffect(() => {
    if (peerGroups.length === 0) return
    setUiSelectedPeerGroup((prev) => {
      const userGroupInList =
        selectedPeerGroup && peerGroups.includes(selectedPeerGroup) ? selectedPeerGroup : null
      const firstGroup = peerGroups[0]
      if (prev && peerGroups.includes(prev)) return prev
      if (userGroupInList) return userGroupInList
      return firstGroup
    })
  }, [peerGroups, selectedPeerGroup])

  // Handle UI-level peer group selection
  const handleUiPeerGroupSelect = (peerGroup: string) => {
    setUiSelectedPeerGroup(peerGroup)
    // Also update the hook's peer group if subscribed
    if (isSubscribed) {
      handlePeerGroupSelect(peerGroup)
    }
  }

  // Get cart item for wholesaler
  const getCartItem = (wholesalerId: string): CartItem | undefined => {
    return cartItems.find(
      (item) => item.wholesaler_id === wholesalerId && item.product_id === productData?.product_id,
    )
  }

  const getLatestPeerGroupEntry = useCallback(
    (group: string) => {
      if (!adminPrice || !group) return null
      const entries = adminPrice[group]
      if (!Array.isArray(entries) || entries.length === 0) return null
      return [...entries].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())[0]
    },
    [adminPrice],
  )

  // Get price for peer group
  // const getPeerGroupPrice = (wholesaler: any) => {
  //   if (!adminPrice || !uiSelectedPeerGroup) return wholesaler.price
  //   const latestEntry = getLatestPeerGroupEntry(uiSelectedPeerGroup)
  //   return latestEntry?.price || wholesaler.price
  // }

  // Get peer group price for display
  const peerGroupPrice = useMemo(() => {
    if (!uiSelectedPeerGroup) return null
    const latestEntry = getLatestPeerGroupEntry(uiSelectedPeerGroup)
    return {
      price: latestEntry?.price ?? null,
      date: latestEntry?.Date ?? undefined,
    }
  }, [getLatestPeerGroupEntry, uiSelectedPeerGroup])

  // Handle add to cart - opens modal
  const handleAddToCartWithModal = useCallback(
    (wholesaler: WholesalerData) => {
      setSelectedWholesaler(wholesaler)
    },
    [setSelectedWholesaler],
  )

  // Handle quantity confirm from modal
  const handleQuantityConfirm = useCallback(
    async (quantity: number) => {
      if (!selectedWholesaler) return
      try {
        await (handleQuantitySubmit as (overrideQuantity?: number) => Promise<void>)(quantity)
        setSelectedWholesaler(null)
      } catch (error) {
        console.log("error =>", error)
        Toast.show({
          type: "error",
          text1: "Failed to add to cart",
        })
      }
    },
    [selectedWholesaler, handleQuantitySubmit, setSelectedWholesaler],
  )

  // Render wholesaler item
  const renderWholesalerItem = ({
    item: wholesaler,
    index,
  }: {
    item: WholesalerData
    index: number
  }) => {
    const cartItem = getCartItem(wholesaler.wholesaler_id)
    const isInCart = !!cartItem
    const showBlur = !isSubscribed && index >= 2
    // const unitPrice = getPeerGroupPrice(wholesaler)
    const unitPrice = wholesaler.price
    const displayUnitPrice =
      (unitPrice === 0 || unitPrice > 0) && !isNaN(unitPrice) ? unitPrice : "--"
    const casePrice = wholesaler.casePrice ?? "--"

    return (
      <View style={showBlur ? styles.blurredContainer : undefined}>
        <WholesalerCard
          wholesalerName={wholesaler.name}
          updatedDate={wholesaler.date}
          unitPrice={displayUnitPrice}
          casePrice={casePrice}
          // onPress={() => handleNavigateToSalesGraph(wholesaler)}
          onPress={() => {}}
          onAddToCart={() => handleAddToCartWithModal(wholesaler)}
          disabled={showBlur}
          isLoading={false}
          isInCart={isInCart}
          quantity={cartItem?.items || 0}
          onIncrement={() => handleIncrement(wholesaler)}
          onDecrement={() => handleDecrement(wholesaler)}
          onQuantityPress={() => handleAddToCartWithModal(wholesaler)}
        />
      </View>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
      </View>
    )
  }

  // Error or empty state
  if (isError || !productData) {
    const backendMessage = (error as any)?.response?.data?.message
    const isProductNotFound =
      typeof backendMessage === "string" &&
      backendMessage.toUpperCase().includes("PRODUCT NOT FOUND")
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {isError
            ? isProductNotFound
              ? UI_TEXT.PRODUCT_NOT_FOUND
              : UI_TEXT.SOMETHING_WENT_WRONG
            : UI_TEXT.FREE_TRIAL_OVER}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent value="Product Description" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 1. Product Header Card */}
        <ProductHeaderCard
          imageUrl={productData.image_url}
          productName={productData.product_desc}
          productId={productData.product_id}
          category={productData.category_desc}
          subCategory={productData.subCategory_desc}
          onPriceHistoryPress={handleNavigateToPriceHistory}
          onFavoritePress={handleToggleFavorite}
          isFavorite={isFavorite}
        />

        {/* 2. Peer Group Price Section */}
        {peerGroups.length > 0 && (
          <View style={styles.sectionPeerGroupPrice}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Peer Group Price</Text>
              <PeerGroupSelector
                peerGroups={peerGroups}
                selectedPeerGroup={uiSelectedPeerGroup}
                onSelect={handleUiPeerGroupSelect}
              />
            </View>
            {uiSelectedPeerGroup && (
              <PeerGroupPriceCard
                peerGroupName={uiSelectedPeerGroup}
                price={peerGroupPrice?.price}
                updatedDate={peerGroupPrice?.date}
              />
            )}
          </View>
        )}

        {/* 3. Wholesaler Prices Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wholesaler Prices</Text>
            <SortButton onPress={() => sortBottomSheetRef.current?.present()} />
          </View>

          <FlatList
            data={wholesalerData}
            keyExtractor={(item) => item.wholesaler_id}
            renderItem={renderWholesalerItem}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No wholesalers available</Text>
              </View>
            }
          />
        </View>
      </ScrollView>

      {/* Modals & Bottom Sheets */}
      <SortBottomSheet ref={sortBottomSheetRef} onSelect={handleSortSelect} />
      <QuantityModal
        visible={!!selectedWholesaler}
        productName={productData.product_desc}
        wholesalerName={selectedWholesaler?.name ?? ""}
        userPeerGroup={peerGroup || "N/A"}
        unitPrice={
          selectedWholesaler
            ? Number(selectedWholesaler.price) > 0 && !isNaN(Number(selectedWholesaler.price))
              ? selectedWholesaler.price
              : 0
            : 0
        }
        onClose={() => setSelectedWholesaler(null)}
        onConfirm={handleQuantityConfirm}
      />
      <PeerGroupModal
        visible={showPeerGroupModal}
        peerGroups={peerGroups}
        selectedPeerGroup={selectedPeerGroup}
        onSelect={handlePeerGroupSelect}
        onClose={() => setShowPeerGroupModal(false)}
      />

      <Toast />
    </View>
  )
}
