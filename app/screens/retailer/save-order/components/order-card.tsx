import { memo } from "react"
import { View, Text, Pressable, Image } from "react-native"

import { Icon } from "@assets/icons/wholeSeller"

import type { Order, OrderItem } from "@/api/retailer/orders/types"

import { orderCardStyles as styles } from "./order-card.styles"
import { OrderItemRow } from "./order-item-row"

type OrderItemApi = OrderItem & {
  quantuty?: number
  prodduct_desc?: string
  ProductTotalPrice?: number
}

export const OrderCard = memo(function OrderCard({
  order,
  formattedDate,
  onPDFPress,
}: {
  order: Order
  formattedDate: string
  onPDFPress: () => void
}) {
  const allItems = (order.items ?? []) as OrderItemApi[]
  const items = allItems.filter((i) => (i.quantuty ?? i.quantity ?? 0) > 0)
  const totalOrderPrice = order.totalOrderPrice ?? 0

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.orderId}>{order.orderId}</Text>
        </View>
        <Pressable style={styles.pdfButton} onPress={onPDFPress} accessibilityRole="button">
          <Image source={Icon.FILE_PDF} style={styles.pdfIcon} resizeMode="contain" />
          <Text style={styles.pdfButtonText}>PDF</Text>
        </Pressable>
      </View>

      <View style={styles.itemsSection}>
        {items.length > 0 && <View style={styles.separator} />}
        {items.map((item, index) => (
          <View key={`${order.orderId}-item-${index}`}>
            {index > 0 && <View style={styles.separator} />}
            <OrderItemRow item={item} />
          </View>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${totalOrderPrice.toFixed(2)}</Text>
      </View>
    </View>
  )
})
