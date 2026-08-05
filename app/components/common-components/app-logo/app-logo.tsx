import { FC } from "react"
import { Image, View } from "react-native"

import { Icon } from "@assets/icons/wholeSeller"

import { DEFAULT_LOGO_TEST_ID } from "./lib/constants"
import { styles } from "./lib/styles"
import type { AppLogoProps } from "./lib/types"

const AppLogo: FC<AppLogoProps> = ({ wrapperStyle, imageStyle, testID = DEFAULT_LOGO_TEST_ID }) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <View style={styles.innerWrapper}>
        <Image
          accessibilityIgnoresInvertColors
          source={Icon.LOGO}
          style={[styles.image, imageStyle]}
          testID={testID}
        />
      </View>
    </View>
  )
}

export default AppLogo
