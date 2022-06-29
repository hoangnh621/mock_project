import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import handleManagerTable from '../../utils/helpers/handleTableData/handleManagerTable'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const adminRequest = createAsyncThunk(
  'adminRequestSlice/adminRequest',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get('/admin', {
      params: {
        order_by_created_at: args.orderByCreatedAt,
        per_page: args.perPage,
        page: args.page,
      },
    })
    return res.data
  },
)

export const approvedAdmin = createAsyncThunk(
  'adminRequestSlice/approvedAdmin',
  async (args, thunkAPI) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.put(`/admin/approve/${args.id}`, {
      comment: args.comment,
      status: args.status,
    })
    if (res.data) {
      thunkAPI.dispatch(
        adminRequest({
          orderRequestForDate: 'asc',
          per_page: 10,
          page: 1,
        }),
      )
    }
    return res.data
  },
)

const adminRequestSlice = createSlice({
  name: 'adminRequestSlice',
  initialState: {
    loading: false,
    listRequest: [],
    perPageConfig: [],
    request: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(adminRequest.fulfilled, (state, action) => {
      state.loading = false
      state.listRequest = handleManagerTable(action.payload.request.data)
      state.perPageConfig = action.payload.per_page_config
      state.request = action.payload.request
    })
    builder.addCase(adminRequest.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(approvedAdmin.pending, (state, action) => {})
    builder.addCase(approvedAdmin.fulfilled, (state, action) => {
      message.success(action.payload?.message)
    })
    builder.addCase(approvedAdmin.rejected, (state, action) => {})
  },
})

export default adminRequestSlice.reducer
export const getAdminLoading = (state) => state.adminRequestReducer.loading
export const getAdminRequest = (state) => state.adminRequestReducer.request
export const getAdminPerPageConfig = (state) =>
  state.adminRequestReducer.perPageConfig
export const getAdminListRequest = (state) =>
  state.adminRequestReducer.listRequest
