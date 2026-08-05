import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  backToOptionScreen: {
    marginTop: responsiveHeight(1.5),
    textAlign: "center",
  },
  container: {
    // paddingTop: responsiveHeight(2),
  },
  createAccountLink: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: responsiveHeight(2),
    width: "100%",
  },
  helperText2: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    marginTop: responsiveHeight(1),
    textAlign: "center",
    textDecorationLine: "underline",
  },
  helperTextContainer: {
    alignItems: "center",
    marginTop: responsiveHeight(3),
  },
  helpertext1: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    color: colors.palette.neutral100,
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
  mainContainer: {
    backgroundColor: colors.customColors.WHITE,
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  passwordTextContainer: {
    alignItems: "flex-end",
    marginTop: responsiveHeight(2),
    width: "100%",
  },
  retailerText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveHeight(4),
    height: "100%",
    width: "100%",
  },
  subtitleText: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: responsiveHeight(1),
    textAlign: "center",
  },
  textColor: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
  },
  textInputMargin: {
    marginTop: responsiveHeight(2),
  },
  validationError: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: responsiveHeight(1),
  },
  welcomeHeading: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
})
