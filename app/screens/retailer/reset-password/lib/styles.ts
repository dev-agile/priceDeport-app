import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  buttonMargin: {
    marginTop: responsiveHeight(4),
  },
  container: {
    marginTop: responsiveHeight(2),
  },
  containerIconCircle: {
    backgroundColor: commonStyles.colors.tertiaryColor,
    borderRadius: 999,
    height: 70,
    margin: "auto",
    padding: 10,
    width: 70,
  },
  containerInput: {
    marginBottom: responsiveHeight(4),
    marginTop: responsiveHeight(1.5),
  },
  helperText2: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    marginTop: responsiveHeight(0.5),
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
  icon: {
    alignSelf: "center",
    height: "90%",
    margin: "auto",
    width: "90%",
  },
  mainContainer: {
    backgroundColor: colors.customColors.WHITE,
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  otpBox: {
    borderColor: colors.palette.neutral400,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    height: 56,
    textAlign: "center",
    width: 56,
  },
  otpContainer: {
    flexDirection: "row",
    gap: responsiveWidth(3),
    justifyContent: "center",
    marginVertical: responsiveHeight(3),
  },
  otpSubtitleEmail: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    marginTop: responsiveHeight(0.5),
    textAlign: "center",
  },
  passwordFieldSpacing: {
    marginBottom: responsiveHeight(1.5),
  },
  safeAreaView: {
    flex: 1,
    width: "100%",
  },
  stepSubtitle: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    textAlign: "center",
  },
  stepTitle: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInputMargin: {
    minHeight: 56,
  },
  validationError: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: responsiveHeight(0.5),
  },
})
