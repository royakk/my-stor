import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: 0,
}

export const islogin = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setToken: (state,action) => {
        state.token=action.payload
        console.log("user token",state.token)
    },
    
  },
})

export const { setToken } = islogin.actions

export default islogin.reducer