import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

const sectionSpacing = 24
const cardSpacing = 14
const themeGreen = commonStyles.colors.primaryColor
const lightGreenBg = commonStyles.colors.primaryLight

export const styles = StyleSheet.create({
  bannerCheckIcon: {
    height: 22,
    marginRight: 10,
    width: 22,
  },
  bannerContent: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  bannerDismiss: {
    padding: 4,
  },
  bannerDismissIcon: {
    height: 22,
    width: 22,
  },
  bannerText: {
    color: colors.customColors.WHITE,
    flex: 1,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 15,
    fontWeight: "600",
  },
  container: {
    backgroundColor: colors.customColors.WHITE,
    flex: 1,
  },
  downloadSection: {
    marginTop: sectionSpacing,
  },
  fileContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.grey100,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    padding: 12,
  },
  fileContainerLeft: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  fileIcon: {
    height: 24,
    marginRight: 10,
    width: 24,
  },
  fileName: {
    color: colors.palette.charcoal500,
    flex: 1,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 14,
  },
  fileTypeInfo: {
    alignItems: "center",
    backgroundColor: colors.palette.grey100,
    borderRadius: 12,
    marginTop: sectionSpacing,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fileTypeInfoText: {
    color: colors.palette.charcoal400,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 14,
    textAlign: "center",
  },
  header: {
    // Header handled by HeaderComponent – no extra borders
  },
  iconImage: {
    height: 36,
    width: 36,
  },
  iconWrapper: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: lightGreenBg,
    borderRadius: 9999,
    height: 72,
    justifyContent: "center",
    marginBottom: 16,
    marginTop: responsiveHeight(2),
    width: 72,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  noPeerGroupCard: {
    backgroundColor: colors.palette.grey100,
    borderColor: commonStyles.borderColor.quinary,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: 1,
    marginBottom: cardSpacing,
    padding: 16,
  },
  noPeerGroupText: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 14,
    textAlign: "center",
  },
  peerGroupCard: {
    backgroundColor: commonStyles.colors.background,
    borderColor: commonStyles.borderColor.quinary,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: 1,
    marginBottom: cardSpacing,
    padding: 16,
  },
  peerGroupCardContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  peerGroupCardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  peerGroupName: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    fontWeight: "500",
  },
  peerGroupSection: {
    marginTop: sectionSpacing,
  },
  peerGroupSectionLabel: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  peerGroupSelected: {
    borderColor: themeGreen,
  },
  radioInner: {
    backgroundColor: themeGreen,
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  radioOuter: {
    alignItems: "center",
    borderColor: commonStyles.borderColor.quinary,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: commonStyles.borderWidth.medium,
    height: 22,
    justifyContent: "center",
    marginRight: 12,
    width: 22,
  },
  radioOuterSelected: {
    borderColor: commonStyles.borderColor.primary,
  },
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    height: 20,
    width: 20,
  },
  scrollContent: {
    paddingBottom: responsiveHeight(4),
  },
  stepButton: {
    marginTop: responsiveHeight(1.5),
  },
  stepTitle: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    marginTop: 6,
    textAlign: "center",
  },
  successBanner: {
    alignItems: "center",
    backgroundColor: themeGreen,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  title: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
  uploadActionLabel: {
    color: themeGreen,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 15,
    fontWeight: "600",
  },
  uploadButton: {
    alignItems: "center",
    backgroundColor: themeGreen,
    borderRadius: commonStyles.borderRadius.large,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: sectionSpacing,
    paddingVertical: 14,
    shadowColor: commonStyles.boxShadow.small.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  uploadButtonDisabled: {
    backgroundColor: commonStyles.colors.backgroundTertiary,
    borderColor: commonStyles.borderColor.quinary,
    borderWidth: commonStyles.borderWidth.small,
    elevation: 0,
    shadowOpacity: 0,
  },
  uploadButtonIcon: {
    height: 20,
    marginRight: 8,
    width: 20,
  },
  uploadButtonText: {
    color: colors.customColors.WHITE,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    fontWeight: commonStyles.fontWeight.bold,
  },
  uploadButtonTextDisabled: {
    color: commonStyles.colors.textSecondary,
  },
  uploadedLabel: {
    color: themeGreen,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 14,
    fontWeight: "600",
  },
})
