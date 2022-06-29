import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import handleManagerTable from '../../utils/helpers/handleTableData/handleManagerTable'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const adminRequest = createAsyncThunk(
  'adminRequestSlice/adminRequest',
  async (args, thunkAPI) => {
    try {
      const axiosPrivate = useAxiosPrivate()
      const res = await axiosPrivate.get('/admin', {
        params: {
          order_by_created_at: args.orderByCreatedAt,
          per_page: args.perPage,
          page: args.page,
        },
      })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const approvedAdmin = createAsyncThunk(
  'adminRequestSlice/approvedAdmin',
  async (args, thunkAPI) => {
    try {
      console.log('try')
      const axiosPrivate = useAxiosPrivate()
      const res = await axiosPrivate.put(`/admin/approve/${args.id}`, {
        comment: args.comment,
        status: args.status,
      })
      console.log('res', res)
      if (res.data) {
        thunkAPI.dispatch(
          adminRequest({
            orderRequestForDate: 'desc',
            per_page: 10,
            page: 1,
          }),
        )
      }
      return res.data
    } catch (error) {
      console.log('error', error.response.data)
      return thunkAPI.rejectWithValue(error.response.data)
    }
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
    builder.addCase(adminRequest.rejected, (state, action) => {
      state.loading = false
      message.warning(action.payload?.error)
    })
    builder.addCase(approvedAdmin.pending, (state, action) => {})
    builder.addCase(approvedAdmin.fulfilled, (state, action) => {
      message.success(action.payload?.message)
    })
    builder.addCase(approvedAdmin.rejected, (state, action) => {
      message.warning(action.payload?.error)
    })
  },
})

export default adminRequestSlice.reducer
export const getAdminLoading = (state) => state.adminRequestReducer.loading
export const getAdminRequest = (state) => state.adminRequestReducer.request
export const getAdminPerPageConfig = (state) =>
  state.adminRequestReducer.perPageConfig
export const getAdminListRequest = (state) =>
  state.adminRequestReducer.listRequest
