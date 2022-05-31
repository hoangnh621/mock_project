import { Form, Input } from 'antd'
import React from 'react'

function FormThirdLeft() {
  return (
    <Form.Item>
      <Form.Item
        label="Tax Identification"
        name="Tax Identification 1"
        rules={[
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
        label="Insurance Number"
        name="Insurance Number"
        rules={[
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
        label="Healthcare Provider"
        name="Healthcare Provider"
        rules={[
          {
            type: 'string',
            max: 30,
            message: "Can't be more than 30 digits!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tax Identification"
        name="Tax Identification 2"
        rules={[
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
    </Form.Item>
  )
}

export default FormThirdLeft
