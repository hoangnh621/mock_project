import { createSlice } from '@reduxjs/toolkit'
import { removeLocalStorageItem } from '../../../utils/helpers/handleLocalStorageItems/removeLocalStorageItem'
import { setLocalStorage } from '../../../utils/helpers/handleLocalStorageItems/setLocalStorage'

const auth = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      setLocalStorage('user', action.payload)
    },
    logout: (state) => {
      state.user = null
      removeLocalStorageItem('user')
    },
  },
})

export const { login, logout } = auth.actions
export default auth.reducer
