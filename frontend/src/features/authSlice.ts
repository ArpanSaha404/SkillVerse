import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authInputState {
  fullName: string;
  email: string;
}

interface authState extends authInputState {
  isLoggedIn: boolean;
}

const initialState: authState = {
  fullName: "",
  email: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<authInputState>) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.isLoggedIn = false;
    },
    login: (state, action: PayloadAction<authInputState>) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.fullName = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;
export default authReducer;
