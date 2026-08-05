import { PermissionsAndroid } from "react-native"
import DeviceInfo from "react-native-device-info"

export const useStoragePermission = async ({
  onPermissionGranted,
}: {
  onPermissionGranted: () => void
}) => {
  try {
    const systemVersion = parseInt(DeviceInfo.getSystemVersion(), 10)

    if (systemVersion >= 13) {
      console.log("Storage permission granted")
      onPermissionGranted()
    } else {
      const requestPermission = async () => {
        console.log("requestPermission")
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to your storage to download the PDF.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        )
        console.log(result)
        if (result === PermissionsAndroid.RESULTS.GRANTED || "never_ask_again") {
          console.log("Storage permission granted")
          onPermissionGranted()
        } else {
          console.log("Storage permission denied")
        }
      }

      requestPermission()
    }
  } catch (error) {
    console.warn(error)
  }
}
