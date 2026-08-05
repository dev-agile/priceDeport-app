import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  ELEVATION,
  ICON_HEIGHT,
  ICON_WIDTH,
  SHADOW_OFFSET_HEIGHT,
  SHADOW_OPACITY,
  SHADOW_RADIUS,
  TEXT_INPUT_FONT_SIZE,
  TEXT_INPUT_MARGIN_TOP,
  TEXT_INPUT_PADDING,
  TEXT_INPUT_WIDTH,
  TITLE_FONT_SIZE,
} from "./constants"

export const styles = StyleSheet.create({
  icon: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
  },
  textInput: {
    fontSize: TEXT_INPUT_FONT_SIZE,
    width: TEXT_INPUT_WIDTH,
  },
  textInputContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.customColors.MEDIUM_GRAY,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    display: "flex",
    elevation: ELEVATION,
    flexDirection: "row",
    marginTop: TEXT_INPUT_MARGIN_TOP,
    padding: TEXT_INPUT_PADDING,
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
    fontSize: TITLE_FONT_SIZE,
  },
})
