import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"

import { styles } from "./lib/styles"
import type { IProps } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"

const TextInputContainer = ({ title, textContainerStyle, showIcon = false, ...rest }: IProps) => {
  return (
    <View style={textContainerStyle}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.textInputContainer}>
        <TextInput {...rest} style={styles.textInput} />
        <TouchableOpacity>
          {showIcon && (
            <Image source={Icon.SHOWPASSWORD} resizeMode="contain" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TextInputContainer
