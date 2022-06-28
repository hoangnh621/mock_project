import { Button, Col, Form, Input, message, Modal, Row, TimePicker } from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import XIcon from '../../../../common/XIcon/XIcon'
import {
  getOverTime,
  getOverTimeLoading,
  getOverTimeState,
  getOverTimeStatus,
  registerOverTime,
} from '../../../../store/reducer/overTimeSlice'
import '../../../../styles/index.scss'
import './OverTime.scss'

function OverTime({ currentRow, isOverTimeVisible, setIsOverTimeVisible }) {
  const HOUR_FORMAT = 'HH:mm'
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const formRef = useRef()
  const overTimeState = useSelector(getOverTimeState)
  const {
    registrationDate,
    registerForDate,
    checkIn,
    checkOut,
    requestOT,
    actualOverTime,
    reason,
  } = overTimeState
  const overTimeLoading = useSelector(getOverTimeLoading)
  const overTimeStatus = useSelector(getOverTimeStatus)
  const DATE_FORMAT_FE = 'DD-MM-YYYY'
  const DATE_FORMAT_BE = 'YYYY-MM-DD'
  const config = {
    rules: [
      {
        required: true,
        message: 'Please select time!',
      },
    ],
  }
  // Get over time data
  useEffect(() => {
    dispatch(getOverTime({ key: currentRow?.key }))
  }, [currentRow?.key, currentRow.wor_date, currentRow.work_date, dispatch])
  // Set over time data
  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue({
        request_OT: moment(requestOT, HOUR_FORMAT),
        reason,
      })
    }
  })

  const onFinish = (method, action) => {
    const requestOT = form.getFieldValue('request_OT')
    const actualOT = moment(actualOverTime, HOUR_FORMAT)
    const checkTime = requestOT.isBefore(actualOT)
    const reason = form.getFieldValue('reason')
    if (!checkTime) {
      message.warning('Request over time must be less than actual over time')
    } else if (!reason) {
      message.warning('Please input your reason!')
    } else {
      dispatch(
        registerOverTime({
          method,
          action,
          reason,
          requestForDate: moment(registerForDate, DATE_FORMAT_FE).format(
            DATE_FORMAT_BE,
          ),
          checkIn,
          checkOut,
          requestOT: moment(requestOT).format(HOUR_FORMAT),
        }),
      )
      handleCancel()
    }
  }

  const handleCancel = () => {
    setIsOverTimeVisible(false)
  }

  return (
    <Modal
      title="Register OT"
      visible={isOverTimeVisible}
      onCancel={handleCancel}
      width="70%"
      closeIcon={<XIcon />}
      className="modal_ot"
      footer={false}
    >
      <div className="container">
        <Form form={form} ref={formRef}>
          <Row className="item">
            <Col span={5}>
              <p>Registration date:</p>
            </Col>
            <Col span={6}>
              <p>{registrationDate}</p>
            </Col>
          </Row>
          <Row className="item">
            <Col span={5}>
              <p>Register for date:</p>
            </Col>
            <Col span={6}>
              <p className="date">{registerForDate}</p>
            </Col>
          </Row>
          <Row className="item">
            <Col span={5}>
              <p>Check-in:</p>
            </Col>
            <Col span={7}>
              <p className="time_check">{checkIn}</p>
            </Col>
            <Col span={3}>
              <p>Check-out:</p>
            </Col>
            <Col span={3}>
              <p>{checkOut}</p>
            </Col>
          </Row>
          <Row className="item">
            <Col span={5}>
              <h4>Request OT :</h4>
            </Col>
            <Col span={7}>
              <Form.Item name="request_OT" {...config}>
                <TimePicker
                  format={HOUR_FORMAT}
                  allowClear={false}
                  suffixIcon=""
                  placeholder=""
                  className="range-time"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <p>Actual Overtime:</p>
            </Col>
            <Col span={2}>
              <span>{actualOverTime}</span>
            </Col>
          </Row>
          <Row className="item">
            <Col>
              <h4 className="w-140 mr-15">Note:</h4>
              <h5 className="mr-15">
                -Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết thúc
                làm việc chính thức.
              </h5>
              <i className="ml-20">
                Ví dụ: Ca làm việc 08:00 AM đến 17:00 PM, thì thời gian bắt đầu
                tính OT là 18:00 PM
              </i>
              <h5 className="mt-16">
                -Thời gian request OT{' '}
                <span style={{ color: 'red' }}>không lớn hơn</span> thời gian
                Overtime Actual. Các trường hợp OT khi remote cần yêu cầu qua
                email.
              </h5>
            </Col>
          </Row>
          <div className="reason">
            <Col className="w-140 mr-20 d-flex">
              <h4>Reason:</h4>
              <span style={{ color: 'red' }}>(*)</span>
            </Col>
            <Col className="flex-1">
              <Form.Item name="reason">
                <Input.TextArea
                  autoSize={{ minRows: 4, maxRows: 7 }}
                  className="input-primary"
                  rows={4}
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </div>
          <div className="btn-register">
            <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
              {overTimeStatus === undefined && (
                <Button
                  loading={overTimeLoading}
                  className="primary-button "
                  onClick={() => onFinish('post', 'create')}
                >
                  Register
                </Button>
              )}
              {overTimeStatus === 0 && (
                <Button
                  loading={overTimeLoading}
                  className="primary-button "
                  onClick={() => onFinish('put', 'update')}
                >
                  Update
                </Button>
              )}
              <Button
                onClick={handleCancel}
                className="outline-primary-button "
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default OverTime
