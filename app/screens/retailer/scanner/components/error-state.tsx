import { View, Text } from "react-native"

import ButtonField from "@/components/common-components/button/button"

import { UI_TEXT } from "../lib/constants"
import { styles } from "../lib/styles"
import type { ErrorStateProps } from "../lib/types"

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const isRebuildError = error?.includes("rebuild") || error?.includes("npx expo prebuild")

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>{UI_TEXT.CAMERA_ERROR}</Text>
      <Text style={styles.errorMessage}>{error || UI_TEXT.CAMERA_ERROR_MESSAGE}</Text>
      {isRebuildError ? (
        <Text style={styles.errorMessage}>
          {"\n"}The camera module requires a native rebuild. Please run the commands shown above.
        </Text>
      ) : (
        <ButtonField value={UI_TEXT.TRY_AGAIN} onPress={onRetry} />
      )}
    </View>
  )
}
