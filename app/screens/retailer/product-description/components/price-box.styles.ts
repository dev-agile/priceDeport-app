import { StyleSheet } from "react-native"

import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryLight,
    borderRadius: commonStyles.borderRadius.medium,
    flex: 1,
    marginHorizontal: spacing.xxs,
    padding: spacing.sm,
  },
  label: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.xxs,
  },
  value: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
})
