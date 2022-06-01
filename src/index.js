import 'antd/dist/antd.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import HomeScreen from './components/HomeScreen/HomeScreen'
import LoginScreen from './components/LoginScreen/LoginScreen'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ProfileScreen from './components/ProfileScreen/ProfileScreen'
import WorkSheetScreen from './components/WorkSheetScreen/WorkSheetScreen'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeScreen />} />
            <Route path="edit-profile" element={<ProfileScreen />} />
            <Route path="worksheet" element={<WorkSheetScreen />} />
          </Route>
          <Route path="login" element={<LoginScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
