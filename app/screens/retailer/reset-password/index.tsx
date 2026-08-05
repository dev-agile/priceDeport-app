import { View, Text, ScrollView, TextInput, Image } from "react-native"
import { Controller } from "react-hook-form"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

import { Icon } from "@assets/icons/wholeSeller"

import { HeaderComponent } from "@/components/common-components"
import ButtonField from "@/components/common-components/button/button"
import { InputFieldContianer } from "@/components/common-components/input-field-contianer/input-field-contianer"

import { useResetPassword } from "./hooks/use-reset-password"
import { FORM_FIELDS, UI_TEXT, OTP_LENGTH, OTP_MAX_LENGTH } from "./lib/constants"
import { styles } from "./lib/styles"
import type { ResetPasswordScreenProps } from "./lib/types"

export default function ResetPassword({ role, navigation }: ResetPasswordScreenProps) {
  const {
    step,
    email,
    control,
    handleSubmit,
    errors,
    isRequestPending,
    isVerifyPending,
    isCompletePending,
    onSubmitEmail,
    otp,
    otpInputRefs,
    handleOtpChange,
    onSubmitOtp,
    onSubmitSetPassword,
    handleNavigateToLogin,
    isShowPassword,
    handleTogglePassword,
  } = useResetPassword(navigation, role)

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent value="Reset Password" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            {step === "email" && (
              <>
                <View style={styles.containerIconCircle}>
                  <Image source={Icon.EMAIL} style={styles.icon} />
                </View>
                <Text style={styles.stepTitle}>{UI_TEXT.STEP_EMAIL_TITLE}</Text>
                <Text style={styles.stepSubtitle}>{UI_TEXT.STEP_EMAIL_SUBTITLE}</Text>
                <View style={styles.containerInput}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.EMAIL_FIELD_TITLE}
                        placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
                        textContainerStyle={styles.textInputMargin}
                        value={value}
                        onChangeText={(text) => onChange(text?.trimEnd())}
                      />
                    )}
                    name={FORM_FIELDS.EMAIL}
                  />
                  {errors.email?.message && (
                    <Text style={styles.validationError}>{errors.email?.message}</Text>
                  )}
                </View>
                <ButtonField
                  value={UI_TEXT.REQUEST_BUTTON}
                  onPress={handleSubmit(onSubmitEmail)}
                  isDisabled={isRequestPending}
                  isLoading={isRequestPending}
                />
              </>
            )}

            {step === "otp" && (
              <>
                <View style={styles.containerIconCircle}>
                  <Image source={Icon.VERIFIED_EMAIL} style={styles.icon} />
                </View>
                <Text style={styles.stepTitle}>{UI_TEXT.STEP_OTP_TITLE}</Text>
                <Text style={styles.stepSubtitle}>{UI_TEXT.STEP_OTP_SUBTITLE}</Text>
                <Text style={styles.otpSubtitleEmail}>{email}</Text>
                <View style={styles.otpContainer}>
                  {otp.map((value, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpBox}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      value={value}
                      maxLength={OTP_MAX_LENGTH}
                      keyboardType="numeric"
                      autoFocus={index === 0}
                      ref={(input) => {
                        otpInputRefs.current[index] = input
                      }}
                    />
                  ))}
                </View>
                <ButtonField
                  value={UI_TEXT.OTP_BUTTON}
                  onPress={onSubmitOtp}
                  isDisabled={isVerifyPending || otp.join("").length !== OTP_LENGTH}
                  isLoading={isVerifyPending}
                />
              </>
            )}

            {step === "setPassword" && (
              <>
                <View style={styles.containerIconCircle}>
                  <Image source={Icon.RESET_PASSWORD} style={styles.icon} />
                </View>
                <Text style={styles.stepTitle}>{UI_TEXT.STEP_PASSWORD_TITLE}</Text>
                <Text style={styles.stepSubtitle}>{UI_TEXT.STEP_PASSWORD_SUBTITLE}</Text>
                <View style={styles.containerInput}>
                  <View style={styles.passwordFieldSpacing}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <InputFieldContianer
                          title={UI_TEXT.NEW_PASSWORD_TITLE}
                          placeholder={UI_TEXT.NEW_PASSWORD_PLACEHOLDER}
                          textContainerStyle={styles.textInputMargin}
                          secureTextEntry={isShowPassword}
                          showIcon={value?.length > 0}
                          onTogglePassword={handleTogglePassword}
                          value={value}
                          onChangeText={(text) => onChange(text?.trimEnd())}
                        />
                      )}
                      name={FORM_FIELDS.NEW_PASSWORD}
                    />
                    {errors.newPassword?.message && (
                      <Text style={styles.validationError}>{errors.newPassword?.message}</Text>
                    )}
                  </View>
                  <View style={styles.passwordFieldSpacing}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <InputFieldContianer
                          title={UI_TEXT.CONFIRM_PASSWORD_TITLE}
                          placeholder={UI_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
                          textContainerStyle={styles.textInputMargin}
                          secureTextEntry={isShowPassword}
                          showIcon={value?.length > 0}
                          onTogglePassword={handleTogglePassword}
                          value={value}
                          onChangeText={(text) => onChange(text?.trimEnd())}
                        />
                      )}
                      name={FORM_FIELDS.CONFIRM_PASSWORD}
                    />
                    {errors.confirmPassword?.message && (
                      <Text style={styles.validationError}>{errors.confirmPassword?.message}</Text>
                    )}
                  </View>
                </View>
                <ButtonField
                  value={UI_TEXT.COMPLETE_BUTTON}
                  onPress={handleSubmit(onSubmitSetPassword)}
                  isDisabled={isCompletePending}
                  isLoading={isCompletePending}
                />
              </>
            )}

            <View style={styles.helperTextContainer}>
              <Text style={styles.helpertext1}>{UI_TEXT.ALREADY_HAVE_ACCOUNT}</Text>
              <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.helperText2}>{UI_TEXT.LOGIN_LINK}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
