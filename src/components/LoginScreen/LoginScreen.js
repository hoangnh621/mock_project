import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'
import LoginImage from './LoginImage.png'
import './LoginScreen.scss'

const LoginScreen = () => {
  return (
    <Row className="loginScreen">
      <Col span={16} className="loginImg">
        <div>
          <img src={LoginImage} alt="LoginImage" />
        </div>
      </Col>
      <Col span={8} className="loginFormArea">
        <div className="wrapForm">
          <h3>Welcome to Relipa Portal! &#128075;</h3>
          <p>Please login to your account and get started</p>
          <Form layout="vertical" labelAlign="left">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Email is not valid',
                },
              ]}
            >
              <Input className="inputChangePass" size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: /(^\S*$)/g,
                  message: 'Passwords do not contain spaces',
                },
              ]}
            >
              <Input.Password className="inputChangePass" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                block
                className="primaryButton"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default LoginScreen
