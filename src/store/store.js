import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/reducer/loginSlice'
import changePassReducer from './reducer/changePassSlice'

export const store = configureStore({
  reducer: {
    loginReducer,
    changePassReducer,
  },
})
