// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { message } from 'antd'
// import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

// export const submitOverTime = createAsyncThunk(
//   'submitOverTime/submitRequest',
//   async (args, thunkAPI) => {
//     try {
//       const axiosPrivate = useAxiosPrivate()
//       const res = await axiosPrivate.post(
//         '/worksheet/request/OverTime/create',
//         {
//           request_type: 5,
//           request_for_date: args.request_for_date,
//           checkin: args.checkin,
//           checkout: args.checkout,
//           compensation_date: args.compensation_date,
//           compensation_time: args.compensation_time,
//           reason: args.reason,
//         },
//       )
//       console.log('res', res)
//       return res.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   },
// )

// const submitOverTimeSlice = createSlice({
//   name: 'submitOverTime',
//   initialState: {
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(submitOverTime.pending, (state) => {
//       state.loading = true
//     })
//     builder.addCase(submitOverTime.fulfilled, (state, action) => {
//       state.loading = false
//       message.success('Successfully Register')
//     })
//     builder.addCase(submitOverTime.rejected, (state, action) => {
//       message.error(`${action.payload?.message}`)
//       state.loading = false
//     })
//   },
// })

// export default submitOverTimeSlice.reducer
// export const getSubmitOverTimeLoading = (state) =>
//   state.submitOverTimeReducer.loading
// export const getSubmitOverTimeError = (state) =>
//   state.submitOverTimeReducer.error
