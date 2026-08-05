import { Platform, StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  buttonContainer: {
    marginBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(12),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  errorText: {
    color: colors.palette.angry500,
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4,
  },
  fieldCard: {
    backgroundColor: commonStyles.colors.secondaryColor,
    borderRadius: 16,
    marginBottom: 0,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  fieldContainer: {
    marginBottom: 18,
  },
  fieldsContainer: {
    marginBottom: responsiveHeight(2),
  },
  keyboardAvoidingView: {
    flex: 1,
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

  // Peer group bottom-sheet selector
  peerGroupChevron: {
    height: 10,
    tintColor: colors.palette.neutral500,
    transform: [{ rotate: "-90deg" }],
    width: 10,
  },
  peerGroupSelector: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.grey300,
    borderRadius: 5,
    borderWidth: 0.4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: colors.palette.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  peerGroupSelectorPlaceholder: {
    color: colors.palette.neutral500,
  },
  peerGroupSelectorText: {
    color: colors.palette.neutral700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  peerGroupTitleText: {
    marginBottom: 2,
  },

  // Peer group bottom-sheet content
  sheetCheckmark: {
    color: commonStyles.colors.primaryColor,
    fontSize: 15,
    fontWeight: "700",
    position: "absolute",
    right: 0,
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetOption: {
    borderBottomColor: colors.palette.grey200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
  },
  sheetOptionRow: {
    alignItems: "center",
    borderBottomColor: colors.palette.grey200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  sheetOptionText: {
    color: colors.palette.neutral700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 15,
    fontWeight: "500",
  },
  sheetOptionTextSelected: {
    color: commonStyles.colors.primaryColor,
    fontWeight: "700",
  },
  sheetTitle: {
    borderBottomColor: colors.palette.grey300,
    borderBottomWidth: 1,
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
    paddingBottom: 12,
    textAlign: "center",
  },
  titleText: {
    fontWeight: "bold",
  },
})
