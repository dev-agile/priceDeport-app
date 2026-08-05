import { forwardRef, useCallback, useMemo } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"

import type { CartItem } from "@/api/retailer/order"
import { colors } from "@/theme/colors"

import { styles } from "./remove-item-bottom-sheet.styles"

const CONFIRMATION_MESSAGE = "This item will be removed from the cart. Do you want to continue?"

interface RemoveItemBottomSheetProps {
  item: CartItem | null
  onCancel: () => void
  onProceed: () => void | Promise<void>
  onDismiss?: () => void
  isLoading: boolean
}

export const RemoveItemBottomSheet = forwardRef<
  import("@gorhom/bottom-sheet").BottomSheetModal,
  RemoveItemBottomSheetProps
>(function RemoveItemBottomSheet({ item, onCancel, onProceed, onDismiss, isLoading }, ref) {
  const snapPoints = useMemo(() => ["45%"], [])

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) onDismiss?.()
    },
    [onDismiss],
  )

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    [],
  )

  const handleProceed = useCallback(async () => {
    if (isLoading || !item) return
    await onProceed()
  }, [isLoading, item, onProceed])

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onChange={handleSheetChange}
    >
      <BottomSheetView style={styles.contentContainer}>
        {item ? (
          <>
            <Text style={styles.title}>Remove Item</Text>
            <Text style={styles.productName} numberOfLines={2}>
              {item.product_desc}
            </Text>
            {item.subCategory_desc != null && item.subCategory_desc !== "" && (
              <Text style={styles.description} numberOfLines={2}>
                {item.subCategory_desc}
              </Text>
            )}
            <Text style={styles.productId}>ID: {item.product_id}</Text>
            <Text style={styles.wholesalerText}>{item.wholesaler_id}</Text>
            <Text style={styles.confirmationMessage}>{CONFIRMATION_MESSAGE}</Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.proceedButton, isLoading && styles.proceedButtonDisabled]}
                onPress={handleProceed}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.palette.neutral100} />
                ) : (
                  <Text style={styles.proceedButtonText}>Proceed</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </BottomSheetView>
    </BottomSheetModal>
  )
})
