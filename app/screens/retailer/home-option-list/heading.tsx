import { View, Image } from "react-native"

import { headingStyles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

const Heading = () => {
  return (
    <View style={headingStyles.container}>
      <View style={headingStyles.topBar} />
      <View style={headingStyles.imageContainer}>
        <Image source={Icon.LOGO} style={headingStyles.image} />
      </View>
      <View style={headingStyles.bottomBar}></View>
    </View>
  )
}

export default Heading
