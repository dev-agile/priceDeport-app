import { StyleSheet } from "react-native"

import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.colors.primaryLight,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  groupName: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    marginBottom: spacing.xs,
  },
  leftSection: {
    flex: 1,
  },
  price: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 28,
    fontWeight: commonStyles.fontWeight.bold,
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  updatedDate: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.bold,
    marginTop: spacing.xxs,
  },
  updatedLabel: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
  },
})
