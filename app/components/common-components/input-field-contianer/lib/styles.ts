import { Platform, StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  DROPDOWN_MARGIN_TOP,
  ELEVATION,
  ICON_HEIGHT,
  ICON_WIDTH,
  IOS_PADDING,
  IOS_TEXT_INPUT_PADDING,
  SHADOW_OFFSET_HEIGHT,
  SHADOW_OPACITY,
  SHADOW_RADIUS,
  TEXT_INPUT_MARGIN_TOP,
  TEXT_INPUT_PADDING_HORIZONTAL,
  ICON_CONTAINER_PADDING_HORIZONTAL,
  TEXT_INPUT_HEIGHT,
} from "./constants"

export const styles = StyleSheet.create({
  dropdownBox: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.grey500,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    elevation: ELEVATION,
    marginTop: DROPDOWN_MARGIN_TOP,
    shadowColor: colors.palette.neutral900,
    shadowOffset: {
      height: SHADOW_OFFSET_HEIGHT,
      width: 0,
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
  },
  icon: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
  },
  iconContainer: {
    paddingHorizontal: ICON_CONTAINER_PADDING_HORIZONTAL,
  },
  textInput: {
    flex: 1,
    height: TEXT_INPUT_HEIGHT,
    padding: Platform.OS === "ios" ? IOS_TEXT_INPUT_PADDING : null,
  },
  textInputContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.grey500,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    display: "flex",
    elevation: ELEVATION,
    flexDirection: "row",
    marginTop: TEXT_INPUT_MARGIN_TOP,
    padding: Platform.OS === "ios" ? IOS_PADDING : null,
    shadowColor: colors.palette.neutral900,
    shadowOffset: {
      height: SHADOW_OFFSET_HEIGHT,
      width: 0,
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
    width: "100%",
  },
  titleText: {
    color: colors.customColors.LIGHT_GRAY,
    fontSize: 14,
  },
})

export const TEXT_INPUT_PADDING_HORIZONTAL_VALUE = TEXT_INPUT_PADDING_HORIZONTAL
