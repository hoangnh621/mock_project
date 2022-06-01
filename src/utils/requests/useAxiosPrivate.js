import { useEffect } from 'react'
import getToken from '../helpers/handleLocalStorageItems/getLocalStorageItem'
import axiosInstance from './axiosInstance'

const useAxiosPrivate = () => {
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (configs) => {
        const accessToken = getToken('accessToken')
        if (accessToken) {
          configs.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return configs
      },
      (error) => {
        Promise.reject(error)
      },
    )
    return () => axiosInstance.interceptors.reject(requestInterceptor)
  }, [])
  return axiosInstance
}

export default useAxiosPrivate
