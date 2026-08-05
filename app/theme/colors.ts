const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral550: "#575555",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  blue50: "#E3F2FD",
  blue100: "#BBDEFB",
  blue200: "#90CAF9",
  blue300: "#64B5F6",
  blue400: "#42A5F5",
  blue500: "#2196F3",
  blue600: "#1E88E5",
  blue700: "#1976D2",
  blue800: "#1565C0",
  blue900: "#0D47A1",

  green50: "#E8F5E9",
  green100: "#C8E6C9",
  green200: "#A5D6A7",
  green300: "#81C784",
  green400: "#66BB6A",
  green500: "#4CAF50",
  green600: "#43A047",
  green700: "#388E3C",
  green800: "#2E7D32",
  green900: "#1B5E20",

  red50: "#FFEBEE",
  red100: "#FFCDD2",
  red200: "#EF9A9A",
  red300: "#E57373",
  red400: "#EF5350",
  red500: "#F44336",
  red600: "#E53935",
  red700: "#D32F2F",
  red800: "#C62828",
  red900: "#B71C1C",

  yellow50: "#FFF3E0",
  yellow100: "#FFE0B2",
  yellow200: "#FFCC80",
  yellow300: "#FFB74D",
  yellow400: "#FFA726",
  yellow500: "#FF9800",
  yellow600: "#FB8C00",
  yellow700: "#F57C00",
  yellow800: "#EF6C00",
  yellow900: "#E65100",

  grey50: "#FAFAFA",
  grey100: "#F5F5F5",
  grey200: "#EEEEEE",
  grey300: "#E0E0E0",
  grey400: "#BDBDBD",
  grey500: "#9E9E9E",
  grey600: "#757575",
  grey700: "#616161",
  grey800: "#424242",
  grey900: "#212121",

  black50: "#F5F5F5",
  black100: "#E0E0E0",
  black200: "#BDBDBD",
  black300: "#9E9E9E",
  black400: "#757575",
  black500: "#616161",
  black600: "#424242",
  black700: "#212121",
  black800: "#000000",
  black900: "#000000",

  white50: "#F5F5F5",
  white100: "#E0E0E0",
  white200: "#BDBDBD",
  white300: "#9E9E9E",
  white400: "#757575",
  white500: "#616161",
  white600: "#424242",
  white700: "#212121",
  // white800: "#000000",
  // white900: "#000000",

  charcoal50: "#F7F7F7",
  charcoal100: "#EEEEEE",
  charcoal200: "#D6D6D6",
  charcoal300: "#BDBDBD",
  charcoal400: "#9E9E9E",
  charcoal500: "#343434",
  charcoal600: "#2E2E2E",
  charcoal700: "#262626",
  charcoal800: "#1E1E1E",
  charcoal900: "#141414",

  green: {
    primary: "#6CC51D",
    primaryDark: "#4E9E14",
    primaryLight: "#8DD84F",

    soft: "#AEDC81",
    softDark: "#8FBE5E",
    softLight: "#C4E69F",

    mint: "#EBFFD7",
    mintDark: "#D6F5B8",
    mintLight: "#F3FFE6",
  },
} as const

const customColors = {
  LIGHT_GRAY: "#28332D",
  BLACK: "#000000",
  MEDIUM_GRAY: "#575555",
  WHITE: "#FFFFFF",
  GREEN: "#1BBC65",
  ACTIVE_GREEN: "#00ff00",
  PASTEL_RED: "#FF7474",
  ROYAL_BLUE: "#0904FF",
  LIGHT_GREEN: "#a6f5dc",
  LIGHTGREEN: "#9acd66",
  PURPLE: "#843c9f",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  overlay: "rgba(0, 0, 0, 0.4)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  /**
   * Custom colors.
   */
  customColors,
} as const
