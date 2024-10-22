import React from 'react'
import { Header } from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <Header />
      <Outlet />
  </div>
  )
}

export default App
