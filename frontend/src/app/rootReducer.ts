import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import { courseApi } from "../features/api/courseApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,

  auth: authReducer,
  couter: counterReducer,
});

export default rootReducer;
