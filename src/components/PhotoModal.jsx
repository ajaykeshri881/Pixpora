import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Download, ExternalLink, User, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice'
import { toast } from 'react-toastify'

const PhotoModal = ({ photo, isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { items } = useSelector((store) => store.collection)
    const [imageLoaded, setImageLoaded] = useState(false)

    const isSaved = items.some(i => i.id === photo?.id)

    // Reset loading state when photo changes
    useEffect(() => {
        setImageLoaded(false)
    }, [photo?.id])

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const handleSave = () => {
        if (isSaved) {
            dispatch(removeFromCollection(photo.id))
            toast.info('Removed from favorites')
        } else {
            dispatch(addToCollection(photo))
            toast.success('Added to favorites!')
        }
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(photo.src)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `pixpora-${photo.id}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Download started!')
        } catch (error) {
            toast.error('Download failed')
        }
    }

    if (!photo) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto'
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className='relative max-w-5xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl my-4'
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors'
                        >
                            <X size={24} />
                        </button>

                        {/* Photo - Original Aspect Ratio */}
                        <div className='relative w-full flex items-center justify-center bg-[#0d0d0d] min-h-[200px]'>
                            {/* Loading spinner */}
                            {!imageLoaded && (
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <Loader2 size={40} className='text-[#00ff88] animate-spin' />
                                </div>
                            )}
                            <img
                                src={photo.src || photo.thumbnail}
                                alt={photo.title}
                                onLoad={() => setImageLoaded(true)}
                                className={`max-w-full max-h-[70vh] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        </div>

                        {/* Info & Actions */}
                        <div className='p-6'>
                            {/* Title */}
                            <h3 className='text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2'>
                                {photo.title || 'Untitled Photo'}
                            </h3>

                            {/* Photographer */}
                            {photo.photographer && (
                                <div className='flex items-center gap-2 text-gray-400 mb-6'>
                                    <User size={16} />
                                    <span>by {photo.photographer}</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className='flex flex-wrap gap-3'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${isSaved
                                            ? 'bg-[#ff00ea] text-white'
                                            : 'bg-white/10 hover:bg-white/20 text-white'
                                        }`}
                                >
                                    <Heart size={20} className={isSaved ? 'fill-current' : ''} />
                                    {isSaved ? 'Saved' : 'Favorite'}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDownload}
                                    className='download-btn flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ff88] text-black font-semibold'
                                >
                                    <Download size={20} />
                                    Download
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.open(photo.url, '_blank')}
                                    className='flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors'
                                >
                                    <ExternalLink size={20} />
                                    Go to Source
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PhotoModal
