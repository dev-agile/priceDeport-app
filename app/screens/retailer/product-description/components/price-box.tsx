import { Text, View } from "react-native"

import { styles } from "./price-box.styles"

interface PriceBoxProps {
  label: string
  value: number | string
}

export function PriceBox({ label, value }: PriceBoxProps) {
  const priceNumber = Number(value)
  const displayValue =
    !isNaN(priceNumber) && isFinite(priceNumber) ? `$${priceNumber.toFixed(2)}` : "--"

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  )
}
