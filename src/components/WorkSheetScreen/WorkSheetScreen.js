import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../../store/reducer/auth/auth'

const WorkSheet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <div>
      WorkSheet
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default WorkSheet
