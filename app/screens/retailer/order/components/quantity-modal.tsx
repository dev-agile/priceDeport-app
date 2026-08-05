import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { styles } from "./quantity-modal.styles"
import { UI_TEXT } from "../lib/constants"
import type { QuantityModalProps } from "../lib/types"

export default function QuantityModal({
  visible,
  item,
  quantity,
  onQuantityChange,
  onSubmit,
  onClose,
  isLoading,
}: QuantityModalProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity)

  useEffect(() => {
    if (visible && item) {
      setLocalQuantity(item.items.toString())
    }
  }, [visible, item])

  const numericQuantity = useMemo(() => {
    const q = Number(localQuantity)
    return Number.isNaN(q) || q < 0 ? 0 : Math.floor(q)
  }, [localQuantity])

  const unitPrice = item?.price ?? 0
  const totalPrice = useMemo(() => numericQuantity * unitPrice, [numericQuantity, unitPrice])

  const isValidQuantity = useMemo(
    () => localQuantity !== "" && numericQuantity >= 0,
    [localQuantity, numericQuantity],
  )
  const canSubmit = isValidQuantity && numericQuantity > 0 && !isLoading

  const handleQuantityChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "")
    setLocalQuantity(cleaned)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return
    onQuantityChange(localQuantity)
    onSubmit()
  }, [canSubmit, localQuantity, onQuantityChange, onSubmit])

  const handleCancel = useCallback(() => {
    Keyboard.dismiss()
    onClose()
  }, [onClose])

  const handleBackdropPress = useCallback(() => {
    Keyboard.dismiss()
    handleCancel()
  }, [handleCancel])

  const handleSubmitEditing = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  if (!visible) return null

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
      // statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.card}>
                <Text style={styles.title}>{UI_TEXT.QUANTITY_MODAL_TITLE}</Text>

                {item && (
                  <View style={styles.productRow}>
                    {item.image_url ? (
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.productImagePlaceholder} />
                    )}
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {item.product_desc}
                      </Text>
                      <Text style={styles.productId}>ID: {item.product_id}</Text>
                      <Text style={styles.wholesalerText} numberOfLines={1}>
                        {item.wholesaler_id}
                      </Text>
                    </View>
                  </View>
                )}

                <View style={styles.divider} />

                <View style={styles.quantityInputContainer}>
                  <TextInput
                    style={styles.quantityInput}
                    value={localQuantity}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                    returnKeyType="done"
                    textAlign="center"
                    editable={!isLoading}
                    onSubmitEditing={handleSubmitEditing}
                  />
                </View>

                <View style={styles.pricingSection}>
                  <Text style={styles.unitPriceText}>
                    Unit Price: ${Number(unitPrice).toFixed(2)}
                  </Text>
                  <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                    disabled={isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelButtonText}>{UI_TEXT.QUANTITY_MODAL_CANCEL}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      (!canSubmit || isLoading) && styles.submitButtonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={!canSubmit || isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.submitButtonText}>{UI_TEXT.QUANTITY_MODAL_SUBMIT}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
}
