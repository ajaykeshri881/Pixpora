import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Download, ExternalLink, User, Loader2, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice'
import { toast } from 'react-toastify'

const MediaModal = ({ item, isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { items } = useSelector((store) => store.collection)
    const [mediaLoaded, setMediaLoaded] = useState(false)

    const isSaved = items.some(i => i.id === item?.id)

    // Reset loading state when item changes
    useEffect(() => {
        setMediaLoaded(false)
    }, [item?.id])

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
            dispatch(removeFromCollection(item.id))
            toast.info('Removed from favorites')
        } else {
            dispatch(addToCollection(item))
            toast.success('Added to favorites!')
        }
    }

    const handleDownload = async () => {
        try {
            const downloadSource = item.downloadUrl || item.src
            const response = await fetch(downloadSource)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            const ext = item.type === 'video' ? 'mp4' : 'jpg'
            link.download = `pixpora-${item.id}.${ext}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Download started!')
        } catch (error) {
            toast.error('Download failed')
        }
    }

    if (!item) return null

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
                        className='relative w-full max-w-lg sm:max-w-2xl md:max-w-4xl bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto'
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors'
                        >
                            <X size={24} />
                        </button>

                        {/* Media Container - constrained height */}
                        <div className='relative w-full flex items-center justify-center bg-black max-h-[55vh]'>
                            {/* Loading spinner */}
                            {!mediaLoaded && (
                                <div className='absolute inset-0 flex items-center justify-center z-20'>
                                    <Loader2 size={40} className='text-[#00ff88] animate-spin' />
                                </div>
                            )}

                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    controls
                                    autoPlay
                                    onLoadedData={() => setMediaLoaded(true)}
                                    className='w-full h-full max-h-[55vh] object-contain'
                                />
                            ) : (
                                <img
                                    src={item.src || item.thumbnail}
                                    alt={item.title}
                                    onLoad={() => setMediaLoaded(true)}
                                    className={`max-w-full max-h-[55vh] object-contain ${mediaLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                                />
                            )}
                        </div>

                        {/* Compact Info & Actions */}
                        <div className='p-4 bg-[#1a1a1a]'>
                            {/* Title Row */}
                            <div className='flex items-center justify-between mb-3'>
                                <div className='flex-1 min-w-0'>
                                    <h3 className='text-lg font-bold text-white truncate'>
                                        {item.title || 'Untitled'}
                                    </h3>
                                    {item.photographer && (
                                        <p className='text-gray-400 text-sm flex items-center gap-1'>
                                            <User size={14} className='text-[#00ff88]' />
                                            {item.photographer}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons - Horizontal Row */}
                            <div className='flex gap-2'>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSave}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm ${isSaved
                                        ? 'bg-red-500/20 text-red-500'
                                        : 'bg-white/10 text-white'
                                        }`}
                                >
                                    {isSaved ? <Trash2 size={18} /> : <Heart size={18} />}
                                    {isSaved ? 'Remove' : 'Save'}
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownload}
                                    className='flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00ff88] text-black font-bold text-sm'
                                >
                                    <Download size={18} />
                                    Download
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open(item.url, '_blank')}
                                    className='px-4 py-3 rounded-xl bg-white/10 text-white'
                                    title="Open Source"
                                >
                                    <ExternalLink size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MediaModal
