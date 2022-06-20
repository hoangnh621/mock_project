// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { message } from 'antd'
// import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

// export const updateOvertime = createAsyncThunk(
//   'updateOvertime/updateRequest',
//   async (args, thunkAPI) => {
//     try {
//       const axiosPrivate = useAxiosPrivate()
//       const res = await axiosPrivate.put('/worksheet/request/OverTime/update', {
//         request_type: 5,
//         request_for_date: args.request_for_date,
//         checkin: args.checkin,
//         checkout: args.checkout,
//         compensation_date: args.compensation_date,
//         compensation_time: args.compensation_time,
//         reason: args.reason,
//       })
//       return res.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   },
// )

// const updateOverTimeSlice = createSlice({
//   name: 'updateOverTime',
//   initialState: {
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(updateOvertime.pending, (state) => {
//       state.loading = true
//     })
//     builder.addCase(updateOvertime.fulfilled, (state, action) => {
//       state.loading = false
//       message.success('Successfully Update')
//     })
//     builder.addCase(updateOvertime.rejected, (state, action) => {
//       message.error(`${action.payload?.message}`)
//       state.loading = false
//     })
//   },
// })

// export default updateOverTimeSlice.reducer
// export const getUpdateOverTimeLoading = (state) =>
//   state.updateOverTimeReducer.loading
// export const getUpdateOverTimeError = (state) =>
//   state.updateOverTimeReducer.error
