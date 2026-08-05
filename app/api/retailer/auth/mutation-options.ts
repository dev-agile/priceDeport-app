import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import {
  postLoginData,
  postOtpVerify,
  postRegisterData,
  postResetPasswordRequest,
  postResetPasswordVerify,
  patchResetPasswordComplete,
} from "./api"
import type {
  LoginApiResponse,
  LoginErrorResponse,
  LoginRequest,
  OTPVerifyErrorResponse,
  OTPVerifyRequest,
  OTPVerifyResponse,
  RegisterErrorResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequestPayload,
  ResetPasswordRequestResponse,
  ResetPasswordVerifyPayload,
  ResetPasswordVerifyResponse,
  ResetPasswordCompletePayload,
  ResetPasswordCompleteResponse,
} from "./types"

export function useLoginMutation(
  options?: UseMutationOptions<{ data: LoginApiResponse }, LoginErrorResponse, LoginRequest>,
) {
  const mutation = useMutation<{ data: LoginApiResponse }, LoginErrorResponse, LoginRequest>({
    mutationFn: async (request: LoginRequest) => {
      const response = await postLoginData(request)
      return { data: response.data }
    },
    ...options,
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}

export function useRegisterMutation(
  options?: UseMutationOptions<RegisterResponse, RegisterErrorResponse, RegisterRequest>,
) {
  const mutation = useMutation<RegisterResponse, RegisterErrorResponse, RegisterRequest>({
    mutationFn: async (request: RegisterRequest) => {
      const response = await postRegisterData(request)
      return response.data
    },
    ...options,
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}

export function useOtpVerifyMutation(
  options?: UseMutationOptions<OTPVerifyResponse, OTPVerifyErrorResponse, OTPVerifyRequest>,
) {
  const mutation = useMutation<OTPVerifyResponse, OTPVerifyErrorResponse, OTPVerifyRequest>({
    mutationFn: async (request: OTPVerifyRequest) => {
      const response = await postOtpVerify(request)
      return response.data
    },
    ...options,
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}

export function useResetPasswordRequestMutation() {
  const mutation = useMutation<
    { data: ResetPasswordRequestResponse },
    { response?: { data?: { message?: string } }; data?: { message?: string } },
    ResetPasswordRequestPayload
  >({
    mutationFn: async (payload) => {
      const response = await postResetPasswordRequest(payload)
      return { data: response.data }
    },
  })
  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}

export function useResetPasswordVerifyMutation() {
  const mutation = useMutation<
    ResetPasswordVerifyResponse,
    { response?: { data?: { message?: string } }; data?: { message?: string } },
    ResetPasswordVerifyPayload
  >({
    mutationFn: async (payload) => {
      const response = await postResetPasswordVerify(payload)
      return response.data
    },
  })
  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}

export function useResetPasswordCompleteMutation() {
  const mutation = useMutation<
    ResetPasswordCompleteResponse,
    unknown,
    ResetPasswordCompletePayload
  >({
    mutationFn: async (payload) => {
      const response = await patchResetPasswordComplete(payload)
      return response.data
    },
  })
  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
