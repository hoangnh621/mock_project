/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
  const navigate = useNavigate()
  const token = ''
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])
  return <div>HomeScreen Page</div>
}

export default HomeScreen
