// import React from 'react';
import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "./colors"

const CommonStyles = {
  CTAbutton: {
    color: colors.customColors.LIGHT_GRAY,
    fontSize: 14,
  },
  inputFieldText: {
    fontSize: 17,
    fontFamily: "Arial-Rounded-Bold",
    color: "red",
  },
  customPadding: {
    paddingVertical: responsiveHeight(0.4),
    paddingHorizontal: responsiveWidth(2.5),
  },
  customFontSize: {
    fontSize: 15,
    color: colors.customColors.LIGHT_GRAY,
  },
  fontFamily: {
    fontFamily: "Arial-Rounded-Bold",
  },
}

const wholeSellerStyles = StyleSheet.create({
  ...CommonStyles,
  wholeSellerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

const retailerStyles = StyleSheet.create({
  ...CommonStyles,
  retailerTitle: {
    fontSize: 16,
    fontStyle: "italic",
  },
})

export { CommonStyles, wholeSellerStyles, retailerStyles }
