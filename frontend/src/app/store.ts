import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "../features/api/authApi";
import { courseApi } from "../features/api/courseApi";
import { categoryApi } from "../features/api/categoryApi";
import { courseProgressApi } from "../features/api/courseProgressApi";
import { paymentsApi } from "../features/api/paymentsApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      categoryApi.middleware,
      courseProgressApi.middleware,
      paymentsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
