import { Text, View } from "react-native"
import { BaseToast, ErrorToast } from "react-native-toast-message"

import { CONTENT_CONTAINER_PADDING_HORIZONTAL } from "./lib/constants"
import { styles } from "./lib/styles"
import type { ToastProps } from "./lib/types"

const ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={{ paddingHorizontal: CONTENT_CONTAINER_PADDING_HORIZONTAL }}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={styles.errorText1Style}
      text2Style={styles.errorText2Style}
    />
  ),

  tomatoToast: ({ text1, props }: ToastProps) => (
    <View style={styles.tomatoToast}>
      <Text>{text1}</Text>
      <Text>{props?.uuid}</Text>
    </View>
  ),
}

export default ToastConfig
