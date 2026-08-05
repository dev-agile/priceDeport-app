import { Text, TextInput, View } from "react-native"

import { colors } from "@/theme/colors"

import { styles } from "../lib/styles"
import { ProfileFieldProps } from "../lib/types"

export function ProfileField({
  label,
  value,
  isEditing = false,
  editable = true,
  onChangeText,
  placeholder,
}: ProfileFieldProps) {
  if (isEditing) {
    return (
      <View style={styles.fieldCard}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            editable={editable}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.palette.grey500}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.fieldCard}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || "-"}</Text>
    </View>
  )
}
