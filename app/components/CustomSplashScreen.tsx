import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

import { APP_NAME } from "@/lib/constants"
import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

import { AppLogo } from "./common-components"

/**
 * Lightweight splash shown during JS bootstrap (fonts, i18n, nav restore).
 * Uses RN Text so it renders before custom fonts load.
 */
export function CustomSplashScreen() {
  return (
    <View style={styles.container} testID="custom-splash-screen">
      <AppLogo imageStyle={styles.logo} />
      <Text style={styles.title}>{APP_NAME}</Text>
      <ActivityIndicator
        size="large"
        color={commonStyles.colors.secondaryColor}
        style={styles.spinner}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    borderRadius: commonStyles.borderRadius.large,
    height: 65,
    width: 65,
  },
  spinner: {
    marginTop: 24,
  },
  title: {
    color: colors.palette.neutral100,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    textAlign: "center",
  },
})
