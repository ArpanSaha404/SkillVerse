import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authNotVerifiedState {
  email: string;
}

interface authInputState extends authNotVerifiedState {
  fullName: string;
  pic: string;
  userType: string;
  isAdmin: boolean;
  isVerified: boolean;
}

interface authState extends authInputState {
  isLoggedIn: boolean;
}

const initialState: authState = {
  fullName: "",
  email: "",
  pic: "",
  userType: "Student",
  isAdmin: false,
  isVerified: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<authNotVerifiedState>) => {
      state.email = action.payload.email;
      state.isLoggedIn = false;
    },
    login: (state, action: PayloadAction<authInputState>) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.pic = action.payload.pic;
      state.userType = action.payload.userType;
      state.isAdmin = action.payload.isAdmin;
      state.isVerified = action.payload.isVerified;
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

export const { signup, login, logout } = authSlice.actions;
export default authReducer;
