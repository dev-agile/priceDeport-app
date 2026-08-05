import { Text, View } from "react-native"

import { styles } from "./peer-group-price-card.styles"

interface PeerGroupPriceCardProps {
  peerGroupName: string
  price?: number | string | null
  updatedDate?: string
}

export function PeerGroupPriceCard({ peerGroupName, price, updatedDate }: PeerGroupPriceCardProps) {
  const priceNumber = Number(price)
  const hasValidPrice =
    price !== null &&
    price !== undefined &&
    price !== "" &&
    !isNaN(priceNumber) &&
    isFinite(priceNumber)
  const displayPrice = hasValidPrice ? `$${priceNumber.toFixed(2)}` : "--"
  const formattedDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "--"

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.groupName}>Group {peerGroupName}</Text>
        <Text style={styles.price}>{displayPrice}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.updatedLabel}>Updated</Text>
        <Text style={styles.updatedDate}>{formattedDate}</Text>
      </View>
    </View>
  )
}
