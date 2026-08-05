import { memo } from "react"
import { View, Text } from "react-native"

import type { OrderItem } from "@/api/retailer/orders/types"

import { orderItemRowStyles as styles } from "./order-item-row.styles"

/** Normalize API response (handles quantuty/prodduct_desc/ProductTotalPrice typos) */
function getItemValues(
  item: OrderItem & { quantuty?: number; prodduct_desc?: string; ProductTotalPrice?: number },
) {
  const quantity = item.quantuty ?? item.quantity ?? 0
  const productDesc = item.prodduct_desc ?? item.product_desc ?? ""
  const totalPrice = item.ProductTotalPrice ?? item.productTotalPrice ?? 0
  const unitPrice = quantity > 0 ? totalPrice / quantity : 0
  return { quantity, productDesc, totalPrice, unitPrice }
}

export const OrderItemRow = memo(function OrderItemRow({
  item,
}: {
  item: OrderItem & { quantuty?: number; prodduct_desc?: string; ProductTotalPrice?: number }
}) {
  const { quantity, productDesc, totalPrice, unitPrice } = getItemValues(item)

  if (quantity <= 0) return null

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.productName} numberOfLines={2}>
          {productDesc}
        </Text>
        <Text style={styles.quantityLine}>
          Qty: {quantity} × ${unitPrice.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
    </View>
  )
})
