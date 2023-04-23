import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './isLogin';
import productReducer from './productSlice';
import CartReducer from './cartSlice';
export const store = configureStore({
  reducer: {
    isLogin:LoginReducer,
    products:productReducer,
    cart:CartReducer
  },
})