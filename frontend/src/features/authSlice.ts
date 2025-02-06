import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authNotVerifiedState {
  email: string;
}

interface authInputState extends authNotVerifiedState {
  _id: string;
  fullName: string;
  pic: string;
  userType: string;
  isVerified: boolean;
  isAdmin: boolean;
  coursesBought: string[];
  coursesCreated: string[];
}

interface authState extends authInputState {
  isLoggedIn: boolean;
}

const initialState: authState = {
  _id: "",
  fullName: "",
  email: "",
  pic: "",
  userType: "Student",
  isVerified: false,
  isAdmin: false,
  coursesBought: [],
  coursesCreated: [],
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
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.pic = action.payload.pic;
      state.userType = action.payload.userType;
      state.isVerified = action.payload.isVerified;
      state.isAdmin = action.payload.isAdmin;
      state.coursesBought = action.payload.coursesBought;
      state.coursesCreated = action.payload.coursesCreated;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.fullName = "";
      state.email = "";
      state.isLoggedIn = false;
    },
    updateProfilePic: (state, action: PayloadAction<string>) => {
      state.pic = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;

export const { signup, login, logout, updateProfilePic } = authSlice.actions;
export default authReducer;
