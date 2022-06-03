import { useEffect } from 'react'
import getToken from '../helpers/handleLocalStorageItems/getLocalStorageItem'
import axiosInstance from './axiosInstance'

const useAxiosPrivate = () => {
  useEffect(() => {
    axiosInstance.interceptors.request.use(
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
  }, [])
  return axiosInstance
}

export default useAxiosPrivate
