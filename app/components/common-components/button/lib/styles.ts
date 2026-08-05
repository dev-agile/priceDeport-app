import { Platform, StyleSheet } from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

import { FONT_FAMILY, FONT_SIZE, PADDING_HORIZONTAL } from "./constants"

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 14,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  buttonContainerActive: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 14,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  buttonContainerDisabled: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.backgroundQuaternary,
    borderColor: commonStyles.colors.border,
    borderRadius: commonStyles.borderRadius.medium,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 14,
    ...Platform.select({
      android: { elevation: 0 },
      ios: {
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    }),
  },
  buttonText: {
    color: commonStyles.colors.textTertiary,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    fontWeight: commonStyles.fontWeight.semiBold,
    textTransform: commonStyles.textTransform.capitalize,
  },
  buttonTextCenter: {
    alignSelf: "center",
  },
  buttonTextDisabled: {
    color: commonStyles.colors.textSecondary,
  },
  buttonTextLeft: {
    flex: 1,
    textAlign: "left",
  },
  iconContainer: {
    marginRight: responsiveWidth(3),
  },
})
