import { forwardRef, useCallback } from "react"
import { Text, TouchableOpacity } from "react-native"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"

import { styles } from "./peer-group-bottom-sheet.styles"
import { UI_TEXT } from "../lib/constants"

interface PeerGroupBottomSheetProps {
  peerGroups: string[]
  selectedPeerGroup: string | null
  onSelect: (group: string) => void
}

export const PeerGroupBottomSheet = forwardRef<BottomSheetModal, PeerGroupBottomSheetProps>(
  function PeerGroupBottomSheet({ peerGroups, selectedPeerGroup, onSelect }, ref) {
    const snapPoints = ["38%"]

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      [],
    )

    const handleSelect = useCallback(
      (group: string) => {
        onSelect(group)
        if (typeof ref !== "function" && ref?.current) {
          ref.current.dismiss()
        }
      },
      [onSelect, ref],
    )

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>{UI_TEXT.PEER_GROUP}</Text>
          {peerGroups.map((group) => (
            <TouchableOpacity
              key={group}
              style={styles.optionRow}
              onPress={() => handleSelect(group)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedPeerGroup === group ? styles.selectedOptionText : null,
                ]}
              >
                {group}
              </Text>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)
