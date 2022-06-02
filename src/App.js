import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../src/layout/Header/Header'
import { getLoginReplace } from './store/reducer/loginSlice'
import './styles/index.scss'

function App() {
  const navigate = useNavigate()
  const replace = useSelector(getLoginReplace)
  // Check accessToken and redirect to LoginScreen
  useEffect(() => {
    if (!replace) {
      navigate('/login')
    }
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
