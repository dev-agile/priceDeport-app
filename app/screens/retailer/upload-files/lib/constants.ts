export const MADRFILEURL = "https://wicvendor.wic.ca.gov"

export const UI_TEXT = {
  STEP_DOWNLOAD: "Download up to date MADR file",
  STEP_SELECT_PEER: "Select Peer Group",
  PEER_GROUP_LABEL: (group: string) => `Peer Group ${group}`,
  UPLOAD: "Upload",
  UPLOADED: "Uploaded",
  UPLOAD_PDF_FILE: "Upload PDF File",
  UPLOADING: "Uploading...",
  SELECT_PEER_TOAST: "Please Select Peer group before uploading file",
  SELECT_FILE_TOAST: "Please select a PDF file before uploading",
  INVALID_URL_TOAST: (url: string) => `Invalid URL: ${url}`,
  FILE_UPLOADED_FOR: (peerGroup: string) => `File uploaded for Peer Group ${peerGroup}`,
  FILE_REMOVED: "File removed",
  FILE_TOO_LARGE: "File size exceeds 10MB",
  INVALID_FILE_TYPE: "Only PDF files are accepted",
  FILE_TYPE_INFO: "Only PDF files are accepted. Maximum file size is 10MB.",
  TITLE: "Upload MADR Peer Group Files",
  SUBTITLE: "Select a peer group and upload the corresponding PDF file",
  ASSIGNED_PEER_GROUP: "Assigned Peer Group",
  NO_PEER_GROUP_ASSIGNED: "No PL Group assigned",
} as const
