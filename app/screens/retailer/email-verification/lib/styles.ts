import { StyleSheet } from "react-native"
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveFontSize,
} from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  helperText2: {
    color: colors.customColors.MEDIUM_GRAY,
    fontSize: responsiveScreenFontSize(1.9),
    fontWeight: "bold",
    textAlign: "center",
  },
  helpertext1: {
    color: colors.customColors.MEDIUM_GRAY,
    fontSize: responsiveScreenFontSize(1.9),
    textAlign: "center",
  },
  mainContainer: {
    backgroundColor: colors.customColors.WHITE,
    paddingLeft: 18,
    paddingRight: 23,
    paddingTop: responsiveScreenHeight(10),
  },
  otpBox: {
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: responsiveFontSize(2),
    height: responsiveScreenHeight(7),
    shadowColor: commonStyles.colors.primaryLight,
    shadowOffset: {
      width: 7,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    textAlign: "center",
    width: responsiveScreenWidth(15),
  },
  otpContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingTop: 21,
  },
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  subContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: responsiveScreenHeight(10),
  },
})
