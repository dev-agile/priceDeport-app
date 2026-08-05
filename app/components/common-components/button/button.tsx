import { FC } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { ACTIVITY_INDICATOR_COLOR, ACTIVITY_INDICATOR_SIZE } from "./lib/constants"
import { styles } from "./lib/styles"
import type { ButtonFieldProps } from "./lib/types"

const ButtonField: FC<ButtonFieldProps> = ({
  value,
  onPress,
  isDisabled,
  btnDisable,
  isLoading,
  icon,
  textAlign = "center",
  variant = "default",
}) => {
  const isDisabledState = btnDisable || isDisabled || variant === "disabled"
  const isActive = variant === "active" && !isDisabledState

  // Determine background color based on variant
  const getBackgroundStyle = () => {
    if (variant === "disabled" || isDisabledState) {
      return styles.buttonContainerDisabled
    }
    if (variant === "active" || isActive) {
      return styles.buttonContainerActive
    }
    return styles.buttonContainer
  }

  // Determine text color based on variant
  const getTextStyle = () => {
    if (textAlign === "center") {
      return [
        styles.buttonText,
        variant === "disabled" || isDisabledState ? styles.buttonTextDisabled : null,
        styles.buttonTextCenter,
      ].filter(Boolean)
    } else {
      return [
        styles.buttonText,
        variant === "disabled" || isDisabledState ? styles.buttonTextDisabled : null,
        styles.buttonTextLeft,
      ].filter(Boolean)
    }
  }

  const containerStyle = [
    getBackgroundStyle(),
    { paddingVertical: responsiveHeight(2) },
    !icon ? { flexDirection: "column" as const } : null,
    icon && textAlign === "left" ? { justifyContent: "flex-start" as const } : null,
  ].filter(Boolean)

  return (
    <TouchableOpacity
      disabled={isDisabledState}
      style={containerStyle}
      onPress={onPress}
      activeOpacity={isDisabledState ? 1 : 0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={ACTIVITY_INDICATOR_COLOR} size={ACTIVITY_INDICATOR_SIZE} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={getTextStyle()}>{value}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

export default ButtonField
