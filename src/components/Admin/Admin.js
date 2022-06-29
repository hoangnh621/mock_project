import { useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems'
import calculateComponentBottom from '../../utils/helpers/handleSize/calculateComponentBottom'
import './Admin.scss'
import AdminMenu from './components/AdminMenu/AdminMenu'
import Header from './components/Header/Header'

const Admin = () => {
  const navigate = useNavigate()
  const adminContainerRef = useRef()

  useEffect(() => {
    const role = getLocalStorageItem('role')
    if (role !== '1') {
      navigate('error-page')
    }
  })

  // Calculate admin container
  useEffect(() => {
    const ADMIN_CONTAINER_MARGIN = 28
    const headerAdmin = calculateComponentBottom('.admin-header')
    const windowHeight = window.innerHeight
    if (adminContainerRef.current) {
      adminContainerRef.current.style.height =
        windowHeight - headerAdmin - 2 * ADMIN_CONTAINER_MARGIN + 'px'
    }
  }, [])

  //Recalculate when resize
  useEffect(() => {
    const handleResize = () => {
      const ADMIN_CONTAINER_MARGIN = 28
      const headerAdmin = calculateComponentBottom('.admin-header')
      const windowHeight = window.innerHeight
      if (adminContainerRef.current) {
        adminContainerRef.current.style.height =
          windowHeight - headerAdmin - 2 * ADMIN_CONTAINER_MARGIN + 'px'
      }
    }
    document.addEventListener('resize', handleResize)
  }, [])

  document.title = 'Admin'
  return (
    <div className="admin">
      <AdminMenu />
      <div className="admin-content">
        <div className="content">
          <Header />
          <div className="admin-container" ref={adminContainerRef}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
