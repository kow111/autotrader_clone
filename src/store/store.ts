import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";
import { filterOptionsApi } from "./filterOptionsApi";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    [filterOptionsApi.reducerPath]: filterOptionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filterOptionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
