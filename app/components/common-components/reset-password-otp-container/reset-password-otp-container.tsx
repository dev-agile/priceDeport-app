// import { useEffect, useRef, useState } from "react"
// import { SafeAreaView, Text, TextInput, View } from "react-native"
// import { skipToken } from "@reduxjs/toolkit/dist/query"
// import { Toast } from "react-native-toast-message/lib/src/Toast"

// import { usePostResetPasswordVerifyQuery } from "@/api/retailer/authApiSlice/api"
// import ButtonField from "@/components/CommonComponents/button/button"
// import { useAppDispatch } from "@/redux/store"
// import { updateResetPasswordTokenAction } from "@/redux/wholeSeller/reduxSlice/auth/authSlice"

// import {
// BUTTON_VALUE,
// CONSOLE_ERROR_MESSAGE,
// DEFAULT_EMAIL_EXAMPLE,
// HELPER_TEXT1,
// OTP_LENGTH,
// OTP_MAX_LENGTH,
// } from "./lib/constants"
// import { styles } from "./lib/styles"
import type { ResetPasswordOTPScreenProps } from "./lib/types"

export const ResetPasswordOTPScreen: React.FC<ResetPasswordOTPScreenProps> = (
  {
    // prepareProps,
    // setIsShowSetNewPasswordScreen,
    // setIsShowResetOtpContainer,
  },
) => {
  // const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  // const inputRefs = useRef(Array(OTP_LENGTH).fill(null))
  // const [otpContainer, setOtpContainer] = useState<IsOtpVerification>()
  // const {
  //   data: passwordVerifyData,
  //   isLoading: passwordVerifyIsLoading,
  //   isError: passwordVerifyIsError,
  //   error: passwordVerifyError,
  //   isSuccess: passwordVerifyIsSuccess,
  // } = usePostResetPasswordVerifyQuery(
  //   prepareProps.email && prepareProps.role && otpContainer ? otpContainer : skipToken,
  // )
  // const dispatch = useAppDispatch()
  // const handleOtpChange = (value: string, index: number) => {
  //   const updatedOtp = [...otp]
  //   updatedOtp[index] = value
  //   setOtp(updatedOtp)
  //   if (value !== "") {
  //     if (index < 3) {
  //       inputRefs.current[index + 1].focus()
  //     } else if (index === 3) {
  //       inputRefs.current[index].focus()
  //     }
  //   } else {
  //     if (index > 0) {
  //       inputRefs.current[index - 1].focus()
  //     }
  //   }
  // }
  // const handleResetPassword = () => {
  //   const enteredOtp = otp.join("")
  //   setOtpContainer({ email: prepareProps?.email, otp: enteredOtp })
  // }
  // useEffect(() => {
  //   if (passwordVerifyIsSuccess) {
  //     Toast.show({
  //       type: "success",
  //       text1: passwordVerifyData?.message.toUpperCase(),
  //     })
  //     const Token = passwordVerifyData?.data?.resetPasswordToken
  //     dispatch(updateResetPasswordTokenAction(Token))
  //     setIsShowResetOtpContainer(false)
  //     setIsShowSetNewPasswordScreen(true)
  //   } else if (passwordVerifyIsError) {
  //     Toast.show({
  //       type: "error",
  //       text1: passwordVerifyError?.data?.message.toUpperCase(),
  //     })
  //     console.log(CONSOLE_ERROR_MESSAGE, passwordVerifyError)
  //   }
  // }, [passwordVerifyIsSuccess, passwordVerifyIsError, passwordVerifyData])

  return (
    // <SafeAreaView style={styles.safeAreaView}>
    //   <View style={styles.subContainer}>
    //     <View>
    //       <Text style={styles.helpertext1}>{HELPER_TEXT1}</Text>
    //       <Text style={styles.helperText2}> {prepareProps?.email || DEFAULT_EMAIL_EXAMPLE}.</Text>
    //     </View>
    //     <View style={styles.otpContainer}>
    //       {otp.map((value, index) => (
    //         <TextInput
    //           key={index}
    //           style={styles.otpBox}
    //           onChangeText={(text) => handleOtpChange(text, index)}
    //           value={value}
    //           maxLength={OTP_MAX_LENGTH}
    //           keyboardType="numeric"
    //           autoFocus={index === 0}
    //           ref={(input) => (inputRefs.current[index] = input)}
    //         />
    //       ))}
    //     </View>
    //   </View>
    //   <ButtonField
    //     value={BUTTON_VALUE}
    //     onPress={handleResetPassword}
    //     isDisabled={passwordVerifyIsLoading}
    //   />
    // </SafeAreaView>
    <></>
  )
}
