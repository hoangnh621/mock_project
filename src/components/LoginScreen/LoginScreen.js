import { Button, Col, Form, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import data from '../../mockdatas/db.json'
import {
  getLoginError,
  getLoginLoading,
  getLoginReplace,
  login,
} from '../../store/reducer/loginSlice'
import LoginImage from './LoginImage.png'
import './LoginScreen.scss'

console.log(data)

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(getLoginLoading)
  const error = useSelector(getLoginError)
  const replace = useSelector(getLoginReplace)
  const handleLogin = () => {
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (replace) {
      navigate('/')
    }
  }, [navigate, replace])
  return (
    <Row className="loginScreen">
      <Col
        xs={{ span: 0 }}
        md={{ span: 14 }}
        lg={{ span: 16 }}
        className="loginImg"
      >
        <div>
          <img src={LoginImage} alt="LoginImage" />
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 10 }}
        lg={{ span: 8 }}
        className="loginFormArea"
      >
        <div className="wrapForm">
          <h3>Welcome to Relipa Portal! &#128075;</h3>
          <p>Please login to your account and get started</p>
          {error && <p>Incorrect email or password</p>}
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
              <Input
                className="inputPrimary"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <Input.Password
                className="inputPrimary"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                block
                className="primaryButton"
                size="large"
                loading={loading}
                onClick={handleLogin}
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
