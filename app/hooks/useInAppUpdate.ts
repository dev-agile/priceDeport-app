import { useEffect } from "react"
import { Alert, Platform } from "react-native"
import * as ExpoInAppUpdates from "expo-in-app-updates"

export const useInAppUpdates = () => {
  useEffect(() => {
    if (__DEV__ || Platform.OS === "web") return

    const checkForUpdates = async () => {
      try {
        if (Platform.OS === "android") {
          // If you want an immediate update that will cover the app with the update overlay, set it to true.
          // More details: https://developer.android.com/guide/playcore/in-app-updates#update-flows
          await ExpoInAppUpdates.checkAndStartUpdate(false)
        } else {
          const result = await ExpoInAppUpdates.checkForUpdate()

          if (!result.updateAvailable) return

          Alert.alert(
            "Update available",
            "A new version of the app is available with many improvements and bug fixes. Would you like to update now?",
            [
              {
                text: "Update",
                isPreferred: true,
                onPress: async () => {
                  try {
                    await ExpoInAppUpdates.startUpdate()
                  } catch (err) {
                    console.error("Failed to start update:", err)
                  }
                },
              },
              { text: "Cancel" },
            ],
          )
        }
      } catch (err) {
        console.error("Update check failed:", err)
      }
    }

    checkForUpdates()
  }, [])
}
