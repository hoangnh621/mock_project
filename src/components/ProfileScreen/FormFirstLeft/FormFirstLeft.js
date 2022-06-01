import { DatePicker, Form, Input, Select } from 'antd'
import React from 'react'
import { MESSAGE_REQUIRED } from '../../../common/message'

const { Option } = Select

function FormFirstLeft() {
  return (
    <Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <Select>
          <Option value={0}>Female</Option>
          <Option value={1}>Male</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Birth Date"
        name="birth"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <DatePicker
          format="DD-MM-YYYY"
          disabledDate={(d) => !d || d.isAfter(new Date())}
          placement="bottomLeft"
        />
      </Form.Item>
      <Form.Item
        label="Identity Number"
        name="indentity"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          () => ({
            validator(_, value) {
              if (value?.length > 12) {
                return Promise.reject("Can't be more than 12 digits")
              }
              if (isNaN(value)) {
                return Promise.reject('Should be number!')
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date of issue identity"
        name="dateOfIdentity"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        label="Place of Issue Identity"
        name="placeOfIssueIdentity"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          () => ({
            validator(_, value) {
              if (value?.length > 50) {
                return Promise.reject("Can't be more than 50 digits")
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Passport number"
        name="passportNumber"
        rules={[
          {
            type: 'string',
            max: 20,
            message: "Can't be more than 20 digits",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Passport Expiration" name="passportExpiration">
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        label="Nationality"
        name="nationality"
        rules={[
          {
            required: true,
            message: 'Required',
          },
          {
            type: 'string',
            max: 50,
            message: "Can't be more than 50 digits",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form.Item>
  )
}

export default FormFirstLeft
