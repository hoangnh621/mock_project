import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import handleManagerTable from '../../utils/helpers/handleTableData/handleManagerTable'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getManagerListRequest = createAsyncThunk(
  'managerSlice/getManagerListRequest',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get('/manager', {
      params: {
        order_by_created_at: args.orderRequestForDate,
        per_page: args.perPage,
        page: args.page,
      },
    })
    return res.data
  },
)

export const confirmManager = createAsyncThunk(
  'managerSlice/confirmManager',
  async (args, thunkAPI) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.put(`/manager/confirm/${args.id}`, {
      comment: args.comment,
      status: args.status,
    })
    if (res.data) {
      thunkAPI.dispatch(
        getManagerListRequest({
          orderRequestForDate: 'asc',
          per_page: 10,
          page: 1,
        }),
      )
    }
    return res.data
  },
)

const managerSlice = createSlice({
  name: 'managerSlice',
  initialState: {
    loading: false,
    requestSent: {},
    perPageConfig: [],
    listRequest: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManagerListRequest.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getManagerListRequest.fulfilled, (state, action) => {
      state.loading = false
      state.requestSent = action.payload.request_sent
      state.perPageConfig = action.payload.per_page_config
      state.listRequest = handleManagerTable(action.payload?.request_sent.data)
    })
    builder.addCase(getManagerListRequest.rejected, (state, action) => {
      state.loading = false
    })
    builder.addCase(confirmManager.pending, (state) => {
      // state.loading = true
    })
    builder.addCase(confirmManager.fulfilled, (state, action) => {
      // state.loading = false
      message.success(action.payload?.message)
    })
    builder.addCase(confirmManager.rejected, (state) => {
      // state.loading = false
    })
  },
})

export default managerSlice.reducer
export const getManagerRequestSent = (state) => state.managerReducer.requestSent
export const getManagerLoading = (state) => state.managerReducer.loading
export const getManagerPerPageConfig = (state) =>
  state.managerReducer.perPageConfig
export const getManagerList = (state) => state.managerReducer.listRequest
