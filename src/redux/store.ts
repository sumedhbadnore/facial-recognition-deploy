// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import faceReducer from "./faceSlice";

export const store = configureStore({
  reducer: {
    face: faceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
