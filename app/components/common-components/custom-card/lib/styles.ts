import { Platform, StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

import {
  BORDER_RADIUS,
  CONTAINER_MARGIN,
  CONTAINER_MARGIN_BOTTOM,
  CONTAINER_MARGIN_TOP,
  CONTAINER_PADDING_HORIZONTAL,
  CONTAINER_PADDING_VERTICAL,
  ELEVATION,
  FONT_FAMILY,
  HELPER_TEXT1_FONT_SIZE,
  HELPER_TEXT2_FONT_SIZE,
  HELPER_TEXT3_FONT_SIZE,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  IOS_PADDING,
  SHADOW_OFFSET_HEIGHT,
  SHADOW_OPACITY,
  SHADOW_RADIUS,
} from "./constants"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.customColors.WHITE,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    elevation: ELEVATION,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: CONTAINER_MARGIN,
    marginBottom: CONTAINER_MARGIN_BOTTOM,
    marginTop: CONTAINER_MARGIN_TOP,
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CONTAINER_PADDING_VERTICAL,
    shadowColor: colors.palette.black800,
    shadowOffset: {
      height: SHADOW_OFFSET_HEIGHT,
      width: 0,
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
  },
  helperText1: {
    color: colors.customColors.BLACK,
    fontFamily: FONT_FAMILY,
    fontSize: HELPER_TEXT1_FONT_SIZE,
  },
  helperText2: {
    color: colors.customColors.BLACK,
    fontFamily: FONT_FAMILY,
    fontSize: HELPER_TEXT2_FONT_SIZE,
  },
  helperText3: {
    color: commonStyles.colors.primaryColor,
    fontSize: HELPER_TEXT3_FONT_SIZE,
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
  },
  rightPart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
})

export const CONTAINER_PADDING = Platform.OS === "ios" ? IOS_PADDING : 0
