import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  addToCartButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.medium,
    flex: 1,
    paddingVertical: 14,
  },
  addToCartButtonDisabled: {
    backgroundColor: colors.palette.grey300,
    elevation: 0,
    opacity: 0.6,
  },
  addToCartButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  backdrop: {
    alignItems: "center",
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.backgroundQuinary,
    borderRadius: commonStyles.borderRadius.medium,
    flex: 1,
    opacity: 0.8,
    paddingVertical: 14,
  },
  cancelButtonText: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.medium,
  },
  card: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: commonStyles.borderRadius.xLarge,
    elevation: 5,
    padding: spacing.md,
    shadowColor: colors.palette.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: commonStyles.boxShadow.small.shadowRadius,
    width: "90%",
  },
  divider: {
    backgroundColor: colors.palette.grey200,
    height: 1,
    marginBottom: spacing.lg,
    width: "100%",
  },
  keyboardAvoid: {
    flex: 1,
  },
  peerGroupText: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  pricingSection: {
    marginBottom: spacing.lg,
  },
  productName: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  quantityInput: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.semiBold,
    textAlign: "center",
    width: "100%",
  },
  quantityInputContainer: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.medium,
    borderWidth: commonStyles.borderWidth.medium,
    height: 60,
    justifyContent: "center",
    marginBottom: spacing.lg,
    width: 100,
  },
  title: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.semiBold,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  totalPriceText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  unitPriceText: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.xs,
  },
  wholesalerName: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
})
