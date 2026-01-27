import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, Compass, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { items } = useSelector((store) => store.collection)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/favorites', label: 'Favorites', icon: Heart, count: items.length }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className='fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 bg-[#0d0d0d]'
    >
      <div className='max-w-7xl mx-auto flex justify-between items-center bg-[#161616] backdrop-blur-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 border border-white/5'>
    
        <Link to='/' className='flex items-center'>
          <span className='text-xl sm:text-2xl font-bold gradient-text'>Pixpora</span>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-1 bg-[#1a1a1a] rounded-full p-1.5'>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full transition-all duration-300 ${isActive
                      ? 'bg-[#00ff88] text-black font-semibold'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Icon size={18} />
                  <span className='hidden lg:inline'>{item.label}</span>
                  {item.count > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-[#00ff88]/20 text-[#00ff88]'
                      }`}>
                      {item.count}
                    </span>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* Mobile Nav */}
        <div className='flex md:hidden items-center gap-1 bg-[#1a1a1a] rounded-full p-1'>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${isActive
                      ? 'bg-[#00ff88] text-black'
                      : 'text-gray-400'
                    }`}
                >
                  <Icon size={18} />
                  {item.count > 0 && (
                    <span className='absolute -top-1 -right-1 w-4 h-4 bg-[#ff00ea] text-white text-[10px] rounded-full flex items-center justify-center'>
                      {item.count}
                    </span>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
