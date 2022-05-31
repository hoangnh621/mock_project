import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './styles/index.scss'
import getLocalStorageItem from './utils/helpers/handleLocalStorageItems/getLocalStorageItem'

function App() {
  const navigate = useNavigate()
  // Check accessToken and redirect to LoginScreen
  localStorage.setItem('accessToken', 'demoLogin')
  useEffect(() => {
    const accessToken = getLocalStorageItem('accessToken')
    if (!accessToken) {
      navigate('/login')
    }
  })

  return (
    <div className="App">
      App
      <Outlet />
    </div>
  )
}

export default App
