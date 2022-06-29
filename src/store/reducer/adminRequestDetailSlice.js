import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const adminRequestDetail = createAsyncThunk(
  'adminDetailSlice/adminRequestDet',
  async (id) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(`/admin/show/${id}`)
    return res.data
  },
)

const adminDetailSlice = createSlice({
  name: 'adminDetailSlice',
  initialState: {
    loading: false,
    detailRequest: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminRequestDetail.fulfilled, (state, action) => {
      state.detailRequest = action.payload
    })
  },
})

export default adminDetailSlice.reducer
export const getAdminDetailLoading = (state) => state.adminDetailReducer.loading
export const getAdminDetailState = (state) =>
  state.adminDetailReducer.detailRequest
