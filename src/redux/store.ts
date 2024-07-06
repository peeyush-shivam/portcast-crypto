import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice";

const store = configureStore({
  reducer: {
    cryptoData: cryptoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
