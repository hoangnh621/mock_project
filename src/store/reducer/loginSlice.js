import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import setLocalStorageItems from '../../utils/helpers/handleLocalStorageItems/setLocalStorageItems'

export const login = createAsyncThunk('login/postUserAccount', async (args) => {
  const res = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/login', {
    email: args.email,
    password: args.password,
  })
  return res.data
})

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {
      fullName: null,
      role: null,
    },
    loading: false,
    error: null,
    replace: false,
  },
  reducers: {
    logout: (state) => {
      state.replace = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user.role = action.payload.role
      state.user.fullName = action.payload.full_name
      state.loading = false
      state.replace = true
      setLocalStorageItems('accessToken', action.payload.access_token)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})

export default loginSlice.reducer
export const { logout } = loginSlice.actions
export const getLoginInfo = (state) => state.loginReducer.user
export const getLoginLoading = (state) => state.loginReducer.loading
export const getLoginError = (state) => state.loginReducer.error
export const getLoginReplace = (state) => state.loginReducer.replace
