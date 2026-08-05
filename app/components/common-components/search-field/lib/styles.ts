import { Platform, StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import {
  BORDER_COLOR,
  BORDER_RADIUS,
  BORDER_WIDTH,
  CONTAINER_PADDING_HORIZONTAL,
  ICON_HEIGHT,
  ICON_WIDTH,
  IOS_PADDING,
  LEFT_PART_WIDTH,
  SEARCH_TEXT_FONT_SIZE,
  SEARCH_TEXT_PADDING,
} from "./constants"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: BORDER_COLOR,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    width: "100%",
  },
  image: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
  },
  leftPart: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: LEFT_PART_WIDTH,
  },
  searchText: {
    color: colors.customColors.LIGHT_GRAY,
    flex: 1,
    fontSize: SEARCH_TEXT_FONT_SIZE,
    padding: SEARCH_TEXT_PADDING,
  },
})

export const CONTAINER_PADDING = Platform.OS === "ios" ? IOS_PADDING : 0
