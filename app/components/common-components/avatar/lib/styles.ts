import { StyleSheet } from "react-native"

import { AVATAR_BACKGROUND_COLOR, AVATAR_TEXT_COLOR } from "./constants"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: AVATAR_BACKGROUND_COLOR,
    justifyContent: "center",
  },
  text: {
    color: AVATAR_TEXT_COLOR,
    fontWeight: "bold",
  },
})
