import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './components/HomeScreen/HomeScreen'
import ProfileScreen from './components/ProfileScreen/ProfileScreen'
import WorkSheetScreen from './components/WorkSheetScreen/WorkSheetScreen'
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="editprofile" element={<ProfileScreen />} />
          <Route path="worksheet" element={<WorkSheetScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
