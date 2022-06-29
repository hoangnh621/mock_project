import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/reducer/loginSlice'
import adminRequestReducer from './reducer/adminRequest'
import adminDetailReducer from './reducer/adminRequestDetailSlice'
import changePassReducer from './reducer/changePassSlice'
import homeReducer from './reducer/homeSlice'
import leaveReducer from './reducer/leaveSlice'
import managerDetailReducer from './reducer/managerDetailSlice'
import managerReducer from './reducer/managerSlice'
import overTimeReducer from './reducer/overTimeSlice'
import submitLateEarlyReducer from './reducer/submitLateEarlySlice'
import updateLateEarlyReducer from './reducer/updateLateEarlySlice'
import userProfileSlice from './reducer/userProfileSlice'
import worksheetReducer from './reducer/worksheetSlice'

export const store = configureStore({
  reducer: {
    loginReducer,
    changePassReducer,
    homeReducer,
    userProfileSlice,
    submitLateEarlyReducer,
    worksheetReducer,
    updateLateEarlyReducer,
    leaveReducer,
    overTimeReducer,
    managerReducer,
    managerDetailReducer,
    adminRequestReducer,
    adminDetailReducer,
  },
})
