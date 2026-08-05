import { View, Text } from "react-native"

import ButtonField from "@/components/common-components/button/button"

import { UI_TEXT } from "../lib/constants"
import { styles } from "../lib/styles"
import type { PermissionUIProps } from "../lib/types"

export const PermissionUI: React.FC<PermissionUIProps> = ({
  canAskAgain,
  onRequestPermission,
  onOpenSettings,
}) => {
  const primaryButtonLabel = canAskAgain ? UI_TEXT.REQUEST_PERMISSION : UI_TEXT.OPEN_SETTINGS
  const primaryButtonAction = canAskAgain ? onRequestPermission : onOpenSettings

  return (
    <View style={styles.permissionContainer}>
      <Text style={styles.permissionIcon}>📷</Text>
      <Text style={styles.permissionTitle}>{UI_TEXT.CAMERA_PERMISSION_REQUIRED}</Text>
      <Text style={styles.permissionMessage}>{UI_TEXT.CAMERA_PERMISSION_MESSAGE}</Text>
      <View style={styles.buttonContainer}>
        <ButtonField value={primaryButtonLabel} onPress={primaryButtonAction} />
        {canAskAgain ? (
          <ButtonField value={UI_TEXT.OPEN_SETTINGS} onPress={onOpenSettings} />
        ) : null}
      </View>
    </View>
  )
}
