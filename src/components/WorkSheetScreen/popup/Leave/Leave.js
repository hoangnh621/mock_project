import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  TimePicker,
} from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getLeaveLoading,
  registerLeave,
} from '../../../../store/reducer/leaveSlice'
import './Leave.scss'

export default function Leave({
  data,
  setData,
  isLeaveVisible,
  setIsLeaveVisible,
}) {
  const registerForDateData = data?.request_for_date || data?.work_date
  const registerForDate = moment(registerForDateData).format('DD-MM-YYYY')
  const createdAt = data?.created_at
  const reasonData = data?.reason
  const formatCreatedAt = createdAt
    ? moment(data?.created_at).format('DD-MM-YYYY HH:mm')
    : ''
  const checkinData = data?.checkin_original || data?.checkin
  const checkInTime = checkinData
    ? moment(checkinData).format('HH:mm')
    : '--:--'
  const checkoutData = data?.checkout_original || data?.checkout
  const checkOutTime = checkoutData
    ? moment(checkoutData).format('HH:mm')
    : '--:--'
  const workTime = data?.work_time || '--:--'
  const lackTime = data?.lack || '--:--'
  const format = 'HH:mm'
  const [isLeaveAllDay, setIsLeaveAllDay] = useState(0)
  const [timeCount, setTimeCount] = useState('00:00')
  const [leaveStart, setLeaveStart] = useState(moment('00:00', format))
  const [leaveEnd, setLeaveEnd] = useState(moment('00:00', format))
  const [form] = Form.useForm()
  const formRef = useRef()
  const dispatch = useDispatch()
  const leaveLoading = useSelector(getLeaveLoading)
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const handleOk = () => {
    setIsLeaveVisible(false)
  }
  const handleCancel = () => {
    setIsLeaveVisible(false)
    setData({})
  }

  const handleForm = (method, action) => {
    const paidRequest = form.getFieldValue('paid_unpaid') === 'paid' ? 2 : 3
    if (!isLeaveAllDay) {
      const checkTime = leaveStart.isBefore(leaveEnd)
      if (checkTime) {
        dispatch(
          registerLeave({
            reason: form.getFieldValue('reason'),
            requestForDate: registerForDateData,
            checkIn: checkInTime,
            checkOut: checkOutTime,
            leaveStart: moment(leaveStart).format(format),
            leaveEnd: moment(leaveEnd).format(format),
            paid: paidRequest,
            leaveAllDay: '',
            method,
            action,
          }),
        )
        handleCancel()
      } else {
        message.warning('Invalid time')
      }
    } else {
      dispatch(
        registerLeave({
          reason: form.getFieldValue('reason'),
          requestForDate: registerForDateData,
          checkIn: checkInTime,
          checkOut: checkOutTime,
          leaveStart: '',
          leaveEnd: '',
          paid: paidRequest,
          leaveAllDay: 1,
          method,
          action,
        }),
      )
      handleCancel()
    }
  }

  const onChangeLeaveAllDay = () => {
    if (isLeaveAllDay) {
      setIsLeaveAllDay(0)
    } else {
      setIsLeaveAllDay(1)
    }
  }

  useEffect(
    () => {
      if (formRef.current) {
        const checkLeaveAllDay = data?.leave_all_day === 1 ? 1 : 0
        const checkTimeCount = data?.leave_time ? data?.leave_time : timeCount
        const checkPaid = data?.request_type === 3 ? 'unpaid' : 'paid'
        form.setFieldsValue({
          start_time: moment(data?.leave_start, format)._isValid
            ? moment(data?.leave_start, format)
            : leaveStart,
          end_time: moment(data?.leave_end, format)._isValid
            ? moment(data?.leave_end, format)
            : leaveEnd,
          paid_unpaid: checkPaid,
          reason: reasonData || '',
        })
        setIsLeaveAllDay(checkLeaveAllDay)
        setTimeCount(checkTimeCount)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )
  useEffect(() => {
    setTimeCount(timeCount)
  }, [leaveEnd, leaveStart, timeCount])

  return (
    <Modal
      title="Register Leave"
      visible={isLeaveVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="60%"
      okText="Register"
      okButtonProps={{ style: { marginRight: '20px' } }}
      className="modal-leave"
      footer={null}
    >
      <div className="container">
        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Registration date:</h4>
          </Col>
          <Col>
            <Row>
              <p className="date">{formatCreatedAt}</p>{' '}
            </Row>
          </Col>
        </Row>

        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Register for date:</h4>
          </Col>
          <Col>
            <p className="date">{registerForDate}</p>
          </Col>
        </Row>

        <Row className="item">
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
            <h4 className="w-140 mr-20">Check-in:</h4>
            <span className="time">{checkInTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time ">
            <h4 className="col-order-2 mr-20">Check-out:</h4>
            <span className="time">{checkOutTime}</span>
          </Col>
        </Row>

        <Row className="item">
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="late_time">
            <h4 className="w-140 mr-20">Work time:</h4>
            <span>{workTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="early_time">
            <h4 className="col-order-2 mr-20">Lack time:</h4>
            <span>{lackTime}</span>
          </Col>
        </Row>

        <Form form={form} ref={formRef} {...layout} name="nest-messages">
          <Form.Item>
            <Row className="item">
              <Checkbox
                checked={isLeaveAllDay === 1}
                onChange={onChangeLeaveAllDay}
              >
                Leave all day
              </Checkbox>
            </Row>
          </Form.Item>
          <Row>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              className="item align-center"
              style={{ margin: 0 }}
            >
              <Row className="item">
                <Col className="d-flex">
                  <div className="w-140 mr-20 d-flex align-center">
                    <h4>Range:</h4>
                  </div>
                </Col>
                <Col className="d-flex align-center item range-time_container m-0">
                  <Form.Item name={'start_time'} className="range-item m-0">
                    <TimePicker
                      format={format}
                      suffixIcon=""
                      placeholder=""
                      className="range-time"
                      allowClear={false}
                      disabled={isLeaveAllDay}
                      value={leaveStart}
                      onChange={(hour) => {
                        if (!hour.isBefore(leaveEnd)) {
                          message.warning('Invalid time')
                        } else {
                          const formatLeaveStart = moment(hour, format)
                          const formatLeaveEnd = moment(leaveEnd, format)
                          const diffTime = formatLeaveEnd.diff(formatLeaveStart)
                          const calculateTimeCount = moment
                            .utc(diffTime)
                            .format(format)
                          setTimeCount(calculateTimeCount)
                        }
                        setLeaveStart(hour)
                      }}
                    />
                  </Form.Item>
                  <span style={{ margin: '0 5px' }}>to</span>
                  <Form.Item name={'end_time'} className="range-item m-0">
                    <TimePicker
                      format={format}
                      suffixIcon=""
                      placeholder=""
                      className="range-time"
                      allowClear={false}
                      disabled={isLeaveAllDay}
                      value={leaveEnd}
                      onChange={(hour) => {
                        if (!leaveStart.isBefore(hour)) {
                          message.warning('Invalid time')
                        } else {
                          const formatLeaveStart = moment(leaveStart, format)
                          const formatLeaveEnd = moment(hour, format)
                          const diffTime = formatLeaveEnd.diff(formatLeaveStart)
                          const calculateTimeCount = moment
                            .utc(diffTime)
                            .format(format)
                          setTimeCount(calculateTimeCount)
                        }
                        setLeaveEnd(hour)
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              className="d-flex align-center item"
            >
              <Row>
                <Col className="paid_unpaid_container">
                  <Form.Item name="paid_unpaid" style={{ margin: 0 }}>
                    <Radio.Group>
                      <Radio value="paid">Paid</Radio>
                      <Radio value="unpaid">Unpaid</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col className="d-flex align-center">
                  <span>| Time count:</span>
                  <span
                    style={{ marginLeft: '6px' }}
                    className={
                      moment(timeCount, format).isBefore(
                        moment(lackTime, format),
                      )
                        ? 'hightLightRed'
                        : ''
                    }
                  >
                    {isLeaveAllDay ? '08:00' : timeCount}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Form.Item
              name={'reason'}
              label="Reason"
              rules={[
                {
                  required: true,
                  message: 'Please input your reason',
                },
              ]}
            >
              <Input.TextArea
                autoSize={{ minRows: 4, maxRows: 7 }}
                rows={4}
                maxLength={100}
                className="flex-1"
              />
            </Form.Item>
          </Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="button-group">
              {data?.status === undefined && (
                <Button
                  className="primary-button mr-20 item"
                  onClick={() => handleForm('post', 'create')}
                  loading={leaveLoading}
                >
                  Register
                </Button>
              )}
              {data?.status === 0 && (
                <Button
                  className="primary-button mr-20 item"
                  onClick={() => handleForm('put', 'update')}
                  loading={leaveLoading}
                >
                  Update
                </Button>
              )}
              <Button onClick={handleCancel} className="outline-primary-button">
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
