import { Text, TouchableOpacity, View } from "react-native"

import { AddToCartButton } from "./add-to-cart-button"
import { PriceBox } from "./price-box"
import { styles } from "./wholesaler-card.styles"

interface WholesalerCardProps {
  wholesalerName: string
  updatedDate?: string
  unitPrice: number | string
  casePrice?: number | string
  onPress: () => void
  onAddToCart: () => void
  disabled?: boolean
  isLoading?: boolean
  isInCart?: boolean
  quantity?: number
  onIncrement?: () => void
  onDecrement?: () => void
  onQuantityPress?: () => void
}

export function WholesalerCard({
  wholesalerName,
  updatedDate,
  unitPrice,
  // casePrice,
  onPress,
  onAddToCart,
  disabled,
  isLoading,
  isInCart = false,
  quantity = 0,
  onIncrement,
  onDecrement,
  onQuantityPress,
}: WholesalerCardProps) {
  const formattedDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <Text style={styles.wholesalerName}>{wholesalerName}</Text>
          {formattedDate && (
            <Text style={styles.updatedDateLine}>
              <Text style={styles.updatedLabel}>Updated: </Text>
              <Text style={styles.updatedDateValue}>{formattedDate}</Text>
            </Text>
          )}
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>

      <View style={styles.priceBoxesRow}>
        <PriceBox label="Unit Price" value={unitPrice !== undefined ? unitPrice : "--"} />
        {/* <PriceBox label="Case Price" value={casePrice !== undefined ? casePrice : "--"} /> */}
      </View>

      {isInCart ? (
        <View style={styles.cartControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={onDecrement}
            disabled={disabled || isLoading}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onQuantityPress} disabled={disabled || isLoading}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={onIncrement}
            disabled={disabled || isLoading}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AddToCartButton onPress={onAddToCart} disabled={disabled} isLoading={isLoading} />
      )}
    </TouchableOpacity>
  )
}
