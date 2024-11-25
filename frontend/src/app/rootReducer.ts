import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,

  auth: authReducer,
  couter: counterReducer,
});

export default rootReducer;
