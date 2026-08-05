import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 12,
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: commonStyles.colors.backgroundQuaternary,
    opacity: 0.6,
  },
  buttonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
})
