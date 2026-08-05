import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import {
  BORDER_RADIUS,
  CONTAINER_MARGIN_TOP,
  CONTAINER_PADDING_HORIZONTAL,
  CONTAINER_PADDING_VERTICAL,
  ELEVATION,
  FILE_TEXT_PADDING_LEFT,
  FONT_FAMILY,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from "./constants"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    elevation: ELEVATION,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: CONTAINER_MARGIN_TOP,
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CONTAINER_PADDING_VERTICAL,
  },
  dateContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainerText: {
    fontFamily: FONT_FAMILY,
  },
  fileText: {
    paddingLeft: FILE_TEXT_PADDING_LEFT,
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
  },
  subContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
