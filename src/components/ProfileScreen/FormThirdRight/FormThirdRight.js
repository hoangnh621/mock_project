import { Form, Input } from 'antd'
import React from 'react'
import { MESSAGE_REQUIRED } from '../../../common/message'

function FormThirdRight() {
  return (
    <Form.Item>
      <Form.Item
        label="Emergency Contact Name"
        name="emergencyContactName"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 70,
            message: "Can't more than 70 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Emergency Contact Relationship"
        name="emergencyContactRelationship"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 50,
            message: "Can't more than 50 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Emergency Contact Number"
        name="emergencyContactNumber"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          () => ({
            validator(_, value) {
              if (isNaN(value)) {
                return Promise.reject('Should be number!')
              }
              if (value.length > 20) {
                return Promise.reject("Can't be more than 20 digits!")
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Start Date" name="startDate">
        <Input readOnly />
      </Form.Item>
    </Form.Item>
  )
}

export default FormThirdRight
