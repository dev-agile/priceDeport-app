import { StyleSheet } from "react-native"

import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  card: {
    alignItems: "flex-end",
    backgroundColor: commonStyles.colors.background,
    borderColor: commonStyles.borderColor.quinary,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: commonStyles.borderWidth.small,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  image: {
    borderRadius: commonStyles.borderRadius.medium,
    height: 84,
    width: 84,
  },
  imageWrap: {
    borderRadius: commonStyles.borderRadius.medium,
    overflow: "hidden",
    position: "relative",
  },
  infoWrap: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  left: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  likeBadge: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.background,
    borderRadius: 999,
    height: 26,
    justifyContent: "center",
    position: "absolute",
    right: 4,
    top: 4,
    width: 26,
  },
  likeBadgeLoading: {
    opacity: 0.6,
  },
  likeText: {
    fontSize: 16,
  },
  madrLabel: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    marginTop: "10%",
  },
  price: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.xMedium,
    fontWeight: "700",
  },
  priceWrap: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minWidth: 84,
  },
  productId: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    marginTop: 2,
  },
  productName: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: "700",
  },
})
