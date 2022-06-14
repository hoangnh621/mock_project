import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { Button, Pagination, Select } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getWorksheet } from '../../store/reducer/worksheetSlice'
import TableWorksheet from './TableWorksheet/TableWorksheet'
import WorkSheetFilter from './WorksheetFilter/WorksheetFilter'
import './WorkSheetScreen.scss'

const { Option } = Select

const WorkSheet = () => {
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const [page, setPage] = useState(1)
  const [totalItem, setTotalItem] = useState(0)
  const [isLateEarlyVisible, setIsLateEarlyVisible] = useState(false)
  const [isLeaveVisible, setIsLeaveVisible] = useState(false)
  const [isOverTimeVisible, setIsOverTimeVisible] = useState(false)
  // const dispatch = useDispatch()
  // const worksheetData = useSelector(getWorksheetData)
  let isLoading = useSelector(getWorksheetLoading)
  const [form] = Form.useForm()

  useEffect(() => {
    const getDataWorksheet = async () => {
      const res = await axiosPrivate.get('/worksheet/my-timesheet', {
        params: { ...paramTimesheet, page: page, per_page: 10 },
      })
      setTotalItem(res.data.worksheet.total)
      let result = res.data.worksheet.data.map((item, index) => {
        return {
          key: item.id,
          id: index + 1,
          work_date: convertDayToShortDay(item.work_date),
          checkin: item.checkin
            ? convertDateTimeToTime(item.checkin)
            : convertDateTimeToTime(item.checkin_original),
          checkout: item.checkout
            ? convertDateTimeToTime(item.checkout)
            : convertDateTimeToTime(item.checkout_original),
          late: item.late,
          early: item.early,
          in_office: item.in_office,
          ot_time: item.ot_time,
          work_time: item.work_time,
          lack: item.lack,
          compensation: item.compensation,
          paid_leave: item.paid_leave,
          unpaid_leave: item.unpaid_leave,
          note: item.note,
          checkin_original: convertDateTimeToTime(item.checkin_original),
          checkout_original: convertDateTimeToTime(item.checkout_original),
          action: (
            <div className="flex">
              <span>Forget</span>
              <Divider type="vertical" />
              <span onClick={showLateEarly}>Late/Early</span>
              <Divider type="vertical" />
              <span onClick={showLeave}>Leave</span>
              <Divider type="vertical" />
              <span onClick={showOverTime}>OT </span>
            </div>
          ),
        }
      })
      // result.push({
      //   key: 27,
      //   id: 27,
      //   work_date: '27/03/2000|Mon',
      //   checkin: '27:03',
      //   checkout: '',
      //   late: '27:03',
      //   early: '27:03',
      //   in_office: '27:03',
      //   ot_time: '27:03',
      //   work_time: '27:03',
      //   lack: '27:03',
      //   compensation: '27:03',
      //   paid_leave: '27:03',
      //   unpaid_leave: '27:03',
      //   note: '27:03',
      //   checkin_original: '27:03',
      //   checkout_original: '27:03',
      //   action: (
      //     <div className="flex">
      //       <span>Forget</span>
      //       <Divider type="vertical" />
      //       <span onClick={showLateEarly}>Late/Early</span>
      //       <Divider type="vertical" />
      //       <span onClick={showLeave}>Leave</span>
      //     </div>
      //   ),
      // })
      setWorksheetDataTable(result)
    }
    dispatch(getWorksheet(paramTimesheet))
  }, [dispatch, firstDayOfRecentMonth, today])

  const handlePaginate = (page) => {
    setPage(page)
  }

  // show hide LateEarly
  const showLateEarly = () => {
    setIsLateEarlyVisible(true)
  }

  const showLeave = () => {
    setIsLeaveVisible(true)
  }

  const showOverTime = () => {
    setIsOverTimeVisible(true)
  }

  return (
    <div className="worksheet">
      <div className="worksheet-filter">
        <WorkSheetFilter page={page} perPage={perPage} />
      </div>
      <div className="worksheet-per-page">
        <h3>Totals number of records:0</h3>
        <div className="per-page-select">
          <label>Items per page</label>
          <Select defaultValue={30} onChange={(value) => setPerPage(value)}>
            <Option value={30}>30</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
        </div>
      </div>
      <div className="worksheet-table">
        <TableWorksheet />
      </div>
      <div className="worksheet-pagination">
        <div className="worksheet-pagination-wrap">
          <Button
            disabled={page === 1}
            className="outline-secondary-button mr-12"
          >
            <DoubleLeftOutlined />
          </Button>
          <Pagination onChange={handlePaginate} />
          <Button
            // disabled={page === totalItem / 10}
            className="outline-secondary-button ml-12"
          >
            <DoubleRightOutlined />
          </Button>
        </div>
      </div>
      <LateEarly
        isLateEarlyVisible={isLateEarlyVisible}
        setIsLateEarlyVisible={setIsLateEarlyVisible}
      />

      <Leave
        isLeaveVisible={isLeaveVisible}
        setIsLeaveVisible={setIsLeaveVisible}
      />

      <RegisterOverTime
        isOverTimeVisible={isOverTimeVisible}
        setIsOverTimeVisible={setIsOverTimeVisible}
      />
    </div>
  )
}

export default WorkSheet
