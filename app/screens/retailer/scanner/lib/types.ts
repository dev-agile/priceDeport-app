export interface UseScannerReturn {
  hasPermission: boolean
  canAskAgain: boolean
  shouldShowPermissionUI: boolean
  isCameraActive: boolean
  isInitialized: boolean
  cameraError: string | null
  handleRequestPermission: () => Promise<void>
  handleOpenSettings: () => Promise<void>
  handleRetry: () => void
  handleBackPress: () => boolean
}

export interface ScannedCode {
  type: "qr" | "ean-13" | "code-128"
  value: string
  productId: string
}

export interface PermissionUIProps {
  canAskAgain: boolean
  onRequestPermission: () => Promise<void>
  onOpenSettings: () => Promise<void>
}

export interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export interface PermissionState {
  granted: boolean
  canAskAgain: boolean
  status?: string
}

export type PermissionTuple = [
  PermissionState | null,
  () => Promise<PermissionState>,
  () => Promise<PermissionState>,
]

export interface BarcodeScanningResultLike {
  type?: string
  data?: string
}

export interface UseScannerReturnWithHandler extends UseScannerReturn {
  handleCodeScanned: (result: BarcodeScanningResultLike) => void
}
