import { Avatar, Button, message, Upload } from 'antd'
import React from 'react'

function UserInfo() {
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'

      if (!isPNG && !isJPG) {
        message.error(`${file.name} should be a PNG or JPG file!`)
      } else {
        message.success(`Upload successfully`)
      }
      return isPNG || isJPG || Upload.LIST_IGNORE
    },
  }
  return (
    <div className="user-info">
      <div className="user-info-avatar">
        <div className="user-info-avatar-official">
          <Avatar shape="square" size={100} />
          <Upload {...props}>
            <Button size="small" type="primary">
              Upload avatar
            </Button>
          </Upload>
        </div>
        <div className="user-info-sub-avatar">
          <Avatar shape="square" size={60} />
          <Upload {...props}>
            <Button size="small" type="default">
              Upload
            </Button>
          </Upload>
        </div>
      </div>
      <div className="user-info-detail">
        <div>
          <label>Member Code:</label>
          <span>157</span>
        </div>
        <div>
          <label>Email:</label>
          <span>maithuy@gmail.com</span>
        </div>
        <div>
          <label>Name:</label>
          <span>Mai Thuy</span>
        </div>
        <div>
          <label>Phone number:</label>
          <span>+84 616565132</span>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
