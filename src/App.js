import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './components/HomeScreen/HomeScreen'
import LoginScreen from './components/LoginScreen/LoginScreen'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ProfileScreen from './components/ProfileScreen/ProfileScreen'
import WorkSheetScreen from './components/WorkSheetScreen/WorkSheetScreen'
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="edit-profile" element={<ProfileScreen />} />
          <Route path="worksheet" element={<WorkSheetScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
