import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const orderCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: commonStyles.borderRadius.xLarge,
    elevation: 3,
    marginBottom: spacing.lg,
    padding: spacing.md,
    shadowColor: colors.palette.black500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: commonStyles.boxShadow.small.shadowOpacity,
    shadowRadius: commonStyles.boxShadow.small.shadowRadius,
  },
  dateText: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.xSmall,
    fontWeight: commonStyles.fontWeight.regular,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  headerLeft: {},
  itemsSection: {},
  orderId: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
    marginTop: spacing.xs,
  },
  pdfButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: commonStyles.colors.primaryLight,
    borderColor: commonStyles.colors.primaryDark,
    borderRadius: 20,
    borderWidth: commonStyles.borderWidth.small,
    flexDirection: "row",
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  pdfButtonText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.xSmall,
    fontWeight: commonStyles.fontWeight.medium,
  },
  pdfIcon: {
    height: 14,
    width: 14,
  },
  separator: {
    backgroundColor: colors.palette.neutral200,
    height: 1,
  },
  totalLabel: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.regular,
  },
  totalRow: {
    alignItems: "center",
    borderTopColor: colors.palette.neutral200,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
  },
  totalValue: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.xMedium,
    fontWeight: commonStyles.fontWeight.bold,
  },
})
