import { Col, Form, Input, Row, Space, TimePicker } from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import React from 'react'
import './OverTime.scss'

function OverTime() {
  const registerForDate = '2022-2-19'
  const checkInTime = '08:00'
  const checkOutTime = '18:40'
  // const [overTime, setOverTime] = useState('')
  // const [actualOverTime, setActualOverTime] = useState('')

  //   const timeCheckIn = (date, checkInTime) => {
  //       (Date.parse(`${date} ${checkInTime}`) - Date.parse(`${date} 08:00`)) /
  //       60000
  //   }

  //  const timeCheckOut = (date, checkOutTime) => {
  //       (Date.parse(`${date} 17:00`) - Date.parse(`${date} ${checkOutTime}`)) /
  //       60000
  //  }

  const today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes()
  const timeFormat = 'HH:mm'
  //  const onFinish = (values) => {
  //    console.log('Received values of form: ', values)
  //  }

  // const handleRequestOT = () => {
  //   if (overTime < actualOverTime)

  // }
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  }

  return (
    <Form>
      <div className="container">
        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Registration date:</h4>
          </Col>
          <Col>
            <Row>
              <p className="date">{date}</p>{' '}
              <p style={{ marginLeft: '8px' }}>{time}</p>
            </Row>
          </Col>
        </Row>

        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Register for date:</h4>
          </Col>
          <Col>
            {/* thời gian lấy từ bảng worksheet */}
            <p className="date">{registerForDate}</p>
          </Col>
        </Row>

        <Row className="item">
          {/* thời gian từ bảng worksheet */}
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
            <h4 className="w-140 mr-20">Check-in:</h4>
            <span className="time">{checkInTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
            <h4 className="col-order-2 mr-20">Check-out:</h4>
            <span className="time">{checkOutTime}</span>
          </Col>
        </Row>

        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Row className="item">
              <div className="w-140 mr-20 d-flex">
                <h4>Request OT :</h4>
              </div>
              <Space direction="vertical" size={12}>
                <Form.Item name="time-picker" {...config}>
                  <TimePicker
                    initialValues={moment('00:00', timeFormat)}
                    format={timeFormat}
                  />
                </Form.Item>
              </Space>
            </Row>
          </Col>
          <Row className="item">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
              <h4 className="col-order-2 mr-25">Actual OT:</h4>
            </Col>
          </Row>
        </Row>
        <Row className="item">
          <Col>
            <h4 className="w-140 mr-15">Note:</h4>
            <h5 className="mr-15">
              -Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết thúc làm
              việc chính thức.
            </h5>
            <h5 className="ml-20">
              Ví dụ: Ca làm việc 08:00 AM đến 17:00 PM, thì thời gian bắt đầu
              tính OT là 18:00 PM
            </h5>
            <h5 className="mt-20">
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
            <Form.Item
              name="reason"
              rules={[
                {
                  required: true,
                  message: 'Please input your reason!',
                },
              ]}
            >
              <Input.TextArea rows={4} showCount maxLength={100} />
            </Form.Item>
          </Col>
        </div>
      </div>
    </Form>
  )
}

export default OverTime
