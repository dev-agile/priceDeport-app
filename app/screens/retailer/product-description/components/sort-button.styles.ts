import { StyleSheet } from "react-native"

import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.backgroundTertiary,
    borderRadius: commonStyles.borderRadius.xLarge,
    flexDirection: "row",
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  icon: {
    height: 14,
    marginRight: 4,
    opacity: 0.7,
    width: 14,
  },
  text: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.medium,
  },
})
