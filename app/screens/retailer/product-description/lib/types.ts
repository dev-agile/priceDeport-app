import type { RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import type { CartItem } from "@/api/retailer/order"
import type { productTypes } from "@/api/retailer/product"

export type ProductDescriptionScreenRouteProp = RouteProp<
  {
    params: {
      singleProductId?: string
      productDetails?: {
        product_id: string
        [key: string]: any
      }
    }
  },
  "params"
>

export type ProductDescriptionScreenNavigationProp = NativeStackNavigationProp<any>

export interface UseProductDescriptionReturn {
  productData: productTypes.ProductDetailsData | null
  wholesalerData: productTypes.WholesalerData[]
  adminPrice: productTypes.AdminPrice | null
  isFavorite: boolean
  isLoading: boolean
  isError: boolean
  error: any
  cartItems: CartItem[]
  peerGroup: string | null
  selectedPeerGroup: string | null
  isSubscribed: boolean
  showQuantityModal: boolean
  showSortModal: boolean
  showPeerGroupModal: boolean
  selectedWholesaler: productTypes.WholesalerData | null
  quantityInput: string
  sortOption: string | null
  handleToggleFavorite: () => void
  handleAddToCart: (wholesaler: productTypes.WholesalerData) => void
  handleIncrement: (wholesaler: productTypes.WholesalerData) => void
  handleDecrement: (wholesaler: productTypes.WholesalerData) => void
  handleQuantityChange: (value: string) => void
  handleQuantitySubmit: (overrideQuantity?: number) => Promise<void>
  handleSortSelect: (sortId: string) => void
  handlePeerGroupSelect: (peerGroup: string) => void
  handleNavigateToPriceHistory: () => void
  handleNavigateToSalesGraph: (wholesaler: productTypes.WholesalerData) => void
  setShowQuantityModal: (show: boolean) => void
  setShowSortModal: (show: boolean) => void
  setShowPeerGroupModal: (show: boolean) => void
  setQuantityInput: (value: string) => void
  setSelectedWholesaler: (wholesaler: productTypes.WholesalerData | null) => void
}
