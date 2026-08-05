import type { RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import type { productTypes } from "@/api/retailer/product"

export interface SalesGraphInfo {
  wholesaler: productTypes.WholesalerData
  productName: string
  productId: string
  img_url?: string
}

export type SalesGraphScreenRouteProp = RouteProp<
  {
    params: {
      salesGraphInfo?: SalesGraphInfo
    }
  },
  "params"
>

export type SalesGraphScreenNavigationProp = NativeStackNavigationProp<any>

export interface ChartDataPoint {
  date: string
  price: number
  formattedDate: string
}

export interface UseSalesGraphReturn {
  productName: string
  productImage: any
  currentPrice: number
  chartData: ChartDataPoint[]
  isLoading: boolean
  isError: boolean
  error: any
}
