import type { CartItem } from "@/api/retailer/order"

export interface UseOrderReturn {
  cartData: CartItem[] | undefined
  isLoading: boolean
  isError: boolean
  error: any
  peerGroup: string | null
  showQuantityModal: boolean
  selectedItem: CartItem | null
  quantityInput: string
  setShowQuantityModal: (show: boolean) => void
  setSelectedItem: (item: CartItem | null) => void
  setQuantityInput: (value: string) => void
  handleIncrement: (item: CartItem) => void
  handleDecrement: (item: CartItem) => void
  handleQuantityPress: (item: CartItem) => void
  handleQuantitySubmit: () => void
  handleRemoveItem: (item: CartItem) => void
  handlePlaceOrder: () => void
  refetchCart: () => void
}

export interface QuantityModalProps {
  visible: boolean
  item: CartItem | null
  quantity: string
  onQuantityChange: (value: string) => void
  onSubmit: () => void
  onClose: () => void
  isLoading: boolean
}
