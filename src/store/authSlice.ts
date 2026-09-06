import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, LoginResponse } from "@/types/auth";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  isInitialized: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isInitialized = true;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isInitialized = true;
    },
    updateCurrentUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
