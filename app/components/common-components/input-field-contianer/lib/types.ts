import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native"

export interface ITextContainerProps {
  title: string
  textContainerStyle?: StyleProp<ViewStyle>
  showIcon?: boolean
  editable?: boolean
  secureTextEntry?: boolean
  onChangeText?: (text: string) => void
  onTogglePassword?: () => void
  dropdownData?: Array<{ key: string; value: string }>
  defaultOption?: { key: string; value: string }
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>
  titleStyle?: StyleProp<TextStyle>
}

export type IProps = ITextContainerProps & TextInputProps
