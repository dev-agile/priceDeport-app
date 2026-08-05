import { Platform, StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  buttonRow: {
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
    borderRadius: 20,
    elevation: 8,
    padding: 20,
    shadowColor: colors.palette.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "90%",
    ...Platform.select({
      ios: {
        shadowRadius: commonStyles.boxShadow.small.shadowRadius,
      },
    }),
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
  pricingSection: {
    marginBottom: spacing.lg,
  },
  productId: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: 2,
  },
  productImage: {
    borderRadius: commonStyles.borderRadius.medium,
    height: 56,
    width: 56,
  },
  productImagePlaceholder: {
    backgroundColor: colors.palette.grey200,
    borderRadius: commonStyles.borderRadius.medium,
    height: 56,
    width: 56,
  },
  productInfo: {
    flex: 1,
    marginLeft: spacing.sm,
    minWidth: 0,
  },
  productName: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  productRow: {
    flexDirection: "row",
    marginBottom: spacing.lg,
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
  submitButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.medium,
    flex: 1,
    paddingVertical: 14,
  },
  submitButtonDisabled: {
    backgroundColor: colors.palette.grey300,
    elevation: 0,
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  title: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.semiBold,
    marginBottom: spacing.sm,
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
  wholesalerText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: 2,
  },
})
