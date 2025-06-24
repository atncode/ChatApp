import ReactDOM from 'react-dom/client'
import './assets/styles.scss'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import store from './store/store.js'
import './i18next.js'
import { ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import router from './router.jsx'

const rollbarConfig = {
  accessToken: '2d8f0f7ba039433dbd6c6487d4ee2a40',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

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
