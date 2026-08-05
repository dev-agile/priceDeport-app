import { StyleSheet } from "react-native"

import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  image: {
    borderRadius: commonStyles.borderRadius.large,
    height: 65,
    width: 65,
  },
  innerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
})
