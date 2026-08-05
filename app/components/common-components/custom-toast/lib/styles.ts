import { StyleSheet } from "react-native"

import {
  ERROR_TEXT_COLOR,
  SUCCESS_BORDER_LEFT_COLOR,
  SUCCESS_TEXT_COLOR,
  TEXT_FONT_SIZE,
  TEXT_FONT_WEIGHT,
  TOMATO_TOAST_BACKGROUND_COLOR,
  TOMATO_TOAST_HEIGHT,
} from "./constants"

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
  errorText1Style: {
    color: ERROR_TEXT_COLOR,
    fontSize: TEXT_FONT_SIZE,
  },
  errorText2Style: {
    color: ERROR_TEXT_COLOR,
    fontSize: TEXT_FONT_SIZE,
  },
  successToast: {
    borderLeftColor: SUCCESS_BORDER_LEFT_COLOR,
  },
  text1Style: {
    color: SUCCESS_TEXT_COLOR,
    fontSize: TEXT_FONT_SIZE,
    fontWeight: TEXT_FONT_WEIGHT,
    textTransform: "capitalize",
  },
  text2Style: {
    fontSize: TEXT_FONT_SIZE,
    fontWeight: TEXT_FONT_WEIGHT,
  },
  tomatoToast: {
    backgroundColor: TOMATO_TOAST_BACKGROUND_COLOR,
    height: TOMATO_TOAST_HEIGHT,
    width: "100%",
  },
})
