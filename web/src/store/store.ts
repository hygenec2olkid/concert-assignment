import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import loadingSlice from "./features/loadingSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
