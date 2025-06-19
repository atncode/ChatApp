import ReactDOM from 'react-dom/client'
import './assets/styles.scss'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import NotFoundPage from './components//NotFoundPage.jsx'
import Mainpage from './components/Mainpage.jsx'
import ChannelPage from './components/ChannelPage.jsx'
import store from './store/store.js'
import { RequireAuth } from './components/RequireAuth.jsx'
import SignupPage from './components/SignupPage.jsx'
import './i18next.js'
import { ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

const rollbarConfig = {
  accessToken: '2d8f0f7ba039433dbd6c6487d4ee2a40',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

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

const root = ReactDOM.createRoot(document.getElementById('chat'))
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <ToastContainer />
      <Provider store={store}>
        <div className="d-flex flex-column h-100">
          <App />
          <RouterProvider router={router} />
        </div>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
)
