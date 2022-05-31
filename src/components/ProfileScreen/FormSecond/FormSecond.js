import { Form, Input } from 'antd'
import React from 'react'
import { MESSAGE_REQUIRED } from '../../../common/message'
function FormSecond() {
  return (
    <Form.Item>
      <Form.Item
        label="Permanent Address"
        name="permanentAddress"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 255,
            message: "Can't be more than 255 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Temporary Address"
        name="temporaryAddress"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 255,
            message: "Can't be more than 255 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form.Item>
  )
}

export default FormSecond
