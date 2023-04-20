import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './isLogin';
import productReducer from './productSlice';
export const store = configureStore({
  reducer: {
    isLogin:LoginReducer,
    products:productReducer
  },
})