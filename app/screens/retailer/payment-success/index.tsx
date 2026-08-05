import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import ButtonField from "@/components/common-components/button/button"
// import { spacing } from "@/theme/spacing"

import { usePaymentSuccess } from "./hooks/use-payment-success"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import type { PaymentSuccessScreenProps } from "./lib/types"

export default function PaymentSuccess(props: PaymentSuccessScreenProps) {
  const { handleDone } = usePaymentSuccess()
  const params = props.route?.params
  const price = params?.price ?? 0
  const name = params?.name ?? ""
  const validtill = params?.validtill ?? ""
  const paymentDate = new Date().toLocaleDateString()

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.successIcon}>✓</Text>
      <Text style={styles.title}>{UI_TEXT.SUCCESS_TITLE}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.PLAN_NAME}</Text>
          <Text style={styles.detailValue}>{name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.AMOUNT_PAID}</Text>
          <Text style={styles.detailValue}>${price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.PAYMENT_DATE}</Text>
          <Text style={styles.detailValue}>{paymentDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.VALID_TILL}</Text>
          <Text style={styles.detailValue}>{validtill}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonField value={UI_TEXT.DONE} onPress={handleDone} />
      </View>
    </SafeAreaView>
  )
}
