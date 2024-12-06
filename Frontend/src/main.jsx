import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store.js'

import { AuthLayout } from "./components/index.js"
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from "./pages/LoginPage.jsx"
import Home from './pages/Home.jsx'
import VideoPage from './pages/VideoPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "watch/:videoId",
        element: (
          <AuthLayout authentication>
            {" "}
            <VideoPage />
          </AuthLayout>
        ),
      },
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)