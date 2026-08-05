export const UI_TEXT = {
  SCANNER_TITLE: "Scanner",
  CAMERA_PERMISSION_REQUIRED: "Camera Permission Required",
  CAMERA_PERMISSION_MESSAGE: "Camera permission is required to scan products",
  REQUEST_PERMISSION: "Require Permission",
  OPEN_SETTINGS: "Open Settings",
  TRY_AGAIN: "Try Again",
  CAMERA_ERROR: "Camera Error",
  CAMERA_ERROR_MESSAGE: "Unable to access camera. Please try again.",
  CAMERA_MODULE_NOT_LINKED:
    "Camera module not linked. Please rebuild the native app:\n\n1. Run: npx expo prebuild --clean\n2. Then: npx expo run:android (or npx expo run:ios)",
  SCANNING: "Scanning...",
  POSITION_BARCODE: "Position barcode/QR code within the frame",
  PRODUCT_NOT_FOUND: "Scanned product is not available in our database",
} as const

export const BARCODE_TYPES = {
  QR: "qr",
  EAN_13: "ean-13",
  CODE_128: "code-128",
} as const

export const PRODUCT_ID_LENGTH = 12

export const CONSOLE_MESSAGES = {
  CAMERA_INITIALIZED: "Camera initialized successfully",
  CAMERA_ERROR: "Camera error:",
  PERMISSION_DENIED: "Camera permission denied",
  PERMISSION_GRANTED: "Camera permission granted",
  CODE_SCANNED: "Code scanned:",
  PRODUCT_ID_EXTRACTED: "Product ID extracted:",
  INVALID_PRODUCT_ID: "Invalid or empty product ID",
  NAVIGATING_TO_PRODUCT: "Navigating to Product Description",
  CAMERA_ACTIVATED: "Camera activated",
  CAMERA_DEACTIVATED: "Camera deactivated",
  APP_STATE_CHANGED: "App state changed:",
} as const
