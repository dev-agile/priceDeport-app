import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"

import { SORT_OPTIONS_ARRAY } from "../lib/constants"
import { modalStyles } from "../lib/styles"

interface SortModalProps {
  visible: boolean
  onSelect: (sortId: string) => void
  onClose: () => void
}

export const SortModal: React.FC<SortModalProps> = ({ visible, onSelect, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable onPress={onClose} style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Sort By</Text>
          {SORT_OPTIONS_ARRAY.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={modalStyles.itemContainer}
              onPress={() => {
                onSelect(option.id)
                onClose()
              }}
            >
              <Text style={modalStyles.itemText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  )
}
