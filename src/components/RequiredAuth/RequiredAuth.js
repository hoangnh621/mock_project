import { Navigate, useLocation } from 'react-router-dom'

function RequiredAuth({ children }) {
  const user = localStorage.getItem('user')
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />
  }

  return children
}

export default RequiredAuth
