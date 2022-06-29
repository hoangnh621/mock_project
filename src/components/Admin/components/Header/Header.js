import {
  FieldTimeOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const srcAvatar = JSON.parse(localStorage.getItem('avatar'))
  const [showAdminSubMenu, setShowAdminSubMenu] = useState(false)
  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <div className="header-item">
          <NavLink to="/">
            <Tooltip
              title="Home"
              color="black"
              arrowPointAtCenter={true}
              overlayInnerStyle={{ borderRadius: '5px' }}
            >
              <HomeOutlined className="admin-icon" />
            </Tooltip>
          </NavLink>
        </div>
        <div className="header-item">
          <NavLink to="/worksheet">
            <Tooltip
              title="Time sheet"
              color="black"
              arrowPointAtCenter={true}
              overlayInnerStyle={{ borderRadius: '5px' }}
            >
              <FieldTimeOutlined className="admin-icon" />
            </Tooltip>
          </NavLink>
        </div>
      </div>
      <div
        className="admin-header-right"
        onClick={() => setShowAdminSubMenu(!showAdminSubMenu)}
      >
        <div className="admin-name header-item">
          <div>
            {localStorage.getItem('full_name')
              ? localStorage.getItem('full_name')
              : 'Unknown'}
          </div>
          <div className="kind">Admin</div>
        </div>
        <div className="admin-avatar header-item">
          {localStorage.getItem('avatar') === 'null' ? (
            <Avatar
              size={38}
              icon={<UserOutlined />}
              style={{
                color: '#7367f0',
                backgroundColor: '#eeedfd',
                marginLeft: 7,
                marginRight: 0,
              }}
            />
          ) : (
            <img className="avatar" alt="avatar" src={srcAvatar}></img>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
