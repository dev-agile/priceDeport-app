import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"

import { modalStyles } from "../lib/styles"

interface PeerGroupModalProps {
  visible: boolean
  peerGroups: string[]
  selectedPeerGroup: string | null
  onSelect: (peerGroup: string) => void
  onClose: () => void
}

export const PeerGroupModal: React.FC<PeerGroupModalProps> = ({
  visible,
  peerGroups,
  selectedPeerGroup,
  onSelect,
  onClose,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable onPress={onClose} style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Select Peer Group</Text>
          {peerGroups.map((peerGroup) => (
            <TouchableOpacity
              key={peerGroup}
              style={[
                modalStyles.itemContainer,
                selectedPeerGroup === peerGroup && modalStyles.peerGroupModalOptions,
              ]}
              onPress={() => {
                onSelect(peerGroup)
                onClose()
              }}
            >
              <Text style={modalStyles.itemText}>{peerGroup}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  )
}
