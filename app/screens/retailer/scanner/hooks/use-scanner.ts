import { useCallback, useEffect, useRef, useState } from "react"
import { BackHandler, Linking } from "react-native"
import { useCameraPermissions } from "expo-camera"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { getProduct } from "@/api/retailer/product/api"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"

import { BARCODE_TYPES, CONSOLE_MESSAGES, PRODUCT_ID_LENGTH, UI_TEXT } from "../lib/constants"
import type {
  ScannedCode,
  PermissionState,
  PermissionTuple,
  BarcodeScanningResultLike,
} from "../lib/types"

const normalizePermission = (
  permission: Partial<PermissionState> | null | undefined,
): PermissionState => {
  const granted = Boolean(permission?.granted)
  const canAskAgain = permission?.canAskAgain ?? true
  const status =
    permission?.status ?? (granted ? "granted" : canAskAgain === false ? "denied" : "undetermined")
  return { granted, canAskAgain, status }
}

export function useScanner() {
  const navigation = useNavigation()
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId || ""
  const [permissionFromHook, requestPermission, getPermission] =
    useCameraPermissions() as PermissionTuple
  const [permission, setPermission] = useState<PermissionState | null>(permissionFromHook)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isPermissionCheckComplete, setIsPermissionCheckComplete] = useState(false)
  const isFocusedRef = useRef(false)
  const hasNavigatedRef = useRef(false)
  const isRequestingPermissionRef = useRef(false)
  const permissionRef = useRef<PermissionState | null>(permission)

  const hasPermission = permission?.granted ?? false
  const canAskAgain = permission?.canAskAgain ?? true
  const shouldShowPermissionUI = permission?.status === "denied"
  const isCameraActive = true

  useEffect(() => {
    if (permissionFromHook) {
      setPermission(normalizePermission(permissionFromHook))
    }
  }, [permissionFromHook])

  useEffect(() => {
    permissionRef.current = permission
  }, [permission])

  const extractProductId = useCallback((type: string, value: string): string => {
    const codeType = (type || "qr").toLowerCase()
    if (codeType === "qr") {
      return value || ""
    }
    if (
      codeType.includes("ean") ||
      codeType.includes("ean13") ||
      codeType.includes("code128") ||
      codeType.includes("code-128")
    ) {
      return (value || "").slice(-PRODUCT_ID_LENGTH)
    }
    return (value || "").slice(-PRODUCT_ID_LENGTH)
  }, [])

  const handleCodeScanned = useCallback(
    async (result: BarcodeScanningResultLike) => {
      if (hasNavigatedRef.current || !isFocusedRef.current) {
        return
      }

      const value = result?.data ?? ""
      const codeType = (result?.type ?? "qr").toLowerCase()

      let scannedCode: ScannedCode
      if (codeType === "qr") {
        scannedCode = {
          type: BARCODE_TYPES.QR,
          value,
          productId: "",
        }
      } else if (codeType.includes("ean") || codeType.includes("ean13")) {
        scannedCode = {
          type: BARCODE_TYPES.EAN_13,
          value,
          productId: "",
        }
      } else if (codeType.includes("code128") || codeType.includes("code-128")) {
        scannedCode = {
          type: BARCODE_TYPES.CODE_128,
          value,
          productId: "",
        }
      } else {
        scannedCode = {
          type: BARCODE_TYPES.QR,
          value,
          productId: "",
        }
      }

      scannedCode.productId = extractProductId(codeType, scannedCode.value)

      console.log(CONSOLE_MESSAGES.CODE_SCANNED, scannedCode)
      console.log(CONSOLE_MESSAGES.PRODUCT_ID_EXTRACTED, scannedCode.productId)

      if (!scannedCode.productId || scannedCode.productId.trim().length === 0) {
        console.log(CONSOLE_MESSAGES.INVALID_PRODUCT_ID)
        return
      }

      if (!retailerId) {
        Toast.show({
          type: "error",
          text1: UI_TEXT.CAMERA_ERROR,
          text2: "Retailer session not found",
        })
        return
      }

      hasNavigatedRef.current = true

      try {
        const productResponse = await getProduct({
          retailerId,
          productId: scannedCode.productId,
        })
        const payload = productResponse?.data
        const hasProduct = Boolean(payload?.status !== false && payload?.data)

        if (!hasProduct) {
          hasNavigatedRef.current = false
          Toast.show({
            type: "error",
            text1: "Product not found",
            text2: UI_TEXT.PRODUCT_NOT_FOUND,
          })
          return
        }
      } catch (error: any) {
        const statusCode = error?.response?.status
        const message = error?.response?.data?.message
        hasNavigatedRef.current = false

        if (statusCode === 404 || (typeof message === "string" && message.includes("NOT FOUND"))) {
          Toast.show({
            type: "error",
            text1: "Product not found",
            text2: UI_TEXT.PRODUCT_NOT_FOUND,
          })
          return
        }

        Toast.show({
          type: "error",
          text1: UI_TEXT.CAMERA_ERROR,
          text2: "Unable to fetch scanned product",
        })
        return
      }

      console.log(CONSOLE_MESSAGES.NAVIGATING_TO_PRODUCT)
      // @ts-expect-error - navigation type doesn't include all RetailerRoutes
      navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
        singleProductId: scannedCode.productId,
      })
    },
    [extractProductId, navigation, retailerId],
  )

  const handleRequestPermission = useCallback(async () => {
    if (isRequestingPermissionRef.current) return
    const current = permissionRef.current
    if (current && current.canAskAgain === false) {
      await Linking.openSettings()
      setIsPermissionCheckComplete(true)
      return
    }
    isRequestingPermissionRef.current = true
    setCameraError(null)
    try {
      const result = normalizePermission(await requestPermission())
      setPermission(result)
      console.log("Permission status:", result.status, "granted:", result.granted)
    } finally {
      setIsPermissionCheckComplete(true)
      isRequestingPermissionRef.current = false
    }
  }, [requestPermission])

  const handleOpenSettings = useCallback(async () => {
    try {
      await Linking.openSettings()
    } catch (error) {
      console.log("Failed to open settings:", error)
    }
  }, [])

  const handleRetry = useCallback(() => {
    setCameraError(null)
    hasNavigatedRef.current = false
    void handleRequestPermission()
  }, [handleRequestPermission])

  const handleBackPress = useCallback(() => {
    hasNavigatedRef.current = false
    // @ts-expect-error - navigation type doesn't include all RetailerRoutes
    navigation.navigate(RetailerRoutes.OPTIONS)
    return true
  }, [navigation])

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)
      return () => backHandler.remove()
    }, [handleBackPress]),
  )

  useFocusEffect(
    useCallback(() => {
      isFocusedRef.current = true
      hasNavigatedRef.current = false
      setIsPermissionCheckComplete(false)

      const syncPermissionOnFocus = async () => {
        const freshPermission = normalizePermission(await getPermission())
        setPermission(freshPermission)

        if (freshPermission.granted) {
          setIsPermissionCheckComplete(true)
          return
        }

        // After "Don't allow", never auto-open the system dialog again — only in-app actions.
        if (freshPermission.status === "denied") {
          setIsPermissionCheckComplete(true)
          return
        }

        // undetermined (incl. Android "Only this time" reset): prompt once on entering Scan.
        await handleRequestPermission()
      }
      void syncPermissionOnFocus()

      return () => {
        isFocusedRef.current = false
      }
    }, [getPermission, handleRequestPermission]),
  )

  return {
    hasPermission,
    canAskAgain,
    shouldShowPermissionUI,
    isCameraActive: isCameraActive && hasPermission && isPermissionCheckComplete,
    isInitialized: true,
    cameraError,
    device: null,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleBackPress,
    handleCodeScanned,
  }
}
