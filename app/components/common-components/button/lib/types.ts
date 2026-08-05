import { ReactNode } from "react"

export interface ButtonFieldProps {
  value: string
  screen?: string
  onPress?: () => void
  isDisabled?: boolean
  btnDisable?: boolean
  handleNewPasswordScreen?: () => void
  isLoading?: boolean
  icon?: ReactNode
  textAlign?: "center" | "left"
  variant?: "default" | "active" | "disabled"
}
