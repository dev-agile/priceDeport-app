import { StyleSheet } from "react-native"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingTop: 12,
  },
  optionRow: {
    borderBottomColor: colors.palette.grey300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
  },
  optionText: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
  },
  selectedOptionText: {
    color: commonStyles.colors.primaryColor,
    fontWeight: commonStyles.fontWeight.bold,
  },
  title: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 20,
    fontWeight: commonStyles.fontWeight.bold,
    marginBottom: responsiveHeight(2.4),
    textAlign: "center",
  },
})
