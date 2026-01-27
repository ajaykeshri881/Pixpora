import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-[#0a0a0f] text-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
      </Routes>
    </div>
  )
}

export default App
