import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormFirstLeft from './FormFirstLeft/FormFirstLeft'
import FormFirstRight from './FormFirstRight/FormFirstRight'
import FormSecond from './FormSecond/FormSecond'
import FormThirdLeft from './FormThirdLeft/FormThirdLeft'
import FormThirdRight from './FormThirdRight/FormThirdRight'
import './profile.scss'
import UserInfo from './UserInfo/UserInfo'

const Profile = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  const handleError = (err) => {
    console.log(err)
  }
  useEffect(() => {
    document.title = 'Edit Profile'
  })
  return (
    <>
      <Modal
        className="edit-profile-pop-up"
        visible
        title="My profile"
        footer={null}
      >
        <UserInfo />
        <div className="user-info-form">
          <Form
            name="userInfo"
            initialValues={{
              gender: 0,
              Marital: 1,
              startDate: '25/12/2022',
            }}
            scrollToFirstError
            onFinish={handleSubmit}
            onFinishFailed={handleError}
          >
            <div className="user-info-form-first">
              {/* Left */}
              <FormFirstLeft />
              {/* Right */}
              <FormFirstRight />
            </div>
            <div className="user-info-form-second">
              <FormSecond />
            </div>
            <div className="user-info-form-third">
              <FormThirdLeft />
              <FormThirdRight />
            </div>
            <div className="btn-submit">
              <Form.Item>
                <Button>Return</Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default Profile
