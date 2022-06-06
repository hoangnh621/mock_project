import HomeScreen from '../components/HomeScreen/HomeScreen'
import LoginScreen from '../components/LoginScreen/LoginScreen'
import PageNotFound from '../components/PageNotFound/PageNotFound'
import ProfileScreen from '../components/ProfileScreen/ProfileScreen'
import WorkSheetScreen from '../components/WorkSheetScreen/WorkSheetScreen'

const publicRoutes = [
  { path: '', component: HomeScreen },
  { path: 'edit-profile', component: ProfileScreen },
  { path: 'worksheet', component: WorkSheetScreen },
]

const otherRoutes = [
  { path: 'login', component: LoginScreen },
  { path: '*', component: PageNotFound },
]

const privateRoutes = []
export { publicRoutes, privateRoutes, otherRoutes }
