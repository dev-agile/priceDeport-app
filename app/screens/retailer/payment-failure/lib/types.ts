export interface PaymentFailureScreenProps {
  route?: {
    params?: {
      price: number
      name: string
      validtill: string
    }
  }
  navigation?: any
}
