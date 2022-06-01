import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/reducer/loginSlice'

export const store = configureStore({
  reducer: {
    loginReducer,
  },
})
