import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/reducer/loginSlice'
import changePassReducer from './reducer/changePassSlice'
import homeReducer from './reducer/homeSlice'
import userProfileSlice from './reducer/userProfileSlice'
import worksheetReducer from './reducer/worksheetSlice'
export const store = configureStore({
  reducer: {
    loginReducer,
    changePassReducer,
    homeReducer,
    userProfileSlice,
    worksheetReducer,
  },
})
