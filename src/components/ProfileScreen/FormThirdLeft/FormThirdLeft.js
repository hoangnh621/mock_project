import { Form, Input } from 'antd'
import React from 'react'

function FormThirdLeft() {
  return (
    <Form.Item>
      <Form.Item
        label="Tax Identification"
        name="tax_identification"
        rules={[
          () => ({
            validator(_, value) {
              if (value) {
                if (isNaN(value)) {
                  return Promise.reject('Should be number!')
                }
                if (value.length > 20) {
                  return Promise.reject("Can't be more than 20 digits!")
                }
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Insurance Number"
        name="insurance_number"
        rules={[
          () => ({
            validator(_, value) {
              if (value) {
                if (isNaN(value)) {
                  return Promise.reject('Should be number!')
                }
                if (value.length > 20) {
                  return Promise.reject("Can't be more than 20 digits!")
                }
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Healthcare Provider"
        name="healthcare_provider"
        rules={[
          {
            type: 'string',
            max: 30,
            message: "Can't be more than 30 digits!",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
    </Form.Item>
  )
}

export default FormThirdLeft
