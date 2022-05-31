import { Form, Input, Select } from 'antd'
import React from 'react'
import { MESSAGE_REQUIRED } from '../../../common/message'

const { Option } = Select

function FormFirstRight() {
  return (
    <Form.Item>
      <Form.Item label="Nick name" name="nickName">
        <Input />
      </Form.Item>
      <Form.Item
        label="Other email"
        name="otherEmail"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'email',
            message: 'Should be a email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Skype"
        name="skype"
        rules={[
          {
            type: 'string',
            max: 30,
            message: "Can't be more than 30 digits",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Facebook" name="facebook">
        <Input />
      </Form.Item>
      <Form.Item
        label="Bank Name"
        name="bankName"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 70,
            message: "Can't be more than 70 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Bank Account"
        name="bankAccount"
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
      <Form.Item
        label="Marital Status"
        name="maritalStatus"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <Select>
          <Option value={1}>Single</Option>
          <Option value={2}>Married</Option>
          <Option value={3}>Divorced</Option>
          <Option value={4}>Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Academic Level"
        name="academicLevel"
        rules={[
          {
            type: 'string',
            max: 50,
            message: "Can't be more than 50 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form.Item>
  )
}

export default FormFirstRight
