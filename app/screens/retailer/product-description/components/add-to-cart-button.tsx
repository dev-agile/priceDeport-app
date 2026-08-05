import { Text, TouchableOpacity } from "react-native"

import { styles } from "./add-to-cart-button.styles"

interface AddToCartButtonProps {
  onPress: () => void
  disabled?: boolean
  isLoading?: boolean
}

export function AddToCartButton({ onPress, disabled, isLoading }: AddToCartButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
  )
}
