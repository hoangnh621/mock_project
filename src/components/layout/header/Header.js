import { CloseOutlined, MoreOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import logo from './logo.png'

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false)
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Loading"></img>
        <div className="logo-name">Relica Portal</div>
      </div>
      <div className="header-function">
        <ul className="header-navbar">
          <li>
            <Link className="link" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/timesheet">
              Timesheet
            </Link>
          </li>
          <li>My Leave</li>
        </ul>
        <ul className="user-action">
          <li className="header-welcome">Welcome Vũ Văn Tịnh</li>
          <li>
            <Link className="link" to="/changephase">
              Change phase
            </Link>
          </li>
          <li>Log out</li>
        </ul>
        <MoreOutlined className="more" onClick={() => setShowSideBar(true)} />
        <ul
          className={
            showSideBar
              ? 'user-action-sidebar show'
              : 'user-action-sidebar hide'
          }
        >
          <CloseOutlined
            className="sidebar-close"
            onClick={() => setShowSideBar(false)}
          />
          <li className="header-welcome">Welcome Vũ Văn Tịnh</li>
          <li>
            <Link className="link" to="/changephase">
              Change phase
            </Link>
          </li>
          <li>
            Log out <span className="logout-icon"></span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
