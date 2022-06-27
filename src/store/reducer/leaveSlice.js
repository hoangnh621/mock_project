import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems/index'
import axiosInstance from '../../utils/requests/axiosInstance'

export const registerLeave = createAsyncThunk(
  'leaveSlice/registerLeave',
  async (args, thunkAPI) => {
    try {
      const accessToken = getLocalStorageItem('accessToken')

      const res = await axiosInstance({
        method: args.method,
        url: `/worksheet/request/leave/${args.action}?type=6`,
        data: {
          reason: args.reason,
          request_for_date: args.requestForDate,
          checkin: args.checkIn,
          checkout: args.checkOut,
          leave_start: args.leaveStart,
          leave_end: args.leaveEnd,
          paid: args.paid,
          leave_all_day: args.leaveAllDay,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const leaveSlice = createSlice({
  name: 'leaveSlice',
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerLeave.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(registerLeave.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload?.message.includes('successfully')) {
        message.success(action.payload?.message)
      } else {
        message.warning(action.payload?.message)
      }
    })
    builder.addCase(registerLeave.rejected, (state, action) => {
      state.loading = false
      message.error(action.payload?.errors?.reason)
    })
  },
})

export default leaveSlice.reducer
export const getLeaveLoading = (state) => state.leaveReducer.loading
