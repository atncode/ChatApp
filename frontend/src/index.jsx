import React from 'react';
import ReactDOM from 'react-dom/client';
import  './assets/styles.scss';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App.jsx'
import NotFoundPage from './components//NotFoundPage.jsx';
import Mainpage from './components/Mainpage.jsx';
import ChannelPage from './components/ChannelPage.jsx';
import store from './store/store.js';
import { RequireAuth } from './components/RequireAuth.jsx';
import SignupPage from './components/SignupPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><ChannelPage /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Mainpage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <div className="d-flex flex-column h-100">
        <App />
        <RouterProvider router={router} />
      </div>
    </Provider>
  // </React.StrictMode>
);
