// useCustomBackHandler.js
import React from "react"
import { BackHandler } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

export const useCustomBackHandler = (
  isCustomHandlingEnabled,
  customHandler,
  navigation,
  homeScreenRoute,
) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isCustomHandlingEnabled()) {
          customHandler()
          return true
        } else {
          // If not in custom handling mode, navigate to the home screen
          if (homeScreenRoute) {
            navigation.navigate(homeScreenRoute)
          } else {
            // If homeScreenRoute is not provided, simply go back
            navigation.goBack()
          }
          return true
        }
      }

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)

      return () => subscription.remove()
    }, [isCustomHandlingEnabled, customHandler, navigation, homeScreenRoute]),
  )
}
