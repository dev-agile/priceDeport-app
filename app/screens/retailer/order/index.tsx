import { useCallback, useEffect, useRef, useState } from "react"
import type { ComponentRef } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { SafeAreaView } from "react-native-safe-area-context"

import type { CartItem } from "@/api/retailer/order"
import ButtonField from "@/components/common-components/button/button"
import { HeaderComponent } from "@/components/common-components/header/header"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"

import QuantityModal from "./components/quantity-modal"
import { RemoveItemBottomSheet } from "./components/remove-item-bottom-sheet"
import { useOrder } from "./hooks/use-order"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"
import { Images } from "../../../../assets/Images/wholeSeller"

function cartItemKey(item: CartItem) {
  return `${item.product_id}-${item.wholesaler_id}`
}

export default function Order({ navigation }: any) {
  const {
    cartData,
    isLoading,
    showQuantityModal,
    selectedItem,
    quantityInput,
    setShowQuantityModal,
    setSelectedItem,
    setQuantityInput,
    handleIncrement,
    handleDecrement,
    handleQuantityPress,
    handleQuantitySubmit,
    handleRemoveItem,
    handlePlaceOrder,
  } = useOrder(navigation)

  const [selectedItemForRemoval, setSelectedItemForRemoval] = useState<CartItem | null>(null)
  const removeSheetRef = useRef<ComponentRef<typeof BottomSheetModal>>(null)

  useEffect(() => {
    if (selectedItemForRemoval) {
      removeSheetRef.current?.present()
    }
  }, [selectedItemForRemoval])

  const handleRemovePress = useCallback((item: CartItem) => {
    setSelectedItemForRemoval(item)
  }, [])

  const handleRemoveCancel = useCallback(() => {
    removeSheetRef.current?.dismiss()
    setSelectedItemForRemoval(null)
  }, [])

  const handleRemoveDismiss = useCallback(() => {
    setSelectedItemForRemoval(null)
  }, [])

  const handleRemoveProceed = useCallback(async () => {
    if (!selectedItemForRemoval) return
    await handleRemoveItem(selectedItemForRemoval)
    removeSheetRef.current?.dismiss()
    setSelectedItemForRemoval(null)
  }, [selectedItemForRemoval, handleRemoveItem])

  const renderCartItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <TouchableOpacity
        style={styles.cardBox}
        onPress={() =>
          navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
            productDetails: item,
            singleProductId: item?.product_id,
          })
        }
      >
        <TouchableOpacity
          style={styles.removeIconWrapper}
          onPress={() => handleRemovePress(item)}
          disabled={isLoading}
          activeOpacity={0.7}
          accessibilityLabel="Remove item"
          accessibilityRole="button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image source={Icon.CROSS} style={styles.removeIcon} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.cardBoxLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={item?.image_url ? { uri: item.image_url } : Images.SoyaMilk}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productDesc} numberOfLines={2}>
              {item.product_desc}
            </Text>
            {item.subCategory_desc != null && item.subCategory_desc !== "" && (
              <Text style={styles.productCategory} numberOfLines={1}>
                {item.subCategory_desc}
              </Text>
            )}
            <Text style={styles.wholesalerText} numberOfLines={1}>
              {item.wholesaler_id}
            </Text>
            <Text style={styles.priceText}>${Number(item.price).toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, styles.quantityButtonMinus]}
            onPress={() => handleDecrement(item)}
            disabled={isLoading}
          >
            <Text style={[styles.quantityButtonText, styles.quantityButtonTextMinus]}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleQuantityPress(item)}
            disabled={isLoading}
            style={styles.quantityPillTouchable}
          >
            <Text style={styles.quantityText}>{item.items}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quantityButton, styles.quantityButtonPlus]}
            onPress={() => handleIncrement(item)}
            disabled={isLoading}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    [handleIncrement, handleDecrement, handleQuantityPress, handleRemovePress, isLoading],
  )

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.ACTIVE_GREEN} />
        </View>
      )
    }

    if (!cartData || cartData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{UI_TEXT.EMPTY_CART}</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={cartData}
        keyExtractor={cartItemKey}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    )
  }

  const totalItemCount =
    (cartData?.length ?? 0) ? (cartData ?? []).reduce((sum, i) => sum + i.items, 0) : 0
  const totalPrice =
    (cartData?.length ?? 0) ? (cartData ?? []).reduce((sum, i) => sum + i.price * i.items, 0) : 0
  const showFooter = !isLoading && cartData && cartData.length > 0

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent value="My Cart" />

      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.content}>{renderContent()}</View>

        {showFooter && (
          <View style={styles.footer}>
            <View style={styles.footerSummaryLeft}>
              <Text style={styles.footerSummaryTotalLabel}>
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
              </Text>
              <Text style={styles.footerSummaryTotalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.saveOrderButton}>
              <ButtonField
                value={UI_TEXT.SAVE_ORDER}
                onPress={handlePlaceOrder}
                isDisabled={isLoading}
                isLoading={isLoading}
              />
            </View>
          </View>
        )}
      </SafeAreaView>

      <QuantityModal
        visible={showQuantityModal}
        item={selectedItem}
        quantity={quantityInput}
        onQuantityChange={setQuantityInput}
        onSubmit={handleQuantitySubmit}
        onClose={() => {
          setShowQuantityModal(false)
          setSelectedItem(null)
          setQuantityInput("")
        }}
        isLoading={isLoading}
      />

      <RemoveItemBottomSheet
        ref={removeSheetRef}
        item={selectedItemForRemoval}
        onCancel={handleRemoveCancel}
        onProceed={handleRemoveProceed}
        onDismiss={handleRemoveDismiss}
        isLoading={isLoading}
      />
    </View>
  )
}
