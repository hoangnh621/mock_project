import { useEffect } from 'react'

const HomeScreen = () => {
  useEffect(() => {
    document.title = 'Home'
  }, [])
  return <div>HomeScreen</div>
}

export default HomeScreen
