import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#0d0d0d]'>

      {/* Grid background */}
      <div className='absolute inset-0 opacity-30 grid-bg'></div>

      {/* Ambient glow blobs */}
      <div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[120px] pointer-events-none'></div>
      <div className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ff00ea]/5 rounded-full blur-[120px] pointer-events-none'></div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00d4ff]/5 rounded-full blur-[100px] pointer-events-none'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center'>

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='relative select-none'
        >
          <span className='text-[180px] sm:text-[220px] md:text-[280px] font-bold leading-none tracking-tighter gradient-text'>
            404
          </span>
          {/* Ghost glow behind the number */}
          <span className='absolute inset-0 text-[180px] sm:text-[220px] md:text-[280px] font-bold leading-none tracking-tighter text-white opacity-5 blur-sm select-none pointer-events-none'>
            404
          </span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='w-24 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mb-8'
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed'
        >
          The page you're looking for doesn't exist or has been moved.
          <br className='hidden sm:block' />
          Let's get you back on track.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='flex flex-col sm:flex-row gap-4'
        >
          <Link
            to='/'
            className='group flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            to='/explore'
            className='group flex items-center gap-2 px-7 py-3.5 border border-white/10 text-white font-semibold rounded-full hover:border-[#00ff88]/40 hover:text-[#00ff88] hover:bg-[#00ff88]/5 transition-all duration-300'
          >
            <Search size={18} />
            Explore Media
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

export default NotFoundPage
