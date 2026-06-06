import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./Reducer/auth.reducer";
import blogReducer from "./Reducer/blog.reducer";
import userReducer from "./Reducer/user.reducer";
import dashboardReducer from "./Reducer/dashboard.reducer"

const storage = {
  getItem: (key: string) => {
    return Promise.resolve(
      localStorage.getItem(key)
    );
  },

  setItem: (
    key: string,
    value: string
  ) => {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  dashboard: dashboardReducer, 
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "blog", "user"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState =
  ReturnType<typeof rootReducer>;

export type AppDispatch =
  typeof store.dispatch;