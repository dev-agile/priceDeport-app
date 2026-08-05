// UpgradeModal.tsx
import { useState } from "react"
import { Modal, StyleSheet, View, Text, TouchableOpacity, Linking, Platform } from "react-native"

import { colors } from "@/theme/colors"

interface UpgradeModalProps {
  isVisible: boolean
  details: any
  forceUpdate: boolean
  setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isVisible,
  details,
  forceUpdate,
  setNeedsUpdate,
}) => {
  const [visible, setVisible] = useState(isVisible)
  const goToStore = async () => {
    const appStoreUrl = details?.applestore_link
    const playStoreUrl = details?.playstore_link
    const supportedUrl = Platform.OS === "ios" ? appStoreUrl : playStoreUrl
    const isSupported = await Linking.canOpenURL(supportedUrl)
    if (isSupported) {
      await Linking.openURL(supportedUrl)
    } else {
      console.error("Can't handle url: " + supportedUrl)
    }
  }

  const close = () => {
    setVisible(forceUpdate)
    setNeedsUpdate(false)
  }

  console.log(details)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log("hello")
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            A new version of the app is available. Please update to continue.
          </Text>
          <TouchableOpacity style={styles.button} onPress={goToStore}>
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
          {!forceUpdate ? (
            <TouchableOpacity style={styles.notNow} onPress={close}>
              <Text style={styles.notNowText}>Not Now</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.palette.blue500,
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonText: {
    color: colors.palette.neutral100,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: colors.palette.neutral900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notNow: {
    margin: 10,
  },
  notNowText: {
    color: colors.palette.blue500,
    fontSize: 15,
  },
})
