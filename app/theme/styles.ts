import { TouchableOpacityProps, ViewStyle } from "react-native"

import { colors } from "./colors"
import { spacing } from "./spacing" // @demo remove-current-line

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  // @demo remove-block-start
  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,
  // @demo remove-block-end
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  touchableOpacity: {
    activeOpacity: 0.8,
  } as TouchableOpacityProps,
}

export const commonStyles = {
  borderColor: {
    primary: colors.palette.green.primary,
    quaternary: colors.customColors.WHITE,
    secondary: colors.customColors.MEDIUM_GRAY,
    tertiary: colors.customColors.BLACK,
    quinary: colors.palette.grey300,
  },
  borderRadius: {
    xLarge: 16,
    large: 12,
    medium: 8,
    small: 4,
  },
  borderWidth: {
    large: 3,
    medium: 2,
    small: 1,
  },
  boxShadow: {
    small: {
      shadowColor: colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },
  colors: {
    primaryColor: colors.palette.green800,
    secondaryColor: colors.customColors.WHITE,
    tertiaryColor: colors.palette.green100,
    quaternaryColor: colors.palette.red600,
    quinaryColor: colors.palette.neutral300,

    background: colors.palette.neutral100,
    backgroundSecondary: colors.palette.neutral300,
    backgroundTertiary: colors.palette.grey100,
    backgroundQuaternary: colors.palette.grey400,
    backgroundQuinary: colors.palette.grey300,

    text: colors.palette.black500,
    textSecondary: colors.palette.grey500,
    textTertiary: colors.palette.neutral100,

    link: colors.palette.blue400,

    border: colors.palette.grey300,

    primary: colors.palette.green.soft,
    primaryDark: colors.palette.green.primary,
    primaryLight: colors.palette.green.mint,

    // color used in app
    // mainColor: primaryColor,
    // mainLightColor: primaryDark,
    // mainMediumColor: primary,
    // mainLightColor: primaryLight,
  },
  fontFamily: {
    bold: "Arial-Rounded-Bold",
    regular: "Arial-Rounded-Regular",
  },
  fontSize: {
    large: 20,
    xMedium: 18,
    medium: 16,
    small: 14,
    xSmall: 12,
  },
  fontStyle: {
    italic: "italic",
    normal: "normal",
  },
  fontWeight: {
    bold: 700,
    semiBold: 600,
    medium: 500,
    regular: 400,
    light: 300,
  } as const,
  textAlign: {
    center: "center",
    left: "left",
    right: "right",
  } as const,
  textDecoration: {
    none: "none",
    underline: "underline",
  },
  textTransform: {
    capitalize: "capitalize",
    lowercase: "lowercase",
    uppercase: "uppercase",
  } as const,
}
