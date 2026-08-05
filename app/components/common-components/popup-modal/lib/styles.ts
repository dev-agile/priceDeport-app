import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import {
  BUTTON_BORDER_RADIUS,
  BUTTON_PADDING,
  BUTTON_WIDTH,
  ELEVATION,
  FONT_SIZE,
  FONT_WEIGHT,
  MODAL_BORDER_RADIUS,
  MODAL_PADDING,
  MODAL_TEXT_MARGIN_BOTTOM,
  MODAL_WIDTH,
  SHADOW_OFFSET_HEIGHT,
  SHADOW_OPACITY,
  SHADOW_RADIUS,
} from "./constants"

export const styles = StyleSheet.create({
  buttonText: {
    color: colors.palette.neutral100,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: colors.palette.grey500,
    borderRadius: BUTTON_BORDER_RADIUS,
    padding: BUTTON_PADDING,
    width: BUTTON_WIDTH,
  },
  confirmButton: {
    backgroundColor: colors.error,
    borderRadius: BUTTON_BORDER_RADIUS,
    padding: BUTTON_PADDING,
    width: BUTTON_WIDTH,
  },
  modal: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: MODAL_BORDER_RADIUS,
    elevation: ELEVATION,
    padding: MODAL_PADDING,
    shadowColor: colors.palette.neutral900,
    shadowOffset: {
      height: SHADOW_OFFSET_HEIGHT,
      width: 0,
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
    width: MODAL_WIDTH,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.black500,
    flex: 1,
    justifyContent: "center",
  },
  modalText: {
    color: colors.error,
    fontSize: FONT_SIZE,
    fontWeight: FONT_WEIGHT,
    marginBottom: MODAL_TEXT_MARGIN_BOTTOM,
    textAlign: "center",
  },
})
