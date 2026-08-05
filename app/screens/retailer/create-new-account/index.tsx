import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Controller } from "react-hook-form"
import { SafeAreaView } from "react-native-safe-area-context"

import ButtonField from "@/components/common-components/button/button"
import { InputFieldContianer } from "@/components/common-components/input-field-contianer/input-field-contianer"

import { useCreateNewAccount } from "./hooks/use-create-new-account"
import { UI_TEXT, ERROR_MESSAGES } from "./lib/constants"
import { styles } from "./lib/styles"

function KeyboardAwareScrollViewFallback(props: {
  children?: React.ReactNode
  showsVerticalScrollIndicator?: boolean
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  bottomOffset?: number
  contentContainerStyle?: object
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={props.bottomOffset ?? 20}
      style={fallbackScrollWrapperStyle}
    >
      <ScrollView
        showsVerticalScrollIndicator={props.showsVerticalScrollIndicator ?? false}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps ?? "handled"}
        contentContainerStyle={props.contentContainerStyle}
        style={fallbackScrollWrapperStyle}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const fallbackScrollWrapperStyle = { flex: 1 }

let KeyboardAwareScrollView: typeof KeyboardAwareScrollViewFallback
try {
  const k = require("react-native-keyboard-controller")
  KeyboardAwareScrollView = k?.KeyboardAwareScrollView ?? KeyboardAwareScrollViewFallback
} catch {
  KeyboardAwareScrollView = KeyboardAwareScrollViewFallback
}

export default function CreateNewAccount({ navigation }: any) {
  const [isShowPassword, setIsShowPassword] = useState(true)

  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    agreeToTerms,
    checkboxError,
    isFormValid,
    // selected,
    setSelectedValue,
    onSubmit,
    handleToggleAgreeToTerms,
    // handleSetSelectedValue,
    handleNavigateToLogin,
    dropdownArray,
  } = useCreateNewAccount(navigation)

  const handleTogglePassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
        contentContainerStyle={styles.scrollContent}
      >
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safeAreaView}>
          <Text style={styles.heading}>{UI_TEXT.JOIN_US_HEADING}</Text>
          <Text style={styles.subtitle}>{UI_TEXT.SUBTITLE_TEXT}</Text>
          <View style={styles.textInputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.OWNERS_NAME_TITLE}
                  placeholder={UI_TEXT.OWNERS_NAME_PLACEHOLDER}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="name"
            />
            {errors.name?.message && (
              <Text style={styles.validationError}>{errors.name?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.STORE_NAME_TITLE}
                  placeholder={UI_TEXT.STORE_NAME_PLACEHOLDER}
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="storeName"
            />
            {errors.storeName?.message && (
              <Text style={styles.validationError}>{errors.storeName?.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.EMAIL_TITLE}
                  placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="email"
            />
            {errors.email?.message && (
              <Text style={styles.validationError}>{errors.email?.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.PASSWORD_TITLE}
                  placeholder={UI_TEXT.PASSWORD_PLACEHOLDER}
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                  secureTextEntry={isShowPassword}
                  showIcon={value?.length > 0 ? true : false}
                  onTogglePassword={handleTogglePassword}
                />
              )}
              name="password"
            />
            {errors.password?.message && (
              <Text style={styles.validationError}>{errors.password?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.PHONE_NUMBER_TITLE}
                  placeholder={UI_TEXT.PHONE_NUMBER_PLACEHOLDER}
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="number"
            />
            {errors.number?.message && (
              <Text style={styles.validationError}>{errors.number?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.ADDRESS_TITLE}
                  placeholder={UI_TEXT.ADDRESS_PLACEHOLDER}
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="location"
            />
            {errors.location?.message && (
              <Text style={styles.validationError}>{errors.location?.message}</Text>
            )}

            <View style={styles.cityZipContainer}>
              <View style={styles.cityZipField}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputFieldContianer
                      title={UI_TEXT.CITY_TITLE}
                      placeholder={UI_TEXT.CITY_PLACEHOLDER}
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(text)}
                      value={value}
                    />
                  )}
                  name="city"
                />
                {errors.city && <Text style={styles.validationError}>{errors.city.message}</Text>}
              </View>
              <View style={styles.cityZipField}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputFieldContianer
                      title={UI_TEXT.ZIP_CODE_TITLE}
                      placeholder={UI_TEXT.ZIP_CODE_PLACEHOLDER}
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(text)}
                      value={value}
                    />
                  )}
                  name="zipCode"
                />
                {errors.zipCode && (
                  <Text style={styles.validationError}>{errors.zipCode.message}</Text>
                )}
              </View>
            </View>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.PEER_GROUP_TITLE}
                  placeholder={UI_TEXT.PEER_GROUP_PLACEHOLDER}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                  dropdownData={dropdownArray}
                  setSelectedValue={setSelectedValue}
                  value={value}
                  textContainerStyle={styles.peerGroupTextContainer}
                />
              )}
              name="peerGroup"
            />
            {errors.peerGroup?.message && (
              <Text style={styles.validationError}>{errors.peerGroup?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title={UI_TEXT.STATE_TITLE}
                  placeholder={UI_TEXT.STATE_PLACEHOLDER}
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="state"
            />
            {errors.state?.message && (
              <Text style={styles.validationError}>{errors.state?.message}</Text>
            )}
          </View>

          <View style={styles.checkboxContainerWrapper}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleToggleAgreeToTerms}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  agreeToTerms && styles.checkboxChecked,
                  checkboxError && styles.checkboxError,
                ]}
              >
                {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.checkboxTextContainer}>
                <Text style={styles.checkboxText}>{UI_TEXT.CHECKBOX_TEXT}</Text>
              </View>
            </TouchableOpacity>
            {checkboxError ? (
              <Text style={styles.checkboxErrorMessage}>{checkboxError}</Text>
            ) : null}

            <ButtonField
              value={UI_TEXT.CREATE_ACCOUNT_BUTTON}
              isDisabled={isLoading || !agreeToTerms || !isFormValid}
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />

            {!isLoading && (!isFormValid || !agreeToTerms) && (
              <Text style={styles.helperMessage}>
                {!isFormValid ? ERROR_MESSAGES.FILL_ALL_FIELDS : ERROR_MESSAGES.AGREE_TO_TERMS}
              </Text>
            )}
            <View style={styles.helperTextContainer}>
              <Text style={styles.helpertext1}>{UI_TEXT.ALREADY_HAVE_ACCOUNT}</Text>
              <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.helperText2}>{UI_TEXT.LOGIN_NOW}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  )
}
