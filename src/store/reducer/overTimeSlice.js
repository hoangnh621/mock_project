import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems'
import handleOverTime from '../../utils/helpers/handleTableData/handleOverTime'
import axiosInstance from '../../utils/requests/axiosInstance'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getOverTime = createAsyncThunk(
  'overTimeSlice/getOverTime',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(`/worksheet/${args.key}`, {
      params: {
        type: 5,
      },
    })
    return res.data
  },
)

export const registerOverTime = createAsyncThunk(
  'overTimeSlice/registerOverTime',
  async (args, thunkAPI) => {
    try {
      const accessToken = getLocalStorageItem('accessToken')

      const res = await axiosInstance({
        method: args.method,
        url: `/worksheet/request/OverTime/${args.action}`,
        data: {
          reason: args.reason,
          request_for_date: args.requestForDate,
          checkin: args.checkIn,
          checkout: args.checkOut,
          request_ot_time: args.requestOT,
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

const overTimeSlice = createSlice({
  name: 'overTimeSlice',
  initialState: {
    loading: false,
    overTimeState: {
      registrationDate: '',
      registerForDate: '',
      checkIn: '',
      checkOut: '',
      requestOT: '',
      actualOverTime: '',
      reason: '',
    },
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOverTime.fulfilled, (state, action) => {
      state.overTimeState = handleOverTime(action.payload)
      state.status = action.payload?.request?.status
    })
    builder.addCase(registerOverTime.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerOverTime.fulfilled, (state, action) => {
      state.loading = false
      state.overTimeState = handleOverTime(action.payload)
      if (action.payload?.message.includes('successfully')) {
        message.success(action.payload?.message)
      } else {
        message.warning(action.payload?.message)
      }
    })
    builder.addCase(registerOverTime.rejected, (state) => {
      state.loading = false
    })
  },
})

export default overTimeSlice.reducer
export const getOverTimeState = (state) => state.overTimeReducer.overTimeState
export const getOverTimeLoading = (state) => state.overTimeReducer.loading
export const getOverTimeStatus = (state) => state.overTimeReducer.status
