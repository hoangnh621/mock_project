import { Button, Col, Form, Input, Modal, Row, TimePicker } from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
// import { useDispatch, useSelector } from 'react-redux'
import XIcon from '../../../../common/XIcon/XIcon'
import '../../../../styles/index.scss'
import './RegisterOverTime.scss'

function RegisterOverTime({ isOverTimeVisible, setIsOverTimeVisible }) {
  const registrationDate = moment(new Date()).format('DD/MM/YYYY HH:mm')
  const registerForDate = moment(new Date()).format('DD/MM/YYYY ')
  const checkInTime = '09:00'
  const checkOutTime = '17:00'
  const actualOverTime = '00:40'
  // console.log(visible)
  // const [overTime, setOverTime] = useState([])
  // const [reason, setReason] = useState([])

  // const hanldeCheckOverTime = (value) => {
  //   value && setOverTime(value.format('HH:mm'))
  // }

  // const hanldeReeasonChange = (e) => {
  //   setReason(e.target.value)
  // }
  const timeFormat = 'HH:mm'

  const config = {
    rules: [
      {
        required: true,
        message: 'Please select time!',
      },
    ],
  }
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // const checkOutNumber = Number(changeTimeToMint(checkOutTime))
  // const actualOverTimeNumber =  ()
  // const dispatch = useDispatch()
  // const loadingSubmit = useSelector(getSubmitOverTimeLoading)

  // const onFinish = (values) => {
  //   const newRequest = {
  //     created_at: moment().format('DD/MM/YYYY HH:mm'),
  //     request_type: 5,
  //     request_for_date: changeFormatDate(registerForDate),
  //     check_in: checkInTime,
  //     check_out: checkOutTime,
  //     //  compensation_date: changeFormatDate(
  //     //    values[''].format('DD/MM/YYYY'),
  //     //  ),
  //     //  compensation_time: '',
  //     reason: values['reason'],
  //   }
  //   console.log(newRequest)
  //   dispatch(submitOverTime(newRequest))
  //   setIsOverTimeVisible(false)
  // }
  // const deleteRequest = () => {
  //   const deleteRequest = {
  //     request_type: 5,
  //     request_for_date: registerForDate,
  //     action: 'delete',
  //   }
  //   console.log(deleteRequest)
  // }

  return (
    <>
      <Modal
        title="Register OT"
        visible={isOverTimeVisible}
        onCancel={() => setIsOverTimeVisible(false)}
        width="70%"
        closeIcon={<XIcon />}
        className="modal_ot"
        footer={false}
      >
        <div className="container">
          <Form
            initialValues={{
              registration_date: registrationDate,
              register_for_date: registerForDate,
              reason: 'Khách hàng request OT để deploy hệ thống',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Form.Item name="registration_date">
                <Row>
                  <Col>
                    <h4 className="w-140 mr-20">Registration date:</h4>
                  </Col>
                  <Col>
                    <p>{registrationDate}</p>
                  </Col>
                </Row>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="register_for_date">
                <Row>
                  <Col>
                    <h4 className="w-140 mr-20">Register for date:</h4>
                  </Col>
                  <Col>
                    <p className="date">{registerForDate}</p>
                  </Col>
                </Row>
              </Form.Item>
            </Row>

            <Row className="item">
              <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
                <h4 className="w-140 mr-20">Check-in:</h4>
                <span className="time_check">{checkInTime}</span>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
                <h4 className="col-order-2 mr-20">Check-out:</h4>
                <span className="time_check">{checkOutTime}</span>
              </Col>
            </Row>
            <Row className="item">
              <Col xs={{ span: 24 }} lg={{ span: 5 }}>
                {/* <Row className="item"> */}
                {/* <div className="w-140 "> */}
                <h4>Request OT :</h4>
                {/* </div> */}
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                <Form.Item name="request_OT" {...config}>
                  <TimePicker
                    // onChange={hanldeCheckOverTime}
                    value={moment('00:00', timeFormat)}
                    format={timeFormat}
                  />
                </Form.Item>
              </Col>
              {/* </Row> */}
              <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
                <h4 className="w-140">Actual Overtime:</h4>
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
                <h5 className="ml-20">
                  Ví dụ: Ca làm việc 08:00 AM đến 17:00 PM, thì thời gian bắt
                  đầu tính OT là 18:00 PM
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
                    // value={reason}
                    // onChange={hanldeReeasonChange}
                    rows={4}
                  />
                </Form.Item>
              </Col>
            </div>
            <div className="btn-register">
              <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
                <Button className="primary-button " htmlType="submit">
                  Register
                </Button>
                <Button
                  onClick={() => setIsOverTimeVisible(false)}
                  className="outline-primary-button "
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default RegisterOverTime
