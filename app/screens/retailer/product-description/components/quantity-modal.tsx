import { useCallback, useEffect, useMemo, useState } from "react"
import {
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

interface QuantityModalProps {
  visible: boolean
  productName: string
  wholesalerName: string
  userPeerGroup: string
  unitPrice: number | string
  onClose: () => void
  onConfirm: (quantity: number) => Promise<void>
}

export function QuantityModal({
  visible,
  productName,
  wholesalerName,
  userPeerGroup,
  unitPrice,
  onClose,
  onConfirm,
}: QuantityModalProps) {
  const [quantity, setQuantity] = useState("1")
  const [isLoading, setIsLoading] = useState(false)

  // Reset quantity when modal opens
  useEffect(() => {
    if (visible) setQuantity("1")
  }, [visible])

  const numericUnitPrice = useMemo(() => {
    if (typeof unitPrice === "number" && !isNaN(unitPrice)) return unitPrice
    if (typeof unitPrice === "string") {
      const parsed = parseFloat(unitPrice)
      return isNaN(parsed) ? 0 : parsed
    }
    return 0
  }, [unitPrice])

  // Valid when quantity is a positive integer (for button and submit)
  const isValidQuantity = useMemo(() => {
    const q = Number(quantity)
    return !Number.isNaN(q) && q >= 1 && quantity !== ""
  }, [quantity])

  // Total: 0 when invalid, otherwise quantity * unitPrice (useMemo)
  const totalPrice = useMemo(() => {
    const q = Number(quantity)
    if (quantity === "" || Number.isNaN(q) || q <= 0) return 0
    return Math.floor(q) * numericUnitPrice
  }, [quantity, numericUnitPrice])

  // For submit: use positive integer only
  const numericQuantityForSubmit = useMemo(() => {
    if (!isValidQuantity) return 1
    return Math.max(1, Math.floor(Number(quantity)))
  }, [quantity, isValidQuantity])

  const handleQuantityChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "")
    setQuantity(cleaned)
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!isValidQuantity || isLoading) return
    setIsLoading(true)
    try {
      await onConfirm(numericQuantityForSubmit)
      setQuantity("1")
      onClose()
    } catch (error) {
      console.log("error =>", error)
    } finally {
      setIsLoading(false)
    }
  }, [isValidQuantity, numericQuantityForSubmit, onConfirm, isLoading, onClose])

  const handleCancel = useCallback(() => {
    Keyboard.dismiss()
    setQuantity("1")
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
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.card}>
                <Text style={styles.title}>Enter Quantity</Text>
                <Text style={styles.productName}>{productName}</Text>
                <Text style={styles.wholesalerName}>{wholesalerName}</Text>
                <Text style={styles.peerGroupText}>Peer Group: {userPeerGroup || "N/A"}</Text>
                <View style={styles.divider} />

                <View style={styles.quantityInputContainer}>
                  <TextInput
                    style={styles.quantityInput}
                    value={quantity}
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
                    Unit Price: ${numericUnitPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                    disabled={isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.addToCartButton,
                      (!isValidQuantity || isLoading) && styles.addToCartButtonDisabled,
                    ]}
                    onPress={handleConfirm}
                    disabled={!isValidQuantity || isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
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
