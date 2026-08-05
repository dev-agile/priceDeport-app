export const UI_TEXT = {
  TITLE: "Order PDF",
  GENERATE_PDF: "Generate PDF",
  SHARE_PDF: "Share PDF",
  DOWNLOAD_PDF: "Download PDF",
  GENERATING: "Generating PDF...",
  ERROR: "Failed to generate PDF",
  SUCCESS: "PDF generated successfully",
  DOWNLOAD_SUCCESS: "PDF downloaded successfully",
  DOWNLOAD_SUCCESS_IOS: "Saved to app documents",
  DOWNLOAD_SUCCESS_ANDROID: "Saved to Downloads",
  DOWNLOADING: "Downloading...",
  PERMISSION_DENIED_TITLE: "Permission required",
  PERMISSION_DENIED_MESSAGE: "Storage permission is needed to save the PDF to your device.",
  NOTIFICATION_TITLE: "Download Complete",
  NOTIFICATION_BODY: "Your PDF has been downloaded",
} as const

/** Storage key for caching SAF directory URI (Android) so we don't ask every time */
export const PREVIEW_PDF_SAF_DOWNLOAD_DIR_KEY = "preview_pdf.saf_download_dir_uri"

export const CONSOLE_MESSAGES = {
  GENERATING_PDF: "Generating PDF...",
  PDF_GENERATED: "PDF generated successfully:",
  PDF_ERROR: "Error generating PDF:",
  SHARING_PDF: "Sharing PDF...",
  DOWNLOADING_PDF: "Downloading PDF...",
} as const

export const ERROR_MESSAGES = {
  GENERATION_FAILED: "Failed to generate PDF",
  SHARE_FAILED: "Failed to share PDF",
  DOWNLOAD_FAILED: "Failed to download PDF",
  NO_PDF: "PDF not generated yet",
} as const
