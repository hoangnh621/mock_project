import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems'
import './Admin.scss'
import AdminMenu from './components/AdminMenu/AdminMenu'
import Header from './components/Header/Header'

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const role = getLocalStorageItem('role')
    if (role !== '1') {
      navigate('error-page')
    }
  })

  document.title = 'Admin'
  return (
    <div className="admin">
      <AdminMenu />
      <div className="admin-content">
        <div className="content">
          <Header />
          <div className="admin-function">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
