import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const url = 'https://course-api.com/react-useReducer-cart-project'



const initialState = {
  
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    loan:0,
  
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
       
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        state.cartTotalAmount= action.payload.price
       
      }
      
    },
    clearCart: (state) => {
      state.cartItems = []
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
    },

    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      
        state.cartItems[itemIndex].cartQuantity += 1;

        
      
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        
      }

    },
     

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    calculateLoan(state,action){
      switch (action.payload) {
        case 'A': {
          let totalCost= state.cartTotalAmount;
          totalCost+=totalCost* 0.01 ;
          let payment =totalCost / 3 ;
          state.loan=payment;
          return  state
        }
        case 'B': {
          let totalCost= state.cartTotalAmount;
          totalCost+=totalCost* 0.1 ;
          let payment =totalCost / 6 ;
          state.loan=payment;
          return  state
        }
        case 'C': {
          let totalCost= state.cartTotalAmount;
          totalCost+=totalCost* 0.2 ;
          let payment =totalCost / 12 ;
          state.loan=payment;
          return  state
        }
        
        default:
          return state
      }
    }
  },
 
})

export const { addToCart, decreaseCart,increaseCart, removeFromCart, getTotals, clearCart,calculateLoan } =
  cartSlice.actions;

export default cartSlice.reducer;