import HomeScreen from '../components/HomeScreen/HomeScreen'
import LoginScreen from '../components/LoginScreen/LoginScreen'
import ManagerScreen from '../components/ManagerScreen/ManagerScreen'
import PageNotFound from '../components/PageNotFound/PageNotFound'
import Profile from '../components/ProfileScreen/ProfileScreen'
import WorkSheetScreen from '../components/WorkSheetScreen/WorkSheetScreen'

const publicRoutes = []

const otherRoutes = [
  { path: 'login', component: LoginScreen },
  { path: '*', component: PageNotFound },
  { path: 'edit-profile', component: Profile },
]

const privateRoutes = [
  { path: '', component: HomeScreen },
  { path: 'worksheet', component: WorkSheetScreen },
  { path: 'manager', component: ManagerScreen },
]
export { publicRoutes, privateRoutes, otherRoutes }
