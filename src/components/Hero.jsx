import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setQuery } from '../redux/features/searchSlice'
import { Search, ArrowRight, Camera, Video, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (text.trim()) {
            dispatch(setQuery(text))
            setText('')
        }
    }

    const features = [
        { icon: Camera, label: '10M+ Photos', color: '#00ff88' },
        { icon: Video, label: '2M+ Videos', color: '#00d4ff' }
    ]

    return (
        <div className='relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-[#0d0d0d]'>
            
            <div className='absolute inset-0 opacity-30 grid-bg'></div>

        
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#00ff88]/5 via-[#00d4ff]/5 to-[#ff00ea]/5 rounded-full blur-[150px]'></div>

          
            <div className='relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center'>
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight'
                >
                    Find the perfect
                    <br />
                    <span className='gradient-text'>visual content</span>
                </motion.h1>


                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-xl md:max-w-2xl mx-auto px-2'
                >
                    Access millions of stunning photos and videos from the world's best creators. All free to use.
                </motion.p>

                {/* Search Bar */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onSubmit={submitHandler}
                    className='relative max-w-xl md:max-w-2xl mx-auto mb-10 sm:mb-16 px-2'
                >
                    <div className='relative group'>
                        <div className='absolute -inset-1 bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#ff00ea] rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500'></div>
                        <div className='relative bg-[#1a1a1a] rounded-xl sm:rounded-2xl flex items-center border border-white/5'>
                            <Search className='absolute left-4 sm:left-5 text-gray-500' size={20} />
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className='w-full bg-transparent text-white text-base sm:text-lg pl-12 sm:pl-14 pr-28 sm:pr-40 py-4 sm:py-5 outline-none placeholder-gray-600 rounded-xl sm:rounded-2xl'
                                type="text"
                                placeholder='Search for anything...'
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='absolute right-2 bg-[#00ff88] hover:bg-[#00e67a] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base'
                            >
                                <span className='hidden sm:inline'>Search</span>
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </div>
                </motion.form>

                {/* features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-2'
                >
                    {features.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                            <div key={idx} className='flex items-center gap-2 sm:gap-3'>
                                <div
                                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center'
                                    style={{ background: `${feature.color}10` }}
                                >
                                    <Icon size={20} style={{ color: feature.color }} />
                                </div>
                                <span className='text-white font-medium text-sm sm:text-base'>{feature.label}</span>
                            </div>
                        )
                    })}
                </motion.div>

                {/* trending */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='mt-12 sm:mt-16 lg:mt-20 px-2'
                >
                    <p className='text-gray-600 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4'>Trending now</p>
                    <div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
                        {['Cyberpunk', 'AI Art', 'Minimalist', 'Retro', '3D Render', 'Abstract'].map((tag) => (
                            <motion.button
                                key={tag}
                                whileHover={{ scale: 1.05, borderColor: '#00ff88' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    dispatch(setQuery(tag.toLowerCase()))
                                }}
                                className='px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm'
                            >
                                {tag}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
