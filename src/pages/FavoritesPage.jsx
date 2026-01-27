import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCollection } from '../redux/features/CollectionSlice'
import ResultCard from '../components/ResultCard'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import { Heart, Trash2, Download, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const FavoritesPage = () => {
    const dispatch = useDispatch()
    const { items } = useSelector((store) => store.collection)

    const handleClearAll = () => {
        dispatch(clearCollection())
        toast.info('All favorites cleared')
    }

    const handleDownloadAll = async () => {
        if (items.length === 0) return

        toast.info(`Downloading ${items.length} items...`)

        for (const item of items) {
            try {
                const response = await fetch(item.src)
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                const ext = item.type === 'video' ? 'mp4' : item.type === 'gif' ? 'gif' : 'jpg'
                link.download = `pixpora-${item.id}.${ext}`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
                await new Promise(resolve => setTimeout(resolve, 500))
            } catch (error) {
                console.error('Download error:', error)
            }
        }

        toast.success('Downloads complete!')
    }

    return (
        <div className='pt-28 min-h-screen grid-bg'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'
                >
                    <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff00ea] to-[#00d4ff] flex items-center justify-center'>
                            <Heart className='text-white' size={28} />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>My Favorites</h1>
                            <p className='text-gray-500'>{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
                        </div>
                    </div>

                    {items.length > 0 && (
                        <div className='flex gap-3'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDownloadAll}
                                className='flex items-center gap-2 bg-[#00ff88] hover:bg-[#00e67a] px-5 py-3 rounded-xl text-black font-semibold transition-all'
                            >
                                <Download size={18} />
                                Download All
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleClearAll}
                                className='flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-5 py-3 rounded-xl text-red-400 font-medium transition-all'
                            >
                                <Trash2 size={18} />
                                Clear All
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                {/* Content */}
                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='text-center py-24'
                    >
                        <div className='w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#ff00ea]/20 to-[#00d4ff]/20 flex items-center justify-center'>
                            <Sparkles className='text-[#ff00ea]' size={40} />
                        </div>
                        <h2 className='text-2xl font-bold text-white mb-3'>No favorites yet</h2>
                        <p className='text-gray-500 max-w-md mx-auto mb-8'>
                            Start exploring and save the visuals you love. They'll all appear here for easy access.
                        </p>
                        <Link to="/explore">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='bg-[#00ff88] hover:bg-[#00e67a] text-black px-8 py-3.5 rounded-xl font-semibold transition-all'
                            >
                                Start Exploring
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 pb-12'>
                        <AnimatePresence>
                            {items.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.03 }}
                                >
                                    <ResultCard item={item} showDelete={true} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default FavoritesPage
