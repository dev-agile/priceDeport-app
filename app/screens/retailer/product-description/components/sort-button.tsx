import { Image, Text, TouchableOpacity } from "react-native"

import { styles } from "./sort-button.styles"
import { Icon } from "../../../../../assets/icons/wholeSeller"

interface SortButtonProps {
  onPress: () => void
}

export function SortButton({ onPress }: SortButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Image source={Icon.SORTING} style={styles.icon} resizeMode="contain" />
      <Text style={styles.text}>Sort</Text>
    </TouchableOpacity>
  )
}
