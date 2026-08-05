import type { MutableRefObject } from "react"
import type { TextInput } from "react-native"
import type { NavigationProp, RouteProp } from "@react-navigation/native"

import type { RetailerRoutes } from "@/navigators/retailer/routes"

export type RootStackParamList = {
  EmailVerification: undefined
  [RetailerRoutes.TAB_CONTAINER]: undefined
}

export type EmailVerificationScreenRouteProp = RouteProp<RootStackParamList, "EmailVerification">
export type EmailVerificationScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "EmailVerification"
>

export interface EmailVerificationProps {
  route?: EmailVerificationScreenRouteProp
  navigation: EmailVerificationScreenNavigationProp
}

export interface UseEmailVerificationReturn {
  // State
  otp: string[]
  inputRefs: MutableRefObject<(TextInput | null)[]>
  email: string
  isLoading: boolean

  // Handlers
  handleOtpChange: (value: string, index: number) => void
  handleOtpSubmit: () => Promise<void>
}
