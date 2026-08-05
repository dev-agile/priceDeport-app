import { View, Text, TextInput } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

import ButtonField from "@/components/common-components/button/button"

import { useEmailVerification } from "./hooks/use-email-verification"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function EmailVerification({ navigation }: any) {
  const { otp, inputRefs, email, isLoading, handleOtpChange, handleOtpSubmit } =
    useEmailVerification(navigation)

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.helpertext1}>{UI_TEXT.HELPER_TEXT} </Text>
            <Text style={styles.helperText2}>
              {email ? email : UI_TEXT.DEFAULT_EMAIL_PLACEHOLDER}
            </Text>
          </View>
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                onChangeText={(text) => handleOtpChange(text, index)}
                value={value}
                maxLength={1}
                keyboardType="numeric"
                autoFocus={index === 0}
                editable={!isLoading}
                ref={(input) => {
                  inputRefs.current[index] = input
                }}
              />
            ))}
          </View>
        </View>
        <ButtonField
          value={UI_TEXT.SUBMIT_BUTTON}
          isDisabled={isLoading}
          onPress={handleOtpSubmit}
        />
      </SafeAreaView>
    </ScrollView>
  )
}
