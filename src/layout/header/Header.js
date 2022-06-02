import {
  CaretDownOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from './avatar.png'
import './Header.scss'
import logo from './logo.png'
const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link className="logo-link" to="/">
          <div className="logo">
            <img src={logo} alt="logo" className="logo-image"></img>
            <div className="logo-name">Portal Relipa</div>
          </div>
        </Link>
        <div className="nav-links">
          <div className="wrap-link">
            <Link className="link" to="/">
              Home
            </Link>
            <div className="underline-link"></div>
          </div>
          <div className="wrap-link">
            <Link className="link" to="/">
              Timesheet
            </Link>
            <div className="underline-link"></div>
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-item">
          <div className="user-function">
            <div className="user-avatar">
              <img className="avatar" alt="avatar" src={avatar}></img>
            </div>
            <div
              className="down-arrow"
              onClick={() => setShowSubMenu(!showSubMenu)}
            >
              <CaretDownOutlined />
            </div>
          </div>
          <div className={showSubMenu ? 'sub-menu show' : 'sub-menu hide'}>
            <div className="sub-menu-items">
              <div className="sub-menu-item">
                <FormOutlined className="icon" />
                Change pass
              </div>
              <div className="sub-menu-item">
                <LogoutOutlined className="icon" />
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
