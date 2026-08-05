import { Platform, StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral400,
    borderRadius: 3,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
    width: 20,
  },
  checkboxChecked: {
    backgroundColor: commonStyles.colors.primaryDark,
    borderColor: commonStyles.colors.primaryColor,
  },
  checkboxContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  checkboxContainerWrapper: {
    marginTop: 20,
  },
  checkboxError: {
    backgroundColor: colors.palette.red50,
    borderColor: colors.customColors.PASTEL_RED,
  },
  checkboxErrorMessage: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginLeft: 30,
    marginTop: 5,
  },
  checkboxLink: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  checkboxText: {
    color: colors.customColors.BLACK,
    flex: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  checkboxTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkmark: {
    color: colors.palette.neutral100,
    fontSize: 12,
    fontWeight: "bold",
  },
  cityZipContainer: {
    flexDirection: "row",
    gap: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  cityZipField: {
    flex: 1,
  },
  createButton: {
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 5,
    marginHorizontal: 18,
    marginTop: "20%",
    paddingVertical: 22,
    width: "90%",
  },
  createText: {
    color: colors.palette.neutral100,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  heading: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: responsiveHeight(0.5),
    marginTop: responsiveHeight(1),
    textAlign: "left",
    width: "100%",
  },
  helperMessage: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
  helperText2: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  helperTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(2),
    width: "100%",
  },
  helpertext1: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  loginButtonContainer: {
    marginBottom: 20,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    paddingLeft: Platform.OS === "ios" ? 10 : null,
    paddingRight: Platform.OS === "ios" ? 10 : null,
  },
  peerGroupTextContainer: {
    marginTop: 10,
  },
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 100,
    paddingHorizontal: 18,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  subtitle: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginBottom: responsiveHeight(1),
    textAlign: "left",
  },
  textInputContainer: {
    paddingTop: responsiveHeight(0.5),
  },
  textInputMargin: {
    marginTop: 16,
  },
  validationError: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: 10,
  },
})
