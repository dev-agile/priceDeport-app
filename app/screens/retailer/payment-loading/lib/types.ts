export interface PaymentLoadingRouteParams {
  sessionId: string
  id: string // userId/retailerId
  price: number
  name: string
  validtill: string
}

export interface PaymentLoadingScreenProps {
  route?: {
    params?: PaymentLoadingRouteParams
  }
  navigation?: any
}
