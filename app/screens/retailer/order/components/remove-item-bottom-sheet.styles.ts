import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: colors.palette.grey200,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
    paddingVertical: 14,
  },
  cancelButtonText: {
    color: colors.palette.neutral800,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  confirmationMessage: {
    color: colors.palette.neutral800,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
    marginTop: 16,
  },
  contentContainer: {
    borderTopLeftRadius: commonStyles.borderRadius.large,
    borderTopRightRadius: commonStyles.borderRadius.large,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  description: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: 6,
  },
  proceedButton: {
    alignItems: "center",
    backgroundColor: colors.palette.red500,
    borderRadius: commonStyles.borderRadius.large,
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
    paddingVertical: spacing.sm,
  },
  proceedButtonDisabled: {
    opacity: 0.6,
  },
  proceedButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  productId: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: 4,
  },
  productName: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
    marginTop: 12,
  },
  title: {
    borderBottomColor: commonStyles.borderColor.quinary,
    borderBottomWidth: 1,
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.semiBold,
    margin: "auto",
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    textAlign: "center",
    width: "100%",
  },
  wholesalerText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: 4,
  },
})
