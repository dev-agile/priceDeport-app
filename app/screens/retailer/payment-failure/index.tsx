import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import ButtonField from "@/components/common-components/button/button"

import { usePaymentFailure } from "./hooks/use-payment-failure"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import type { PaymentFailureScreenProps } from "./lib/types"

export default function PaymentFailure(props: PaymentFailureScreenProps) {
  const { handleGoBack } = usePaymentFailure()
  const params = props.route?.params
  const price = params?.price ?? 0
  const name = params?.name ?? ""
  const validtill = params?.validtill ?? ""

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.failureIcon}>✗</Text>
      <Text style={styles.title}>{UI_TEXT.FAILURE_TITLE}</Text>
      <Text style={styles.message}>{UI_TEXT.FAILURE_MESSAGE}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.PLAN_NAME}</Text>
          <Text style={styles.detailValue}>{name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.AMOUNT}</Text>
          <Text style={styles.detailValue}>${price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{UI_TEXT.VALID_TILL}</Text>
          <Text style={styles.detailValue}>{validtill}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonField value={UI_TEXT.GO_BACK} onPress={handleGoBack} />
      </View>
    </SafeAreaView>
  )
}
