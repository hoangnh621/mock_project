import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getNotice = createAsyncThunk('noticeSlice/getNotice', async () => {
  const axiosPrivate = useAxiosPrivate()
  const res = await axiosPrivate.get('/notifications')
  return res.data
})

const noticeSlice = createSlice({
  name: 'noticeSlice',
  initialState: {
    notices: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotice.fulfilled, (state, action) => {
      state.notices = action.payload
    })
  },
})

export default noticeSlice.reducer
export const getNoticeState = (state) => state.homeReducer.notices
