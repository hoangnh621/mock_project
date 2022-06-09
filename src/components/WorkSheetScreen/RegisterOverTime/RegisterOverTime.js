import { Col, Form, Input, Row, TimePicker } from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import React, { useState } from 'react'
import './RegisterOverTime.scss'

function RegisterOverTime() {
  const registrationDate = moment(new Date()).format('DD/MM/YYYY HH:mm')
  const registerForDate = moment(new Date()).format('DD/MM/YYYY')
  const checkInTime = '08:00'
  const checkOutTime = '18:40'
  const [overTime, setOverTime] = useState('')
  const [reason, setReason] = useState('')

  const hanldeCheckOverTime = (value) => {
    value && setOverTime(value.format('HH:mm'))
  }

  const hanldeReeasonChange = (e) => {
    setReason(e.target.value)
  }
  const timeFormat = 'HH:mm'

  const config = {
    rules: [
      {
        required: true,
        message: 'Please select time!',
      },
    ],
  }
  // const onFinish = (values) => {
  //   console.log('Success:', values)
  // }

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo)
  // }
  return (
    <div className="container">
      <Form>
        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Registration date:</h4>
          </Col>
          <Col>
            <p>{registrationDate}</p>
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
              <div className="w-140 mr-20 ">
                <h4>Request OT :</h4>
              </div>
              <Form.Item name="request OT" {...config}>
                <TimePicker
                  onChange={hanldeCheckOverTime}
                  value={moment(overTime, timeFormat)}
                  format={timeFormat}
                />
              </Form.Item>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
            <h4 className="w-140 ">Actual Overtime:</h4>
            <span className="actual_time">00:00</span>
          </Col>
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
              <Input.TextArea
                className="input-primary"
                value={reason}
                onChange={hanldeReeasonChange}
                rows={4}
                showCount
                maxLength={100}
              />
            </Form.Item>
          </Col>
        </div>
      </Form>
    </div>
  )
}

export default RegisterOverTime
