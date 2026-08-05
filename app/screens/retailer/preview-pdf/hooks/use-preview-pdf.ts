import { useState, useCallback, useMemo, useEffect } from "react"
import { Alert, Platform } from "react-native"
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid } from "react-native"
import * as Notifications from "expo-notifications"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system/legacy"
import Toast from "react-native-toast-message"

import type { Order, VendorData, PDFData } from "@/api/retailer/orders/types"
import { loadString, saveString } from "@/utils/storage"

import {
  CONSOLE_MESSAGES,
  ERROR_MESSAGES,
  PREVIEW_PDF_SAF_DOWNLOAD_DIR_KEY,
  UI_TEXT,
} from "../lib/constants"
import type { UsePreviewPDFReturn } from "../lib/types"

const { StorageAccessFramework } = FileSystem

// Safe number for PDF display (handles undefined, null, string from API)
const toPdfNumber = (v: unknown): number => {
  if (typeof v === "number" && !isNaN(v) && isFinite(v)) return v
  const n = Number(v)
  return typeof n === "number" && !isNaN(n) && isFinite(n) ? n : 0
}

// Generate HTML content for PDF
const generateHTMLContent = (order: Order, vendorData: VendorData): string => {
  const formatDate = (dateString: string) => {
    try {
      return dateString?.split?.("T")?.[0] ?? String(dateString ?? "")
    } catch {
      return String(dateString ?? "")
    }
  }

  // Generate table rows for each wholesaler's items
  const generateTableRows = (pdfData: PDFData[]) => {
    return (pdfData ?? [])
      .map((data) => {
        const items = data?.items ?? []
        const itemRows = items
          .map((item) => {
            const price = toPdfNumber(item?.price)
            const productTotalPrice = toPdfNumber(item?.productTotalPrice)
            const productId = item?.product_id ?? ""
            const name = item?.name ?? ""
            const qty = toPdfNumber(item?.items)
            return `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${productId}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${name}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${qty}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${price.toFixed(2)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${productTotalPrice.toFixed(2)}</td>
          </tr>
        `
          })
          .join("")

        const dataAny = data as { totalPrice?: number; total?: number }
        const totalPrice = toPdfNumber(dataAny.totalPrice ?? dataAny.total)
        const wholesaler = data?.wholesalerData ?? {}

        return `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 10px;">Wholesaler Information</h3>
          <p><strong>Name:</strong> ${wholesaler.wholesaler_name ?? ""}</p>
          <p><strong>Location:</strong> ${wholesaler.wholesaler_location ?? ""}</p>
          <p><strong>City:</strong> ${wholesaler.city ?? ""}, ${wholesaler.zipCode ?? ""}</p>
          <p><strong>Phone:</strong> ${wholesaler.wholesaler_number ?? ""}</p>
          <p><strong>Email:</strong> ${wholesaler.wholesaler_email ?? ""}</p>
          
          <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product ID</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product Name</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Unit Price</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">$${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `
      })
      .join("")
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          h2 {
            color: #34495e;
            margin-top: 20px;
          }
          h3 {
            color: #555;
          }
          .header {
            margin-bottom: 30px;
          }
          .info-section {
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Purchase Order</h1>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Date:</strong> ${formatDate(order.date)}</p>
        </div>
        
        <div class="info-section">
          <h2>Retailer Information</h2>
          <p><strong>Store Name:</strong> ${vendorData.storeName}</p>
          <p><strong>Location:</strong> ${vendorData.location}</p>
          <p><strong>City:</strong> ${vendorData.city}, ${vendorData.zipCode}</p>
          <p><strong>Phone:</strong> ${vendorData.number}</p>
          <p><strong>Email:</strong> ${vendorData.email}</p>
        </div>
        
        ${generateTableRows(order.pdfData)}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #3498db;">
          <h2>Order Summary</h2>
          <p style="font-size: 18px;"><strong>Total Order Price: $${toPdfNumber(order.totalOrderPrice).toFixed(2)}</strong></p>
        </div>
      </body>
    </html>
  `
}

export function usePreviewPDF(
  order: Order | null,
  vendorData: VendorData | null,
): UsePreviewPDFReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [pdfPath, setPdfPath] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Same HTML used for file generation and in-app preview
  const htmlContent = useMemo(() => {
    if (!order || !vendorData) return ""
    return generateHTMLContent(order, vendorData)
  }, [order, vendorData])

  // Generate PDF (used for file creation; same HTML as htmlContent is used for in-app preview)
  const generatePDF = useCallback(async () => {
    if (!order || !vendorData) return
    setIsLoading(true)
    setError(null)

    try {
      console.log(CONSOLE_MESSAGES.GENERATING_PDF)

      // const html = generateHTMLContent(order, vendorData)
      const fileName = `Order_${order.orderId}_${Date.now()}.pdf`

      console.log(fileName)

      // Determine file path based on platform
      // const filePath =
      //   Platform.OS === "ios"
      //     ? `${RNFS.DocumentDirectoryPath}/${fileName}`
      //     : `${RNFS.DownloadDirectoryPath}/${fileName}`

      // const options = {
      //   html: htmlContent,
      //   fileName: fileName,
      //   directory: (Platform.OS === "ios" ? "Documents" : "Downloads") as "Documents" | "Downloads",
      //   base64: false,
      // }

      // const file = await RNHTMLtoPDF.convert(options)
      // console.log(CONSOLE_MESSAGES.PDF_GENERATED, file.filePath)
      // setPdfPath(file.filePath || filePath)

      Toast.show({
        text1: UI_TEXT.SUCCESS,
        type: "success",
      })
    } catch (err: any) {
      const errorMessage = err?.message || ERROR_MESSAGES.GENERATION_FAILED
      console.error(CONSOLE_MESSAGES.PDF_ERROR, err)
      setError(errorMessage)
      Toast.show({
        text1: UI_TEXT.ERROR,
        text2: errorMessage,
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }, [order, vendorData])

  // Auto-generate PDF on mount so the preview is shown immediately (no Generate button)
  useEffect(() => {
    if (order && vendorData) {
      generatePDF()
    }
  }, [order, vendorData, generatePDF])

  // Request storage permission for Android
  const requestStoragePermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== "android") {
      return true
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to your storage to save the PDF.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn("Permission error:", err)
      return false
    }
  }, [])

  // Share PDF via expo-sharing.
  //
  // Why expo-sharing instead of react-native-share:
  //   On MIUI (Xiaomi/Redmi), Android's implicit FLAG_GRANT_READ_URI_PERMISSION
  //   set on an Intent.createChooser() is silently blocked — the receiving app
  //   cannot open the shared file.  expo-sharing explicitly calls
  //   context.grantUriPermission(pkg, uri, FLAG_GRANT_READ_URI_PERMISSION) for
  //   every app that could handle the intent, which MIUI does honour.
  //
  // Why a stable filename in Print/:
  //   expo-sharing resolves after the user *selects* an app, but the receiving
  //   app reads the file asynchronously afterwards.  We must not delete the file
  //   immediately.  Using a deterministic name (one file per orderId) ensures
  //   the file stays alive and old prints don't accumulate.
  const sharePDF = useCallback(async () => {
    if (!order || !vendorData || !htmlContent) {
      Toast.show({
        text1: ERROR_MESSAGES.NO_PDF,
        type: "error",
      })
      return
    }

    try {
      console.log(CONSOLE_MESSAGES.SHARING_PDF)

      const isAvailable = await Sharing.isAvailableAsync()
      if (!isAvailable) {
        Toast.show({ text1: "Sharing is not available on this device", type: "error" })
        return
      }

      // Render HTML → PDF.  expo-print writes to cacheDir/Print/<uuid>.pdf.
      const { uri: printUri } = await Print.printToFileAsync({ html: htmlContent })

      // Move to a stable name within the same Print/ directory.
      // expo-sharing's SharingFileProvider (sharing_provider_paths.xml) declares
      // <cache-path path="." /> which covers cacheDir/Print/ completely.
      const stableUri = `${FileSystem.cacheDirectory}Print/Order_${order.orderId}.pdf`
      await FileSystem.deleteAsync(stableUri, { idempotent: true })
      await FileSystem.moveAsync({ from: printUri, to: stableUri })

      await Sharing.shareAsync(stableUri, {
        mimeType: "application/pdf",
        dialogTitle: `Share Order ${order.orderId}`,
        UTI: "com.adobe.pdf", // iOS only
      })
    } catch (err: any) {
      if (err?.message !== "User did not share") {
        console.error("Share error:", err)
        Toast.show({
          text1: ERROR_MESSAGES.SHARE_FAILED,
          text2: err?.message,
          type: "error",
        })
      }
    }
  }, [order, vendorData, htmlContent])

  // Save PDF to device: Android = SAF (Downloads), iOS = documentDirectory
  const savePDFToDevice = useCallback(async (): Promise<string | null> => {
    if (!order || !vendorData || !htmlContent) return null

    const { uri: tempUri } = await Print.printToFileAsync({ html: htmlContent })
    const base64 = await FileSystem.readAsStringAsync(tempUri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    if (Platform.OS === "android") {
      let directoryUri = loadString(PREVIEW_PDF_SAF_DOWNLOAD_DIR_KEY)
      if (!directoryUri) {
        const downloadUri = StorageAccessFramework.getUriForDirectoryInRoot("Download")
        const permissions =
          await StorageAccessFramework.requestDirectoryPermissionsAsync(downloadUri)
        if (!permissions.granted || !permissions.directoryUri) {
          return null
        }
        directoryUri = permissions.directoryUri
        saveString(PREVIEW_PDF_SAF_DOWNLOAD_DIR_KEY, directoryUri)
      }

      const safFileUri = await StorageAccessFramework.createFileAsync(
        directoryUri,
        `Order_${order.orderId}`,
        "application/pdf",
      )
      await FileSystem.writeAsStringAsync(safFileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })
      return safFileUri
    }

    const fileName = `Order_${order.orderId}.pdf`
    const dir = FileSystem.documentDirectory ?? ""
    const destUri = `${dir}${fileName}`
    await FileSystem.copyAsync({ from: tempUri, to: destUri })
    return destUri
  }, [order, vendorData, htmlContent])

  // Show system notification after successful save (Android: tap opens PDF)
  const showDownloadNotification = useCallback(async (fileUri: string) => {
    try {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== "granted") return

      await Notifications.scheduleNotificationAsync({
        content: {
          title: UI_TEXT.NOTIFICATION_TITLE,
          body: UI_TEXT.NOTIFICATION_BODY,
          data: { fileUri },
        },
        trigger: null,
      })
    } catch (e) {
      console.warn("Could not show download notification:", e)
    }
  }, [])

  // Download PDF: real save, then notification + toast only on success
  const downloadPDF = useCallback(async () => {
    if (!order || !vendorData || !htmlContent) {
      Toast.show({ text1: ERROR_MESSAGES.NO_PDF, type: "error" })
      return
    }

    if (Platform.OS === "android") {
      const hasPermission = await requestStoragePermission()
      if (!hasPermission) {
        Alert.alert(UI_TEXT.PERMISSION_DENIED_TITLE, UI_TEXT.PERMISSION_DENIED_MESSAGE, [
          { text: "OK" },
        ])
        return
      }
    }

    setIsDownloading(true)
    try {
      console.log(CONSOLE_MESSAGES.DOWNLOADING_PDF)

      const savedUri = await savePDFToDevice()

      if (!savedUri) {
        if (Platform.OS === "android") {
          Alert.alert(
            UI_TEXT.PERMISSION_DENIED_TITLE,
            "Please select a folder (e.g. Download) to save the PDF.",
            [{ text: "OK" }],
          )
        }
        Toast.show({ text1: ERROR_MESSAGES.DOWNLOAD_FAILED, type: "error" })
        return
      }

      setPdfPath(savedUri)
      await showDownloadNotification(savedUri)
      Toast.show({
        text1: UI_TEXT.DOWNLOAD_SUCCESS,
        text2:
          Platform.OS === "ios" ? UI_TEXT.DOWNLOAD_SUCCESS_IOS : UI_TEXT.DOWNLOAD_SUCCESS_ANDROID,
        type: "success",
      })
    } catch (err: any) {
      const errorMessage = err?.message ?? ERROR_MESSAGES.DOWNLOAD_FAILED
      console.error("Download error:", err)
      Toast.show({
        text1: ERROR_MESSAGES.DOWNLOAD_FAILED,
        text2: errorMessage,
        type: "error",
      })
    } finally {
      setIsDownloading(false)
    }
  }, [
    order,
    vendorData,
    htmlContent,
    requestStoragePermission,
    savePDFToDevice,
    showDownloadNotification,
  ])

  return {
    isLoading,
    isDownloading,
    pdfPath,
    error,
    htmlContent,
    generatePDF,
    sharePDF,
    downloadPDF,
  }
}
