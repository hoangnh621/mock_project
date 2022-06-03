import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../src/layout/Header/Header'
import './styles/index.scss'
import getLocalStorageItem from './utils/helpers/handleLocalStorageItems/getLocalStorageItem'
function App() {
  const navigate = useNavigate()
  const accessToken = getLocalStorageItem('accessToken')
  // Check accessToken and redirect to LoginScreen
  useEffect(() => {
    // if (!replace) {
    //   navigate('/login')
    // }
  }, [navigate, replace])

  return (
    <div className="App">
      <Header />
      App
      <Outlet />
    </div>
  )
}

export default App
