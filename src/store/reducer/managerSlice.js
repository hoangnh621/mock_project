import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import handleManagerTable from '../../utils/helpers/handleTableData/handleManagerTable'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getManagerListRequest = createAsyncThunk(
  'managerSlice/getManagerListRequest',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get('/manager', {
      params: {
        start_date: args.startDate,
        end_date: args.endDate,
        order_by_created_at: args.orderRequestForDate,
        per_page: args.perPage,
        page: args.page,
      },
    })
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
  },
})

export default managerSlice.reducer
export const getManagerRequestSent = (state) => state.managerReducer.requestSent
export const getManagerLoading = (state) => state.managerReducer.loading
export const getManagerPerPageConfig = (state) =>
  state.managerReducer.perPageConfig
export const getManagerList = (state) => state.managerReducer.listRequest
