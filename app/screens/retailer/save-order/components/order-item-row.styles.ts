import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const orderItemRowStyles = StyleSheet.create({
  left: {
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.bold,
  },
  productName: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.medium,
  },
  quantityLine: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.xSmall,
    fontWeight: commonStyles.fontWeight.regular,
    marginTop: 2,
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
})
