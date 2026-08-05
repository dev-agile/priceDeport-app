import { Text, View } from "react-native"

import { styles } from "./lib/styles"
import type { AvatarProps } from "./lib/types"

export const Avatar: React.FC<AvatarProps> = ({ name, size = 80 }) => {
  const getInitials = (fullName: string): string => {
    if (!fullName) return "?"
    const names = fullName.trim().split(" ")
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const initials = getInitials(name || "")

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  )
}

export default Avatar
