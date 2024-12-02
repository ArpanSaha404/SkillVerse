import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import { courseApi } from "../features/api/courseApi";
import { categoryApi } from "../features/api/categoryApi";
import { courseProgressApi } from "../features/api/courseProgressApi";
import { paymentsApi } from "../features/api/paymentsApi";
import counterReducer from "../features/counterSlice";
import authReducer from "../features/authSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,

  auth: authReducer,
  couter: counterReducer,
});

export default rootReducer;
