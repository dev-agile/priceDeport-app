import { forwardRef, useCallback, useMemo } from "react"
import { Text, TouchableOpacity } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"

import { styles } from "./selection-bottom-sheet.styles"

interface SelectionBottomSheetProps {
  title: string
  items: string[] | null | undefined
  selectedValue: string | null
  onSelect: (item: string) => void
}

export const SelectionBottomSheet = forwardRef<BottomSheetModal, SelectionBottomSheetProps>(
  function SelectionBottomSheet({ title, items, selectedValue, onSelect }, ref) {
    const snapPoints = useMemo(() => ["50%", "85%"], [])

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      [],
    )

    const renderItem = useCallback(
      ({ item }: { item: string }) => {
        const isSelected = item === selectedValue
        return (
          <TouchableOpacity
            style={[styles.item, isSelected && styles.itemSelected]}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>{item}</Text>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        )
      },
      [selectedValue, onSelect],
    )

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </BottomSheetView>
        <BottomSheetFlatList
          data={items ?? []}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheetModal>
    )
  },
)
