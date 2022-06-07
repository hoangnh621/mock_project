import { Button, Form } from 'antd'
import React from 'react'

const RegisterForgetFooter = ({ onFinish }) => {
  return (
    <div className="register-forget-footer">
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={onFinish}>
          Submit
        </Button>
      </Form.Item>
    </div>
  )
}

export default RegisterForgetFooter
