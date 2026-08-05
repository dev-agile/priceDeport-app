import { View, Text, ScrollView } from "react-native"
import { Controller } from "react-hook-form"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

import { HeaderComponent } from "@/components/common-components"
import ButtonField from "@/components/common-components/button/button"
import { InputFieldContianer } from "@/components/common-components/input-field-contianer/input-field-contianer"

import { useRetailerLogin } from "./hooks/use-retailer-login"
import { FORM_FIELDS, UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function Login({ navigation }: any) {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    isShowPassword,
    handleTogglePassword,
    onSubmit,
    handleNavigateToResetPassword,
    handleNavigateToCreateAccount,
    handleBackToOption,
    showModal,
    setShowModal,
  } = useRetailerLogin(navigation)

  console.log("showModal", showModal)
  return (
    <View style={styles.mainContainer}>
      <HeaderComponent value="Login" backTo={handleBackToOption} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text style={styles.welcomeHeading}>{UI_TEXT.WELCOME_HEADING}</Text>
            <Text style={styles.subtitleText}>{UI_TEXT.SUBTITLE_TEXT}</Text>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFieldContianer
                    title={UI_TEXT.EMAIL_FIELD_TITLE}
                    placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
                    textContainerStyle={styles.textInputMargin}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text?.trimEnd())
                    }}
                  />
                )}
                name={FORM_FIELDS.EMAIL}
              />
              {errors.email?.message && (
                <Text style={styles.validationError}>{errors.email?.message}</Text>
              )}

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFieldContianer
                    title={UI_TEXT.PASSWORD_FIELD_TITLE}
                    placeholder={UI_TEXT.PASSWORD_PLACEHOLDER}
                    showIcon={value?.length > 0 ? true : false}
                    secureTextEntry={isShowPassword}
                    onTogglePassword={handleTogglePassword}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text?.trimEnd())
                    }}
                    textContainerStyle={styles.textInputMargin}
                  />
                )}
                name={FORM_FIELDS.PASSWORD}
              />
              {errors.password?.message && (
                <Text style={styles.validationError}>{errors.password?.message}</Text>
              )}
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() =>
                  setShowModal({
                    resetPassword: true,
                    otpValidation: false,
                    resetCredentials: false,
                  })
                }
              >
                <TouchableOpacity onPress={handleNavigateToResetPassword}>
                  <Text style={styles.textColor}>{UI_TEXT.FORGOT_PASSWORD_TEXT}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>

          <ButtonField
            value={UI_TEXT.LOGIN_BUTTON_TEXT}
            onPress={handleSubmit(onSubmit)}
            isDisabled={isLoading}
          />

          <View style={styles.helperTextContainer}>
            <Text style={styles.helpertext1}>{UI_TEXT.NO_ACCOUNT_TEXT}</Text>
            <TouchableOpacity onPress={handleNavigateToCreateAccount}>
              <Text style={styles.helperText2}>{UI_TEXT.CREATE_ACCOUNT_TEXT}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleBackToOption}>
              <Text style={styles.backToOptionScreen}>{UI_TEXT.BACK_TO_OPTION_TEXT}</Text>
            </TouchableOpacity> */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
