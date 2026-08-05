// eslint-disable-next-line no-restricted-imports
import React from "react"
import { Image, View } from "react-native"

import { Icon } from "@assets/icons/wholeSeller"

import { AppLogo, ButtonField } from "@/components/common-components"
import { Text } from "@/components/Text"
import { role } from "@/utils/role"

import { useOptionScreen } from "./hooks/use-option-screen"
import {
  // COMING_SOON,
  CONTACT_TEXT,
  INSTRUCTION,
  RETAILER_BUTTON,
  SUBTITLE,
  TITLE,
  // WHOLESALER_BUTTON,
} from "./lib/constants"
import { styles } from "./lib/styles"

interface OptionScreenProps {}

export const OptionScreen: React.FC<OptionScreenProps> = (): React.JSX.Element => {
  const { handleOptionPress } = useOptionScreen()

  return (
    // <Screen preset="fixed" backgroundColor={colors.palette.neutral200}>
    <View style={styles.content}>
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <AppLogo imageStyle={styles.image} wrapperStyle={styles.iconWrapper} />
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>{TITLE}</Text>
      <Text style={styles.subtitle}>{SUBTITLE}</Text>

      {/* Instruction Text */}
      <Text style={styles.instructionText}>{INSTRUCTION}</Text>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <ButtonField
          icon={<Image source={Icon.SHOPINGCART} style={styles.icon} />}
          onPress={() => handleOptionPress(role.RETAILER)}
          textAlign="left"
          value={RETAILER_BUTTON}
          variant="active"
        />
        {/* <ButtonField
          btnDisable={true}
          icon={<Image source={Icon.HOME} style={styles.icon} />}
          textAlign="left"
          value={WHOLESALER_BUTTON}
          variant="disabled"
        />
        <Text style={styles.comingSoonText}>{COMING_SOON}</Text> */}
      </View>

      {/* Contact Text */}
      <Text style={styles.contactText}>{CONTACT_TEXT}</Text>
    </View>
    // </Screen>
  )
}
