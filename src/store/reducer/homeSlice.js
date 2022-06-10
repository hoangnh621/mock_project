import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getNotice = createAsyncThunk(
  'noticeSlice/getNotice',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(
      `/notifications?page=${args.page}&per_page=${args.per_page}`,
    )
    return res.data
  },
)

export const getNoticeDetail = createAsyncThunk(
  'noticeSlice/getNoticeDetail',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(`/notifications/detail/${args.noticeId}`)
    return res.data
  },
)

const noticeSlice = createSlice({
  name: 'noticeSlice',
  initialState: {
    notices: null,
    noticeDetail: {
      detail: null,
      toDepartment: null,
      publishedDate: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotice.fulfilled, (state, action) => {
      state.notices = action.payload
    })
    builder.addCase(getNoticeDetail.fulfilled, (state, action) => {
      state.noticeDetail.detail = action.payload
      state.noticeDetail.toDepartment = action.meta.arg.toDepartment
      state.noticeDetail.publishedDate = action.meta.arg.publishedDate
    })
  },
})

export default noticeSlice.reducer
export const getNoticeState = (state) => state.homeReducer.notices
export const getNoticeDetailState = (state) => state.homeReducer.noticeDetail
