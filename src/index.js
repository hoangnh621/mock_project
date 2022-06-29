import 'antd/dist/antd.min.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Admin from './components/Admin/Admin'
import ManagerUser from './components/Admin/components/ManagerUser/ManagerUser'
import Import from './components/Admin/pages/Import/Import'
import Notice from './components/Admin/pages/Notice/Notice'
import Request from './components/Admin/pages/Request/Request'
import { otherRoutes, privateRoutes } from './routes'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {privateRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Route>
        {otherRoutes.map((route, index) => {
          const Page = route.component
          return <Route key={index} path={route.path} element={<Page />} />
        })}

        <Route path="admin" element={<Admin />}>
          <Route index element={<Request />} />
          <Route path="import" element={<Import />} />
          <Route path="notice" element={<Notice />} />
          <Route path="manager-user" element={<ManagerUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
)
