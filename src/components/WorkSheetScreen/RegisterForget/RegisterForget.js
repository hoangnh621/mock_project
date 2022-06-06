import { Checkbox, Form, Input, Modal, TimePicker } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import RegisterForgetFooter from './RegisterForgetFooter'

// moment(new Date()).format('YYYY-MM-DD HH:mm')
function RegisterForget() {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const registrationDate = moment(new Date()).format('YYYY-MM-DD HH:mm')
  const registerForDate = moment(new Date()).format('YYYY-MM-DD')
  const format = 'HH:mm'
  const [checkin, setCheckin] = useState(moment('00:00', 'HH:mm'))
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <Modal
        width={'60%'}
        title="Register Forget Check-in/Check-out"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<RegisterForgetFooter onFinish={onFinish} />}
      >
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Registration date" name="Registration date">
            <Input defaultValue={registrationDate} bordered={false} />
          </Form.Item>
          <Form.Item label="Register for date" name="Register for date">
            <Input defaultValue={registerForDate} bordered={false} />
          </Form.Item>
          <Form.Item
            label="Checkin"
            name="Checkin"
            rules={[{ required: true, message: 'Can not empty' }]}
          >
            <TimePicker
              defaultValue={moment('00:00', format)}
              format={format}
            />
          </Form.Item>
          <Form.Item
            label="Checkout"
            name="Checkout"
            rules={[{ required: true, message: 'Can not empty' }]}
          >
            <TimePicker
              defaultValue={moment('00:00', format)}
              format={format}
            />
          </Form.Item>
          <Form.Item
            label="Special reason"
            name="special-reason"
            rules={[{ required: true, message: 'Can not empty' }]}
          >
            <Checkbox>Input error</Checkbox>;
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RegisterForget
