import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  categoryHeader: {
    backgroundColor: colors.palette.neutral200,
    marginTop: 10,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: 10,
  },
  categoryHeaderText: {
    color: commonStyles.colors.text,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
  },
  categoryHeaderValue: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontWeight: commonStyles.fontWeight.bold,
  },
  changeButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  changeButtonDisabled: {
    backgroundColor: colors.palette.grey500,
  },
  changeButtonIcon: {
    height: 14,
    tintColor: colors.palette.neutral100,
    width: 14,
  },
  changeButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    color: commonStyles.colors.textSecondary,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: "500",
    textAlign: "center",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  pageHeader: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.background,
    borderBottomColor: commonStyles.borderColor.quinary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 14,
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(1.2),
  },
  pageHeaderAction: {
    alignItems: "center",
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  pageHeaderIcon: {
    height: 18,
    width: 18,
  },
  pageHeaderRefresh: {
    color: commonStyles.colors.textSecondary,
    fontSize: 22,
    fontWeight: "500",
  },
  pageHeaderTitle: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: "700",
  },
  peerGroupCard: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryLight,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: 14,
  },
  peerGroupCurrentText: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
  },
  peerGroupTitle: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
  },
  subscribeButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  subscribeButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: "600",
  },
  successBanner: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: responsiveWidth(2),
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  successBannerLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  successBannerText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: "600",
  },
  successCloseIcon: {
    height: 16,
    tintColor: colors.palette.neutral100,
    width: 16,
  },
})
