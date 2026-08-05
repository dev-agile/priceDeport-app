import { useCallback, useRef, useState } from "react"
import { View, Text } from "react-native"
import { CameraView } from "expo-camera"
import { useFocusEffect } from "@react-navigation/native"

import { ErrorState } from "./components/error-state"
import { PermissionUI } from "./components/permission-ui"
import { useScanner } from "./hooks/use-scanner"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

const BARCODE_TYPES_EXPO = ["qr", "ean13", "code128"] as const

export default function Scanner() {
  const lastScannedRef = useRef<string | null>(null)
  const [mountError, setMountError] = useState<string | null>(null)
  const {
    hasPermission,
    canAskAgain,
    shouldShowPermissionUI,
    isCameraActive,
    cameraError,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleCodeScanned,
  } = useScanner()

  useFocusEffect(
    useCallback(() => {
      lastScannedRef.current = null

      return () => {
        lastScannedRef.current = null
      }
    }, []),
  )

  const onBarcodeScanned = (result: { type?: string; data?: string }) => {
    const data = result?.data ?? ""
    if (!data) return
    if (lastScannedRef.current === data) return
    lastScannedRef.current = data
    handleCodeScanned(result)
  }

  const onRetry = () => {
    setMountError(null)
    handleRetry()
  }

  const displayError = cameraError || mountError
  if (displayError) {
    return <ErrorState error={displayError} onRetry={onRetry} />
  }

  if (shouldShowPermissionUI) {
    return (
      <PermissionUI
        canAskAgain={canAskAgain}
        onRequestPermission={handleRequestPermission}
        onOpenSettings={handleOpenSettings}
      />
    )
  }

  if (!hasPermission) {
    return <View style={styles.container} />
  }

  return (
    <View style={styles.container}>
      {isCameraActive && (
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: [...BARCODE_TYPES_EXPO],
          }}
          onBarcodeScanned={onBarcodeScanned}
          onMountError={({ message }) => {
            setMountError(message || UI_TEXT.CAMERA_ERROR_MESSAGE)
          }}
        />
      )}
      <View style={styles.overlay} pointerEvents="none">
        {/* <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />
        <View style={styles.overlayLeft} />
        <View style={styles.overlayRight} /> */}
        <View style={styles.centerContent}>
          <View style={styles.frame} />
          <Text style={styles.instructionText}>{UI_TEXT.POSITION_BARCODE}</Text>
        </View>
      </View>
    </View>
  )
}
