import { useCallback } from "react"

import { useRole } from "@/context/RoleContext"
import { RoleType } from "@/utils/role"

export interface UseOptionScreenReturn {
  handleOptionPress: (selectedValue: string) => void
}

export const useOptionScreen = (): UseOptionScreenReturn => {
  const { setUserRole } = useRole()

  const handleOptionPress = useCallback(
    (selectedValue: string) => {
      setUserRole(selectedValue as RoleType)
      // Navigation to appropriate stack will be handled by parent navigation logic based on RoleContext state
    },
    [setUserRole],
  )

  return {
    handleOptionPress,
  }
}
