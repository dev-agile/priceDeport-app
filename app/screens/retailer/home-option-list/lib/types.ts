import type { WhoAmIResponse } from "@/api/retailer/auth/types"

export interface UseHomeOptionListReturn {
  showPopup: boolean
  setShowPopup: (value: boolean) => void
  navigateHome: (pathToNavigate: string) => void
  madrCheckerLink: () => Promise<void>
  buttons: string[]
  data: WhoAmIResponse | undefined
  isSuccess: boolean
}
