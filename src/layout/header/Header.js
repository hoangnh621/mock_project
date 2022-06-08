import {
  CaretDownOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../store/reducer/loginSlice'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'
import avatar from './avatar.png'
import ChangePassPopup from './ChangePassPopup/ChangePassPopup'
import './Header.scss'
import logo from './logo.png'
const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  const handleLogOut = () => {
    axiosPrivate.delete()
    localStorage.clear()
    dispatch(logout())
    navigate('/login')
  }

  const handleClickChangePass = () => {
    setShowSubMenu(false)
    setToggleModal(true)
  }

  return (
    <div className="navbar" id="header">
      <div className="navbar-left">
        <Link className="logo-link" to="/edit-profile">
          <div className="logo">
            <img src={logo} alt="logo" className="logo-image"></img>
            <div className="logo-name">Portal Relipa</div>
          </div>
        </Link>
        <div className="nav-links">
          <div className="wrap-link">
            <NavLink className="link" to="/">
              Home
            </NavLink>
            <div className="underline-link"></div>
          </div>
          <div className="wrap-link">
            <NavLink className="link" to="/timesheet">
              Timesheet
            </NavLink>
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
              <div className="sub-menu-item" onClick={handleClickChangePass}>
                <FormOutlined className="icon" />
                Change pass
              </div>
              <div className="sub-menu-item" onClick={handleLogOut}>
                <LogoutOutlined className="icon" />
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePassPopup
        setToggleModal={setToggleModal}
        toggleModal={toggleModal}
      />
    </div>
  )
}

export default Header
