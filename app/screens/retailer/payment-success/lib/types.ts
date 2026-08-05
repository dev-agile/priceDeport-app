export interface PaymentSuccessScreenProps {
  route?: {
    params?: {
      price: number
      name: string
      validtill: string
    }
  }
  navigation?: any
}
