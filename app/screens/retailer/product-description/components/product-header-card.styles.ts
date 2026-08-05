import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  category: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: 13,
    marginTop: spacing.xxs,
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: commonStyles.borderRadius.large,
    elevation: 3,
    flexDirection: "row",
    marginBottom: spacing.lg,
    padding: spacing.md,
    shadowColor: commonStyles.boxShadow.small.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  favoriteIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    position: "absolute",
    right: -8,
    top: -8,
    width: 30,
    ...commonStyles.boxShadow.small,
  },
  favoriteIconText: {
    fontSize: 16,
  },
  image: {
    borderRadius: commonStyles.borderRadius.medium,
    height: 100,
    width: 100,
  },
  imageContainer: {
    position: "relative",
  },
  imagePlaceholder: {
    backgroundColor: colors.palette.grey200,
    borderRadius: commonStyles.borderRadius.medium,
    height: 100,
    width: 100,
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  priceHistoryButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.palette.green.mint,
    borderRadius: 20,
    flexDirection: "row",
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  priceHistoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  priceHistoryText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: 12,
    fontWeight: commonStyles.fontWeight.medium,
  },
  productId: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: 13,
    marginTop: spacing.xxs,
  },
  productName: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
  },
})
