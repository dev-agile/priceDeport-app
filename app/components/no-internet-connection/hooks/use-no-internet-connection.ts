import { useEffect, useState } from "react"
// import NetInfo from "@react-native-community/netinfo"
import * as Network from "expo-network"

export const useNoInternetConnection = () => {
  const [connected, setConnected] = useState<boolean>(true)
  const [visible, setVisible] = useState<any>("flex")
  useEffect(() => {
    const checkConnection = async () => {
      const state = await Network.getNetworkStateAsync()
      setConnected(state.isConnected ?? false)
    }

    checkConnection()
    const interval = setInterval(checkConnection, 3000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (connected) {
      const timer = setTimeout(() => {
        setVisible("none")
      }, 6000)
      return () => {
        clearTimeout(timer)
      }
    } else {
      setVisible("flex")
    }
  }, [connected])

  return { connected, visible }
}
