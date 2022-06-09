import { useEffect } from 'react'
import Favicon from 'react-favicon'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../src/layout/header/logo.png'
import Header from './layout/header/Header'
import './styles/index.scss'
import getLocalStorageItem from './utils/helpers/handleLocalStorageItems/getLocalStorageItem'

function App() {
  const navigate = useNavigate()
  const accessToken = getLocalStorageItem('accessToken')
  // Check accessToken and redirect to LoginScreen
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [navigate, accessToken])

  return (
    <div className="App">
      <Favicon url={logo} />
      <Header />
      App
      <Outlet />
    </div>
  )
}

export default App
