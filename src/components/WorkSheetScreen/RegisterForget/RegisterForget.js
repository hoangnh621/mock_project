import { Col, Modal, Row, TimePicker } from 'antd'
import 'antd/dist/antd.min.css'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import React, { useState } from 'react'
import './RegisterForget.scss'
import RegisterForgetFooter from './RegisterForgetFooter'

const RegisterForget = () => {
  const [checkinTime, setCheckinTime] = useState('00:00')
  const [checkoutTime, setCheckoutTime] = useState('00:00')
  const [specialReason, setSpecialReason] = useState([])
  const [reason, setReason] = useState('')
  const [visible, setVisible] = useState(true) // State của component cha
  const format = 'HH:mm'
  console.log(specialReason)
  const handleCheckinChange = (value) => {
    value && setCheckinTime(value.format('HH:mm'))
  }
  const handleCheckoutChange = (value) => {
    value && setCheckoutTime(value.format('HH:mm'))
  }
  const handleSpecialReasonChange = (e) => {
    if (specialReason.includes(e.target.value))
      setSpecialReason(specialReason.filter((item) => item !== e.target.value))
    else setSpecialReason((prev) => [...prev, e.target.value])
  }
  const handleReasonChange = (e) => {
    e.target.value && setReason(e.target.value)
  }

  return (
    <div className="register-forget">
      <Modal
        footer={<RegisterForgetFooter setVisible={setVisible} />}
        title="Register Forget Check-in/Check-out"
        centered={true}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        okText="Register"
        cancelText="Cancel"
      >
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={8} lg={5}>
            <div>Registration date:</div>
          </Col>
          <Col xs={16} lg={19}>
            <div>{moment(new Date()).format('YYYY-MM-DD HH:mm')}</div>
          </Col>
          <Col xs={8} lg={5}>
            <div>Registor for date:</div>
          </Col>
          <Col xs={16} lg={19}>
            <div>{moment(new Date()).format('YYYY-MM-DD')}</div>
          </Col>
          <Col xs={8} lg={5}>
            <div>Check in:</div>
          </Col>
          <Col xs={16} lg={19}>
            <div>
              <TimePicker
                onChange={handleCheckinChange}
                format={format}
                value={moment(checkinTime, format)}
              />
            </div>
          </Col>
          <Col xs={8} lg={5}>
            <div>Check out:</div>
          </Col>
          <Col xs={16} lg={19}>
            <div>
              {' '}
              <TimePicker
                onChange={handleCheckoutChange}
                format={format}
                value={moment(checkoutTime, format)}
              />
            </div>
          </Col>
          <Col xs={8} lg={5}>
            <div>Special reason</div>
          </Col>
          <Col xs={16} lg={19}>
            <div className="register-forget-checkboxs">
              <div>
                <input
                  type="checkbox"
                  name="check-in"
                  onChange={handleSpecialReasonChange}
                  value="Check-in not counted as error"
                  id="checkin"
                />{' '}
                <label htmlFor="checkin" style={{ marginRight: '20px' }}>
                  Check-in not counted as error
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="check-out"
                  onClick={handleSpecialReasonChange}
                  value="Check-out not counted as error"
                  id="checkout"
                />{' '}
                <label htmlFor="checkout">Check-out not counted as error</label>
              </div>
            </div>
          </Col>
          <Col xs={8} lg={5}>
            <div>Reason</div>
          </Col>
          <Col xs={16} lg={19}>
            <div>
              <TextArea value={reason} onChange={handleReasonChange} />
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default RegisterForget
