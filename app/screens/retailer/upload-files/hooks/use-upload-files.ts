import { useCallback, useEffect, useRef, useState } from "react"
import { Linking } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { useNavigation } from "@react-navigation/native"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { productQueryOptions } from "@/api/retailer/product"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadNormalizedPeerGroup } from "@/utils/peer-group"

import { MADRFILEURL, UI_TEXT } from "../lib/constants"

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

type SelectedFile = {
  group: string
  name: string
  uri: string
  mimeType: string
}

export function useUploadFiles() {
  const navigation = useNavigation<any>()
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId ?? ""
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null)
  const [banner, setBanner] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  })

  const userPeerGroup = loadNormalizedPeerGroup()
  const allowedPeerGroups = userPeerGroup ? [userPeerGroup] : []

  useEffect(() => {
    // Auto-select assigned peer group; users can upload only for their own group.
    setSelectedPeerGroup(userPeerGroup || null)
    setSelectedFile((prev) => (prev?.group === userPeerGroup ? prev : null))
  }, [userPeerGroup])

  const { mutateAsync: uploadFileAsync, isPending: isUploading } =
    productQueryOptions.useUploadRetailerFileMutation()

  const dismissBanner = useCallback(() => {
    if (bannerTimeoutRef.current) {
      clearTimeout(bannerTimeoutRef.current)
      bannerTimeoutRef.current = null
    }
    setBanner((b) => (b.visible ? { ...b, visible: false } : b))
  }, [])

  const openMADRLink = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(MADRFILEURL)
      if (canOpen) {
        await Linking.openURL(MADRFILEURL)
      } else {
        Toast.show({
          type: "error",
          text1: UI_TEXT.INVALID_URL_TOAST(MADRFILEURL),
        })
      }
    } catch {
      Toast.show({
        type: "error",
        text1: UI_TEXT.INVALID_URL_TOAST(MADRFILEURL),
      })
    }
  }, [])

  const selectPeerGroup = useCallback(
    (group: string) => {
      if (group !== userPeerGroup) return
      setSelectedPeerGroup((prev) => {
        if (prev && prev !== group) {
          setSelectedFile(null)
        }
        return group
      })
    },
    [userPeerGroup],
  )

  const removeFileForGroup = useCallback((peerGroup: string) => {
    setSelectedFile((prev) => (prev?.group === peerGroup ? null : prev))
    Toast.show({
      type: "success",
      text1: UI_TEXT.FILE_REMOVED,
      position: "top",
      topOffset: 110,
    })
  }, [])

  const handlePickDocumentForGroup = useCallback(async () => {
    if (!selectedPeerGroup) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.SELECT_PEER_TOAST,
      })
      return
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      })
      if (result.canceled) return

      const file = result.assets[0]
      const fileName = file.name ?? "document.pdf"
      const mimeType = file.mimeType ?? ""
      const size = file.size ?? 0
      const isPdf = mimeType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf")

      if (!isPdf) {
        Toast.show({
          type: "error",
          text1: UI_TEXT.INVALID_FILE_TYPE,
        })
        return
      }

      if (size > MAX_FILE_SIZE_BYTES) {
        Toast.show({
          type: "error",
          text1: UI_TEXT.FILE_TOO_LARGE,
        })
        return
      }

      setSelectedFile({
        group: selectedPeerGroup,
        name: fileName,
        uri: file.uri,
        mimeType: mimeType || "application/pdf",
      })
    } catch (err: any) {
      const msg = err?.message ?? "Unable to pick file. Please try again."
      Toast.show({
        type: "error",
        text1: (msg as string).toUpperCase(),
      })
    }
  }, [selectedPeerGroup])

  const handleUploadFile = useCallback(async () => {
    if (!selectedPeerGroup) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.SELECT_PEER_TOAST,
      })
      return
    }
    if (!selectedFile || selectedFile.group !== selectedPeerGroup) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.SELECT_FILE_TOAST,
      })
      return
    }
    if (!retailerId) {
      return
    }

    try {
      const formData = new FormData()
      formData.append("retailerId", retailerId)
      formData.append("peer_group", selectedPeerGroup)
      formData.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.mimeType,
      } as any)
      await uploadFileAsync({
        formData,
        retailerId,
        peer_group: selectedPeerGroup,
      })
      Toast.show({
        type: "success",
        text1: "FILE UPLOADED SUCCESSFULLY",
        position: "top",
        topOffset: 110,
      })
      setSelectedFile(null)
      navigation.navigate(RetailerRoutes.SEARCH)
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.data?.message ??
        (err?.message === "Network Error"
          ? "Upload failed due to network connection. Please verify API URL/tunnel and try again."
          : "Upload failed. Please try again.")
      Toast.show({
        type: "error",
        text1: (msg as string).toUpperCase(),
      })
    }
  }, [selectedPeerGroup, selectedFile, retailerId, uploadFileAsync, navigation])

  const hasValidSelectedFile = !!selectedPeerGroup && selectedFile?.group === selectedPeerGroup

  return {
    userPeerGroup,
    selectedPeerGroup,
    selectedFile,
    hasValidSelectedFile,
    banner,
    dismissBanner,
    openMADRLink,
    selectPeerGroup,
    handlePickDocumentForGroup,
    handleUploadFile,
    removeFileForGroup,
    peerGroups: allowedPeerGroups,
    isUploading,
  }
}
