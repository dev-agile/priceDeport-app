import { Text, View } from "react-native"

import { colors } from "@/theme/colors"

import { useNoInternetConnection } from "./hooks/use-no-internet-connection"
import { CONNECTED_MESSAGE, NO_INTERNET_CONNECTION_MESSAGE } from "./lib/constants"
import { styles } from "./lib/styles"

const NoInternetConnection = () => {
  const { connected, visible } = useNoInternetConnection()
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: connected ? colors.palette.green500 : colors.palette.grey500,
        display: visible,
      }}
    >
      <Text style={{ color: colors.palette.neutral100 }}>
        {connected ? CONNECTED_MESSAGE : NO_INTERNET_CONNECTION_MESSAGE}
      </Text>
    </View>
  )
}

export default NoInternetConnection
