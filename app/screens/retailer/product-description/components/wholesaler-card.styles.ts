import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  cartControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  chevron: {
    color: commonStyles.colors.textSecondary,
    fontSize: 24,
    fontWeight: "300",
  },
  container: {
    backgroundColor: commonStyles.colors.backgroundTertiary,
    borderColor: commonStyles.colors.border,
    borderRadius: commonStyles.borderRadius.xLarge,
    borderWidth: 1,
    elevation: 3,
    marginBottom: spacing.md,
    padding: spacing.md,
    shadowColor: commonStyles.boxShadow.small.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  leftSection: {
    flex: 1,
  },
  priceBoxesRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.small,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  quantityButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 18,
    fontWeight: commonStyles.fontWeight.bold,
  },
  quantityText: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
    minWidth: 40,
    textAlign: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  updatedDateLine: {
    marginTop: spacing.xxs,
  },
  updatedDateValue: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.bold,
  },
  updatedLabel: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
  },
  wholesalerName: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
  },
})
