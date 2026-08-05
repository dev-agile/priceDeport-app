import { forwardRef, useCallback } from "react"
import { Text, TouchableOpacity } from "react-native"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"

import { styles } from "./sort-bottom-sheet.styles"
import { SORT_OPTIONS_ARRAY } from "../lib/constants"

interface SortBottomSheetProps {
  onSelect: (sortId: string) => void
}

export const SortBottomSheet = forwardRef<BottomSheetModal, SortBottomSheetProps>(
  function SortBottomSheet({ onSelect }, ref) {
    const snapPoints = ["40%"]

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      [],
    )

    const handleSelectOption = useCallback(
      (sortId: string) => {
        onSelect(sortId)
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
          <Text style={styles.title}>Sort By</Text>
          {SORT_OPTIONS_ARRAY.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={() => handleSelectOption(option.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)
