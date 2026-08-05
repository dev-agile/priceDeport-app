import { Text, TouchableOpacity, View } from "react-native"

import { styles } from "./peer-group-selector.styles"

interface PeerGroupSelectorProps {
  peerGroups: string[]
  selectedPeerGroup: string | null
  onSelect: (peerGroup: string) => void
}

export function PeerGroupSelector({
  peerGroups,
  selectedPeerGroup,
  onSelect,
}: PeerGroupSelectorProps) {
  return (
    <View style={styles.container}>
      {peerGroups.map((peerGroup) => {
        const isSelected = selectedPeerGroup === peerGroup
        return (
          <TouchableOpacity
            key={peerGroup}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelect(peerGroup)}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
              {peerGroup}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
