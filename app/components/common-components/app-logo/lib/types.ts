import { ImageStyle, StyleProp, ViewStyle } from "react-native"

export interface AppLogoProps {
  wrapperStyle?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  testID?: string
}
