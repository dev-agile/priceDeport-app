import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import type { RetailerRoutes } from "@/navigators/retailer/routes"

export type SubscriptionPlansScreenProps = NativeStackScreenProps<
  Record<string, object>,
  typeof RetailerRoutes.SUBSCRIPTIONPLAN
>

export interface SelectedPlan {
  planId: string
  name: string
  amount: number
  interval: string
}
