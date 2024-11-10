import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store.js'

import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import VideoGalleryPage from './pages/VideoGalleryPage.jsx'
import WatchHistoryPage from './pages/WatchHistoryPage.jsx'
import VideoDetailsPage from './pages/VideoDetailsPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <VideoGalleryPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "watch/:videoId",
        element: <VideoDetailsPage />,
      },
      {
        path: "watch-history",
        element: <WatchHistoryPage />,
      },
      {
        path: "channel/:username",
        element: <ChannelPage />,
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
