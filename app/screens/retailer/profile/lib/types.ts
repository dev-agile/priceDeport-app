import type { RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type ProfileScreenNavigationProp = NativeStackNavigationProp<any>
export type ProfileScreenRouteProp = RouteProp<any>

export interface UseProfileReturn {
  profileData: {
    name: string
    email: string
    storeName: string
    location: string
    city: string
    zipCode: string
    number: string
    peerGroup: string
  } | null
  isLoading: boolean
  isError: boolean
  error: any
  showDeleteModal: boolean
  isDeleting: boolean
  handleLogout: () => Promise<void>
  handleDeleteAccount: () => void
  handleConfirmDelete: () => Promise<void>
  handleCancelDelete: () => void
}

export interface ProfileFieldProps {
  label: string
  value?: string
  isEditing?: boolean
  editable?: boolean
  onChangeText?: (text: string) => void
  placeholder?: string
}
