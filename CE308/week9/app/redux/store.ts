import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import todoReducer from '../store/todoSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;