import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getManagerDetail = createAsyncThunk(
  'managerDetailSlice/getManagerDetailSlice',
  async (id) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(`/manager/show/${id}`)
    return res.data
  },
)

const managerDetailSlice = createSlice({
  name: 'managerDetailSlice',
  initialState: {
    loading: false,
    requestDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManagerDetail.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getManagerDetail.fulfilled, (state, action) => {
      state.loading = false
      state.requestDetail = action.payload
    })
    builder.addCase(getManagerDetail.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export default managerDetailSlice.reducer
export const getManagerDetailLoading = (state) =>
  state.managerDetailReducer.loading
export const getManagerDetailState = (state) =>
  state.managerDetailReducer.requestDetail
