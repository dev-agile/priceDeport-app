import { Modal, Text, TouchableOpacity, View } from "react-native"

import { DEFAULT_CANCEL_TEXT, DEFAULT_CONFIRM_TEXT, MODAL_ANIMATION_TYPE } from "./lib/constants"
import { styles } from "./lib/styles"
import type { PopupModalProps } from "./lib/types"

const PopupModal: React.FC<PopupModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  message,
  confirmText = DEFAULT_CONFIRM_TEXT,
  cancelText = DEFAULT_CANCEL_TEXT,
}) => {
  return (
    <Modal
      animationType={MODAL_ANIMATION_TYPE}
      onRequestClose={onClose}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PopupModal
