import { useCallback, useRef, useState } from "react"
import {
  useForm,
  type Control,
  type FieldErrors,
  type Resolver,
  type UseFormHandleSubmit,
  type UseFormReset,
} from "react-hook-form"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import { useRole } from "@/context/RoleContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import {
  resetPasswordSchema,
  resetPasswordCompleteSchema,
} from "@/utils/schema/reset-password-schema"

import type {
  ResetPasswordStep,
  ResetPasswordEmailForm,
  ResetPasswordCompleteForm,
  ResetPasswordScreenProps,
} from "../lib/types"

type ResetPasswordFormValues = ResetPasswordEmailForm & ResetPasswordCompleteForm

export interface UseResetPasswordReturn {
  step: ResetPasswordStep
  email: string
  resetPasswordToken: string | null
  control: Control<ResetPasswordEmailForm & ResetPasswordCompleteForm>
  handleSubmit: UseFormHandleSubmit<ResetPasswordEmailForm & ResetPasswordCompleteForm>
  errors: FieldErrors<ResetPasswordEmailForm & ResetPasswordCompleteForm>
  reset: UseFormReset<ResetPasswordEmailForm & ResetPasswordCompleteForm>
  isRequestPending: boolean
  isVerifyPending: boolean
  isCompletePending: boolean
  onSubmitEmail: (data: ResetPasswordEmailForm) => void
  otp: string[]
  setOtp: React.Dispatch<React.SetStateAction<string[]>>
  otpInputRefs: React.MutableRefObject<any[]>
  handleOtpChange: (value: string, index: number) => void
  onSubmitOtp: () => void
  onSubmitSetPassword: (data: ResetPasswordCompleteForm) => void
  handleNavigateToLogin: () => void
  apiRole: "retailer" | "wholesaler"
  isShowPassword: boolean
  handleTogglePassword: () => void
}

const OTP_LENGTH = 4

export function useResetPassword(
  navigation: ResetPasswordScreenProps["navigation"],
  roleProp?: ResetPasswordScreenProps["role"],
): UseResetPasswordReturn {
  const { userRole } = useRole()
  const roleSource = roleProp ?? userRole
  const apiRole: "retailer" | "wholesaler" =
    roleSource === "wholeSeller" ? "wholesaler" : "retailer"

  const [step, setStep] = useState<ResetPasswordStep>("email")
  const [email, setEmail] = useState("")
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(null)
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [isShowPassword, setIsShowPassword] = useState(true)
  const otpInputRefs = useRef<any[]>([])
  const stepRef = useRef(step)
  stepRef.current = step

  const { mutateAsync: requestAsync, isPending: isRequestPending } =
    authMutationOptions.useResetPasswordRequestMutation()
  const { mutateAsync: verifyAsync, isPending: isVerifyPending } =
    authMutationOptions.useResetPasswordVerifyMutation()
  const { mutateAsync: completeAsync, isPending: isCompletePending } =
    authMutationOptions.useResetPasswordCompleteMutation()

  const resolver: Resolver<ResetPasswordFormValues> = useCallback(async (values) => {
    const schema =
      stepRef.current === "setPassword" ? resetPasswordCompleteSchema : resetPasswordSchema
    try {
      const result = await schema.validate(values, { abortEarly: false })
      return { values: result as ResetPasswordFormValues, errors: {} }
    } catch (err: any) {
      const errors: FieldErrors<ResetPasswordFormValues> = {}
      if (err.inner) {
        for (const e of err.inner) {
          const path = (e.path ?? "root") as keyof ResetPasswordFormValues
          errors[path] = { type: e.type, message: e.message }
        }
      } else if (err.path) {
        errors[err.path as keyof ResetPasswordFormValues] = {
          type: err.type,
          message: err.message,
        }
      }
      return { values: {}, errors }
    }
  }, [])
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ResetPasswordFormValues>({
    resolver,
    defaultValues: { email: "", newPassword: "", confirmPassword: "" },
  })

  const onSubmitEmail = useCallback(
    async (data: ResetPasswordEmailForm) => {
      try {
        await requestAsync({ email: data.email.trim(), role: apiRole })
        Toast.show({
          type: "success",
          text1: "OTP sent to your email/phone",
        })
        setEmail(data.email.trim())
        setStep("otp")
        setOtp(Array(OTP_LENGTH).fill(""))
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ??
          err?.data?.message ??
          "Failed to send OTP. Please try again."
        Toast.show({ type: "error", text1: msg })
      }
    },
    [requestAsync, apiRole],
  )

  const handleOtpChange = useCallback((value: string, index: number) => {
    setOtp((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    if (value !== "") {
      if (index < OTP_LENGTH - 1) {
        otpInputRefs.current[index + 1]?.focus()
      }
    } else if (index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }, [])

  const onSubmitOtp = useCallback(() => {
    const enteredOtp = otp.join("")
    if (enteredOtp.length !== OTP_LENGTH) return
    verifyAsync({ email, otp: enteredOtp })
      .then((data) => {
        const token = data?.data?.resetPasswordToken
        if (token) {
          Toast.show({ type: "success", text1: "Code verified successfully" })
          setResetPasswordToken(token)
          setStep("setPassword")
          setValue("newPassword", "")
          setValue("confirmPassword", "")
        }
      })
      .catch((err: any) => {
        const msg =
          err?.response?.data?.message ??
          err?.data?.message ??
          "Invalid or expired code. Please try again."
        Toast.show({ type: "error", text1: msg })
      })
  }, [email, otp, verifyAsync, setValue])

  const onSubmitSetPassword = useCallback(
    async (data: ResetPasswordCompleteForm) => {
      if (!resetPasswordToken) return
      try {
        await completeAsync({
          password: data.newPassword,
          resetPasswordToken,
        })
        Toast.show({
          type: "success",
          text1: "Password reset successfully. Please login.",
        })
        reset()
        setStep("email")
        setEmail("")
        setResetPasswordToken(null)
        setOtp(Array(OTP_LENGTH).fill(""))
        navigation?.navigate(RetailerRoutes.LOGIN)
      } catch (err) {
        console.error("Reset password complete error:", err)
        reset()
        setStep("email")
        setEmail("")
        setResetPasswordToken(null)
      }
    },
    [completeAsync, resetPasswordToken, navigation, reset],
  )

  const handleNavigateToLogin = useCallback(() => {
    navigation?.navigate(RetailerRoutes.LOGIN)
  }, [navigation])

  const handleTogglePassword = useCallback(() => {
    setIsShowPassword((prev) => !prev)
  }, [])

  return {
    step,
    email,
    resetPasswordToken,
    control,
    handleSubmit,
    errors,
    reset,
    isRequestPending,
    isVerifyPending,
    isCompletePending,
    onSubmitEmail,
    otp,
    setOtp,
    otpInputRefs,
    handleOtpChange,
    onSubmitOtp,
    onSubmitSetPassword,
    handleNavigateToLogin,
    apiRole,
    isShowPassword,
    handleTogglePassword,
  }
}
