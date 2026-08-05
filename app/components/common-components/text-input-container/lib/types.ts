import { StyleProp, TextInputProps, ViewStyle } from "react-native"

export interface ITextContainerProps {
  title: string
  textContainerStyle?: StyleProp<ViewStyle>
  showIcon?: boolean
}

export type IProps = ITextContainerProps & TextInputProps
