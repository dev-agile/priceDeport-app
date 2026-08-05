import { ImageBackground, StyleSheet } from "react-native"

import { Images } from "@assets/Images/wholeSeller"

import { Text } from "@/components/Text"
import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

interface OptionBtnProps {
  value: string
}

export const OptionBotton: React.FC<OptionBtnProps> = ({ value }): React.JSX.Element => {
  return (
    <ImageBackground
      source={Images.BtnGradient}
      style={styles.container}
      imageStyle={styles.imageStyle}
      resizeMode="cover"
    >
      <Text style={styles.text}>{value}</Text>
    </ImageBackground>
  )
}

/* eslint-disable react-native/no-color-literals */
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
  },
  imageStyle: {
    borderRadius: 10,
  },
  text: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
})
/* eslint-enable react-native/no-color-literals */
