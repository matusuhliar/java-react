import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from "../reducers/usersSlice";
import loadingReducer from "../reducers/loadingSlice";

export const store = configureStore({
  reducer: {
    loading:loadingReducer,
    users:usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
