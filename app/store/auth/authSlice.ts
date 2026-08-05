import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RoleType } from "@/utils/role"

interface AuthState {
  userRole: {
    data: RoleType | null
  }
}

const initialState: AuthState = {
  userRole: {
    data: null,
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserRole: (state, action: PayloadAction<RoleType>) => {
      state.userRole.data = action.payload
    },
  },
})

export const { updateUserRole } = authSlice.actions
export const authReducer = authSlice.reducer

// Action creator for use in components
export const updateUserRoleAction = (role: RoleType) => updateUserRole(role)
