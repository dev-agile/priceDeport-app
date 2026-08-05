import { Platform, StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

const themeGreen = commonStyles.colors.primaryColor

export const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.background,
    borderRadius: commonStyles.borderRadius.large,
    elevation: 3,
    flexDirection: "row",
    marginBottom: 14,
    padding: spacing.sm,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  cardBoxLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  container: {
    backgroundColor: commonStyles.colors.backgroundTertiary,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  emptyText: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.background,
    borderColor: commonStyles.borderColor.quinary,
    borderTopWidth: commonStyles.borderWidth.small,
    bottom: 0,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    padding: spacing.md,
    position: "absolute",
    right: 0,
  },
  footerSummaryLeft: {
    justifyContent: "center",
  },
  footerSummaryTotalLabel: {
    color: colors.palette.neutral800,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
  },
  footerSummaryTotalPrice: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
    marginTop: spacing.xs,
  },
  imageContainer: {
    borderRadius: commonStyles.borderRadius.large,
    height: 70,
    overflow: "hidden",
    width: 70,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  mainContainer: {
    backgroundColor: commonStyles.colors.backgroundTertiary,
    flex: 1,
  },
  priceText: {
    color: themeGreen,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
    marginTop: spacing.xs,
  },
  productCategory: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    marginTop: 2,
  },
  productDesc: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  productImage: {
    borderRadius: commonStyles.borderRadius.large,
    height: 70,
    width: 70,
  },
  productInfo: {
    flex: 1,
    marginHorizontal: 12,
    minWidth: 0,
  },
  quantityButton: {
    alignItems: "center",
    borderRadius: commonStyles.borderRadius.medium,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  quantityButtonMinus: {
    backgroundColor: colors.palette.grey300,
  },
  quantityButtonPlus: {
    backgroundColor: themeGreen,
  },
  quantityButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  quantityButtonTextMinus: {
    color: colors.palette.neutral800,
  },
  quantityContainer: {
    alignItems: "center",
    borderRadius: commonStyles.borderRadius.large,
    flexDirection: "row",
    padding: 4,
  },
  quantityPillTouchable: {
    backgroundColor: commonStyles.colors.primaryLight,
    borderRadius: commonStyles.borderRadius.medium,
    marginHorizontal: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quantityText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
  },
  removeIcon: {
    height: 20,
    width: 20,
  },
  removeIconWrapper: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 10,
  },
  saveOrderButton: {
    borderRadius: commonStyles.borderRadius.large,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  wholesalerText: {
    color: themeGreen,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.semiBold,
    marginTop: spacing.xs,
  },
})

export const modalStyles = StyleSheet.create({
  button: {
    borderRadius: commonStyles.borderRadius.medium,
    flex: 1,
    padding: spacing.sm,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  cancelButton: {
    backgroundColor: colors.palette.neutral200,
  },
  cancelButtonText: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: commonStyles.borderRadius.large,
    padding: spacing.lg,
    width: "80%",
  },
  input: {
    borderColor: colors.palette.neutral400,
    borderRadius: commonStyles.borderRadius.medium,
    borderWidth: 1,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    marginBottom: 20,
    padding: spacing.sm,
    textAlign: "center",
  },
  itemId: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
  },
  itemInfo: {
    marginBottom: 16,
  },
  itemName: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
    marginBottom: 4,
  },
  overlay: {
    alignItems: "center",
    backgroundColor: colors.palette.grey500,
    flex: 1,
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: commonStyles.colors.primaryColor,
  },
  submitButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
    textAlign: "center",
  },
  title: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
    marginBottom: 16,
    textAlign: "center",
  },
})
