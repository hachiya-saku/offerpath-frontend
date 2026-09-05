import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, LoginResponse } from "@/types/auth";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;
    }
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
