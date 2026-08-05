import { StyleSheet } from "react-native"
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"

import {
  OTP_BOX_BORDER_RADIUS,
  OTP_BOX_BORDER_WIDTH,
  OTP_CONTAINER_GAP,
  OTP_CONTAINER_PADDING_TOP,
  OTP_SHADOW_COLOR,
  OTP_SHADOW_OFFSET_HEIGHT,
  OTP_SHADOW_OFFSET_WIDTH,
  OTP_SHADOW_OPACITY,
  OTP_SHADOW_RADIUS,
} from "./constants"

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
  otpBox: {
    borderRadius: OTP_BOX_BORDER_RADIUS,
    borderWidth: OTP_BOX_BORDER_WIDTH,
    fontSize: responsiveFontSize(2),
    height: responsiveScreenHeight(7),
    shadowColor: OTP_SHADOW_COLOR,
    shadowOffset: {
      height: OTP_SHADOW_OFFSET_HEIGHT,
      width: OTP_SHADOW_OFFSET_WIDTH,
    },
    shadowOpacity: OTP_SHADOW_OPACITY,
    shadowRadius: OTP_SHADOW_RADIUS,
    textAlign: "center",
    width: responsiveScreenWidth(15),
  },
  otpContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: OTP_CONTAINER_GAP,
    justifyContent: "space-between",
    paddingTop: OTP_CONTAINER_PADDING_TOP,
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
