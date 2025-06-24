import { createBrowserRouter } from 'react-router'
import RequireAuth from './components/RequireAuth.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import Mainpage from './pages/Mainpage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><ChannelPage /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Mainpage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
