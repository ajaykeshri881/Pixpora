import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMountainVideos } from '../api/mediaApi'
import { Compass, ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice'
import { setQuery, setActiveTabs } from '../redux/features/searchSlice'
import { toast } from 'react-toastify'
import { Heart, Download, ExternalLink, Loader2 } from 'lucide-react'

const MountainVideos = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [videoLoading, setVideoLoading] = useState(true)
    const carouselRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items } = useSelector((store) => store.collection)

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const data = await fetchMountainVideos(1, 12)
                const formattedVideos = data.map((item) => ({
                    id: item.id,
                    type: 'video',
                    title: item.url?.split('/').pop()?.replace(/-/g, ' ') || 'Adventure Video',
                    thumbnail: item.image,
                    src: item.video_files?.find(f => f.quality === 'sd')?.link || item.video_files?.[0]?.link,
                    url: item.url,
                    photographer: item.user?.name
                }))
                setVideos(formattedVideos)
            } catch (error) {
                console.error('Error loading adventure videos:', error)
            } finally {
                setLoading(false)
            }
        }
        loadVideos()
    }, [])

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 320
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const isSaved = (id) => items.some(i => i.id === id)

    const handleSave = (e, video) => {
        e.stopPropagation()
        if (isSaved(video.id)) {
            dispatch(removeFromCollection(video.id))
            toast.info('Removed from favorites')
        } else {
            dispatch(addToCollection(video))
            toast.success('Added to favorites!')
        }
    }

    const handleDownload = async (e, video) => {
        e.stopPropagation()
        try {
            const response = await fetch(video.src)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `pixpora-${video.id}.mp4`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Download started!')
        } catch (error) {
            toast.error('Download failed')
        }
    }

    const openModal = (video) => {
        setSelectedVideo(video)
        setModalOpen(true)
        setVideoLoading(true)
    }

    if (loading) {
        return (
            <section className='py-12 sm:py-16 px-4 sm:px-6 bg-[#0d0d0d]'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex gap-4 overflow-hidden'>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className='flex-shrink-0 w-60 sm:w-72 aspect-[3/4] rounded-2xl shimmer'></div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className='py-12 sm:py-16 px-4 sm:px-6 bg-[#0d0d0d]'>
                <div className='max-w-7xl mx-auto'>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center'>
                                <Compass className='text-[#ff6b6b]' size={22} />
                            </div>
                            <div>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
                                    Adventure <span className='text-[#ff6b6b]'>Videos</span>
                                </h2>
                                <p className='text-gray-500 text-sm sm:text-base'>Exciting adventures and thrilling moments</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                dispatch(setQuery('adventure videos'))
                                dispatch(setActiveTabs('videos'))
                            }}
                            className='flex items-center gap-2 text-[#ff6b6b] hover:underline text-sm sm:text-base'
                        >
                            View all
                            <ArrowRight size={18} />
                        </motion.button>
                    </motion.div>

                    {/* Carousel Container */}
                    <div className='relative group'>
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll('left')}
                            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2 hidden sm:flex items-center justify-center'
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll('right')}
                            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2 hidden sm:flex items-center justify-center'
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Carousel */}
                        <div
                            ref={carouselRef}
                            className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
                        >
                            {videos.map((video, idx) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => openModal(video)}
                                    className='flex-shrink-0 w-56 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer card-glow relative group/card'
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110'
                                        loading="lazy"
                                    />
                                    {/* Play Icon Overlay */}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='w-12 h-12 rounded-full bg-black/50 flex items-center justify-center'>
                                            <Play size={24} className='text-white ml-1' fill='white' />
                                        </div>
                                    </div>
                                    {/* Video Badge */}
                                    <div className='absolute top-3 left-3 px-2.5 py-1 bg-[#ff6b6b] text-white text-xs font-semibold rounded-lg'>
                                        VIDEO
                                    </div>
                                    {/* Hover overlay */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300'>
                                        <div className='absolute bottom-0 left-0 right-0 p-3'>
                                            <p className='text-white text-xs sm:text-sm truncate'>
                                                {video.photographer && `by ${video.photographer}`}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {modalOpen && selectedVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setModalOpen(false)}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto'
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className='relative max-w-5xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl my-4'
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className='absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors'
                        >
                            ✕
                        </button>

                        {/* Video - Original aspect ratio */}
                        <div className='relative w-full flex items-center justify-center bg-black min-h-[200px]'>
                            {/* Loading spinner */}
                            {videoLoading && (
                                <div className='absolute inset-0 flex items-center justify-center z-10'>
                                    <Loader2 size={40} className='text-[#00ff88] animate-spin' />
                                </div>
                            )}
                            <video
                                src={selectedVideo.src}
                                controls
                                onLoadedData={() => setVideoLoading(false)}
                                className={`max-w-full max-h-[70vh] object-contain transition-opacity duration-300 ${videoLoading ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>

                        {/* Info & Actions */}
                        <div className='p-6'>
                            <h3 className='text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2'>
                                {selectedVideo.title || 'Adventure Video'}
                            </h3>
                            {selectedVideo.photographer && (
                                <p className='text-gray-400 mb-6'>by {selectedVideo.photographer}</p>
                            )}
                            <div className='flex flex-wrap gap-3'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => handleSave(e, selectedVideo)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${isSaved(selectedVideo.id)
                                        ? 'bg-[#ff00ea] text-white'
                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                        }`}
                                >
                                    <Heart size={20} className={isSaved(selectedVideo.id) ? 'fill-current' : ''} />
                                    {isSaved(selectedVideo.id) ? 'Saved' : 'Favorite'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => handleDownload(e, selectedVideo)}
                                    className='download-btn flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ff88] text-black font-semibold'
                                >
                                    <Download size={20} />
                                    Download
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.open(selectedVideo.url, '_blank')}
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
        </>
    )
}

export default MountainVideos
